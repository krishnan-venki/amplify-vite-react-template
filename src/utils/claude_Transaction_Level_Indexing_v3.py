"""
Sagaa Transaction-Level Indexing Script
Indexes INDIVIDUAL transactions instead of document chunks
Enables precise filtering by transaction type, category, date, etc.
"""

import json
import boto3
from pinecone import Pinecone
import time
from datetime import datetime
from decimal import Decimal

# ==================== CONFIGURATION ====================

AWS_REGION = 'us-west-2'
S3_BUCKET = 'sagaa-user-datalake'
SECRET_NAME = 'sagga/pinecone/credentials'  # Fixed typo

EMBEDDING_MODEL = 'amazon.titan-embed-text-v1'
EMBEDDING_DIMENSIONS = 1536

# ==================== AWS CLIENTS ====================

def get_aws_clients():
    """Initialize AWS clients"""
    return {
        's3': boto3.client('s3', region_name=AWS_REGION),
        'bedrock': boto3.client('bedrock-runtime', region_name=AWS_REGION),
        'secrets': boto3.client('secretsmanager', region_name=AWS_REGION)
    }

def get_pinecone_credentials(secrets_client):
    """Get Pinecone credentials from Secrets Manager"""
    response = secrets_client.get_secret_value(SecretId=SECRET_NAME)
    return json.loads(response['SecretString'])

# ==================== EMBEDDING GENERATION ====================

def generate_embedding(text, bedrock_client):
    """Generate embedding using Amazon Titan V1"""
    try:
        request_body = json.dumps({"inputText": text})
        
        response = bedrock_client.invoke_model(
            modelId=EMBEDDING_MODEL,
            body=request_body,
            contentType='application/json',
            accept='application/json'
        )
        
        response_body = json.loads(response['body'].read())
        embedding = response_body.get('embedding')
        
        if not embedding or len(embedding) != EMBEDDING_DIMENSIONS:
            raise ValueError(f"Invalid embedding dimensions: {len(embedding)}")
        
        return embedding
        
    except Exception as e:
        print(f"❌ Error generating embedding: {e}")
        raise

# ==================== TRANSACTION PARSING ====================

def parse_transactions_from_json(content, file_key):
    """
    Parse individual transactions from JSON file
    Returns list of transaction objects
    """
    try:
        data = json.loads(content)
        transactions = []
        
        # Handle different JSON structures
        if isinstance(data, list):
            transactions = data
        elif isinstance(data, dict):
            # Look for common transaction array keys
            for key in ['transactions', 'data', 'records', 'items']:
                if key in data and isinstance(data[key], list):
                    transactions = data[key]
                    break
        
        print(f"📊 Found {len(transactions)} transactions in {file_key}")
        return transactions
        
    except json.JSONDecodeError as e:
        print(f"❌ JSON parse error in {file_key}: {e}")
        return []
    except Exception as e:
        print(f"❌ Error parsing transactions: {e}")
        return []

def create_transaction_text(transaction, source_type):
    """
    Create searchable text representation of a transaction
    This text will be embedded and stored
    """
    # Extract key fields with defaults - handle multiple date field names
    date = transaction.get('transaction_date') or transaction.get('date') or 'unknown date'
    amount = transaction.get('amount', 0)
    description = transaction.get('description', '')
    merchant = transaction.get('merchant', '')
    category = transaction.get('category', 'uncategorized')
    txn_type = transaction.get('type', 'unknown')
    
    # Build rich text for embedding
    text_parts = [
        f"Date: {date}",
        f"Amount: ${abs(float(amount)):.2f}",
        f"Type: {txn_type}",
        f"Category: {category}"
    ]
    
    if merchant:
        text_parts.append(f"Merchant: {merchant}")
    
    if description:
        text_parts.append(f"Description: {description}")
    
    text_parts.append(f"Source: {source_type}")
    
    return " | ".join(text_parts)

def normalize_amount(amount):
    """Convert amount to float, handling different formats"""
    if isinstance(amount, (int, float)):
        return float(amount)
    elif isinstance(amount, Decimal):
        return float(amount)
    elif isinstance(amount, str):
        # Remove currency symbols and commas
        clean = amount.replace('$', '').replace(',', '').strip()
        try:
            return float(clean)
        except ValueError:
            return 0.0
    return 0.0

def parse_date_metadata(date_str):
    """
    Extract rich temporal metadata from transaction date
    Returns dict with all temporal fields, gracefully handles errors
    """
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        
        return {
            "timestamp": int(date_obj.timestamp()),
            "year": date_obj.year,
            "month": date_obj.month,
            "day": date_obj.day,
            
            # New temporal fields
            "day_of_week": date_obj.strftime('%A'),
            "day_of_week_num": date_obj.weekday(),  # 0=Monday
            "week_of_month": (date_obj.day - 1) // 7 + 1,
            "week_of_year": date_obj.isocalendar()[1],
            "quarter": f"Q{(date_obj.month - 1) // 3 + 1}",
            "is_weekend": date_obj.weekday() >= 5,
            "is_month_start": date_obj.day <= 7,
            "is_month_end": date_obj.day > 23,  # Last week of month
        }
    except Exception as e:
        # Graceful degradation - return minimal metadata
        print(f"⚠️ Warning: Could not parse date {date_str}: {e}")
        return {
            "timestamp": 0,
            "year": 0,
            "month": 0,
            "day": 0,
            "day_of_week": "unknown",
            "day_of_week_num": -1,
            "week_of_month": 0,
            "week_of_year": 0,
            "quarter": "unknown",
            "is_weekend": False,
            "is_month_start": False,
            "is_month_end": False,
        }

def detect_transaction_type(txn, category, merchant, description, amount):
    """
    Intelligent detection of transaction characteristics
    Returns dict with behavioral flags
    """
    description_lower = description.lower()
    merchant_lower = merchant.lower()
    category_lower = category.lower()
    
    # Income detection
    is_income = (
        amount > 0 or 
        category_lower in ['salary', 'paycheck', 'income', 'deposit', 'refund'] or
        'payroll' in description_lower or
        'direct deposit' in description_lower
    )
    
    # Subscription detection (common patterns)
    subscription_keywords = [
        'netflix', 'spotify', 'hulu', 'disney', 'amazon prime',
        'apple music', 'youtube premium', 'gym', 'membership',
        'subscription', 'monthly fee', 'annual fee'
    ]
    is_subscription = any(kw in description_lower or kw in merchant_lower 
                          for kw in subscription_keywords)
    
    # Bill detection
    bill_keywords = [
        'electric', 'gas', 'water', 'internet', 'phone', 'insurance',
        'rent', 'mortgage', 'utilities', 'bill payment'
    ]
    is_bill = any(kw in description_lower or kw in merchant_lower 
                  for kw in bill_keywords)
    
    # Transfer detection
    is_transfer = (
        'transfer' in description_lower or
        'xfer' in description_lower or
        category_lower in ['transfer', 'internal transfer', 'credit_card_payment', 'investment']
    )
    
    # Refund detection
    is_refund = (
        amount > 0 and (
            'refund' in description_lower or
            'return' in description_lower or
            category_lower == 'refund'
        )
    )
    
    # Discretionary vs Essential
    essential_categories = [
        'groceries', 'utilities', 'rent', 'mortgage', 'insurance',
        'healthcare', 'gas', 'transportation'
    ]
    is_discretionary = category_lower not in essential_categories
    
    # Should affect budget (exclude transfers, some refunds)
    affects_budget = not (is_transfer or (is_refund and amount > 100))
    
    return {
        "is_income": is_income,
        "is_subscription": is_subscription,
        "is_bill": is_bill,
        "is_transfer": is_transfer,
        "is_refund": is_refund,
        "is_discretionary": is_discretionary,
        "affects_budget": affects_budget,
        
        # Placeholders for future analysis
        "is_recurring": False,  # Will be detected via pattern analysis
        "recurring_frequency": None,
        "is_large_purchase": False,  # Will be set based on category average
        "is_unusual": False,  # Will be set via anomaly detection
    }

# ==================== TRANSACTION-LEVEL INDEXING ====================

def index_transactions(s3_key, content, bedrock_client, index, user_id):
    """
    ENHANCED: Index individual transactions with rich metadata
    Maintains backward compatibility while adding new fields
    """
    print(f"\n{'='*60}")
    print(f"Processing: {s3_key}")
    print(f"{'='*60}")
    
    # Parse metadata from S3 key
    parts = s3_key.split('/')
    vertical = parts[1] if len(parts) >= 3 else 'finance'
    filename = parts[-1]
    
    # Determine source type
    source_type = 'bank_account'
    if 'credit' in filename.lower() or 'card' in filename.lower():
        source_type = 'credit_card'
    elif 'investment' in filename.lower():
        source_type = 'investment'
    
    # Parse transactions
    transactions = parse_transactions_from_json(content, s3_key)
    
    if not transactions:
        print(f"⚠️ No transactions found in {s3_key}")
        return 0
    
    vectors = []
    
    for idx, txn in enumerate(transactions):
        try:
            # Extract EXISTING fields (unchanged)
            date = txn.get('transaction_date') or txn.get('date') or txn.get('posted_date') or ''
            amount = normalize_amount(txn.get('amount', 0))
            txn_type = (txn.get('type') or txn.get('transaction_type') or 'unknown').lower()
            category = (txn.get('category') or txn.get('merchant_category') or 'uncategorized').lower()
            description = txn.get('description') or txn.get('name') or ''
            merchant = txn.get('merchant') or txn.get('merchant_name') or ''
            goal_contribution = txn.get('goal_contribution') or ''

            # Create searchable text (unchanged)
            txn_text = create_transaction_text(txn, source_type)
            
            # Generate embedding (unchanged)
            embedding = generate_embedding(txn_text, bedrock_client)
            
            # NEW: Extract enhanced temporal metadata
            temporal_metadata = parse_date_metadata(date)
            
            # NEW: Detect transaction characteristics
            type_metadata = detect_transaction_type(
                txn, category, merchant, description, amount
            )
            
            # Create vector ID (unchanged)
            vector_id = f"{user_id}_{source_type}_{date}_{idx}"
            
            # Create vector with ENHANCED METADATA
            vector = {
                "id": vector_id,
                "values": embedding,
                "metadata": {
                    # ===== EXISTING FIELDS (DON'T CHANGE) =====
                    "user_id": user_id,
                    "date": date,
                    "timestamp": temporal_metadata["timestamp"],
                    "year": temporal_metadata["year"],
                    "month": temporal_metadata["month"],
                    "amount": amount,
                    "type": txn_type,
                    "category": category,
                    "description": description[:200],
                    "merchant": merchant[:100],
                    "source_type": source_type,
                    "s3_key": s3_key,
                    "vertical": vertical,
                    "text": txn_text,
                    "indexed_at": datetime.now().isoformat(),
                    "goal_contribution": goal_contribution,
                    
                    # ===== NEW TEMPORAL FIELDS =====
                    "day": temporal_metadata["day"],
                    "day_of_week": temporal_metadata["day_of_week"],
                    "day_of_week_num": temporal_metadata["day_of_week_num"],
                    "week_of_month": temporal_metadata["week_of_month"],
                    "week_of_year": temporal_metadata["week_of_year"],
                    "quarter": temporal_metadata["quarter"],
                    "is_weekend": temporal_metadata["is_weekend"],
                    "is_month_start": temporal_metadata["is_month_start"],
                    "is_month_end": temporal_metadata["is_month_end"],
                    
                    # ===== NEW TRANSACTION TYPE FIELDS =====
                    "is_income": type_metadata["is_income"],
                    "is_subscription": type_metadata["is_subscription"],
                    "is_bill": type_metadata["is_bill"],
                    "is_transfer": type_metadata["is_transfer"],
                    "is_refund": type_metadata["is_refund"],
                    "is_discretionary": type_metadata["is_discretionary"],
                    "affects_budget": type_metadata["affects_budget"],
                    "is_recurring": type_metadata["is_recurring"],
                    "is_large_purchase": type_metadata["is_large_purchase"],
                    "is_unusual": type_metadata["is_unusual"],
                }
            }
            
            vectors.append(vector)
            
            if (idx + 1) % 10 == 0:
                print(f"✅ Processed {idx + 1}/{len(transactions)} transactions")
                
        except Exception as e:
            print(f"❌ Error processing transaction {idx}: {e}")
            continue
    
    # Upload to Pinecone (unchanged)
    if vectors:
        upsert_to_pinecone(index, vectors)
        print(f"✅ Indexed {len(vectors)} transactions from {s3_key}")
    
    return len(vectors)

def upsert_to_pinecone(index, vectors, batch_size=100):
    """Upload vectors to Pinecone in batches"""
    print(f"📤 Uploading {len(vectors)} vectors to Pinecone...")
    
    total = len(vectors)
    for i in range(0, total, batch_size):
        batch = vectors[i:i + batch_size]
        try:
            index.upsert(vectors=batch)
            print(f"✅ Uploaded batch {i//batch_size + 1} ({len(batch)} vectors)")
            time.sleep(0.5)
        except Exception as e:
            print(f"❌ Error uploading batch: {e}")
            raise
    
    print(f"✅ Successfully uploaded {total} vectors!")

def delete_user_vectors(index, user_id):
    """Delete all existing vectors for a user"""
    print(f"🗑️  Deleting existing vectors for user: {user_id}")
    
    try:
        index.delete(filter={"user_id": {"$eq": user_id}})
        print(f"✅ Deleted existing vectors for user: {user_id}")
        time.sleep(2)
    except Exception as e:
        print(f"⚠️  Warning: Could not delete existing vectors: {e}")

# ==================== MAIN INDEXING LOGIC ====================

def list_s3_files(s3_client, bucket, prefix=''):
    """List all files in S3 bucket"""
    print(f"📋 Listing files in s3://{bucket}/{prefix}")
    
    files = []
    paginator = s3_client.get_paginator('list_objects_v2')
    
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        if 'Contents' in page:
            for obj in page['Contents']:
                if not obj['Key'].endswith('/'):
                    files.append(obj['Key'])
    
    print(f"✅ Found {len(files)} files")
    return files

def read_s3_file(s3_client, bucket, key):
    """Read file from S3"""
    print(f"📖 Reading s3://{bucket}/{key}")
    
    try:
        response = s3_client.get_object(Bucket=bucket, Key=key)
        content = response['Body'].read().decode('utf-8')
        print(f"✅ Read {len(content)} characters")
        return content
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        raise

def index_all_transactions(user_id=None, delete_existing=True):
    """
    Main function to index all transactions at individual level
    """
    print("\n" + "="*60)
    print("🚀 Starting Transaction-Level Indexing")
    print("="*60)
    
    # Initialize clients
    print("\n📡 Initializing AWS clients...")
    clients = get_aws_clients()
    
    # Get Pinecone credentials
    print("🔑 Getting Pinecone credentials...")
    pinecone_creds = get_pinecone_credentials(clients['secrets'])
    
    # Initialize Pinecone
    print("🔗 Connecting to Pinecone...")
    pc = Pinecone(api_key=pinecone_creds['PINECONE_API_KEY'])
    index = pc.Index(pinecone_creds['PINECONE_INDEX_NAME'])
    
    # Get index stats
    stats = index.describe_index_stats()
    print(f"📊 Current index stats: {stats['total_vector_count']} vectors")
    
    # Delete existing vectors for user if requested
    if delete_existing and user_id:
        delete_user_vectors(index, user_id)
    
    # List S3 files
    prefix = f"{user_id}/" if user_id else ""
    files = list_s3_files(clients['s3'], S3_BUCKET, prefix)
    
    if not files:
        print(f"⚠️  No files found in s3://{S3_BUCKET}/{prefix}")
        return
    
    # Process each file
    total_transactions = 0
    successful_files = 0
    failed_files = 0
    
    for file_key in files:
        # Only process JSON files in finance folder
        if not file_key.endswith('.json'):
            print(f"⏭️  Skipping non-JSON file: {file_key}")
            continue
        
        try:
            # Extract user_id from file path
            file_user_id = file_key.split('/')[0]
            
            # Read file
            content = read_s3_file(clients['s3'], S3_BUCKET, file_key)
            
            # Index transactions
            num_transactions = index_transactions(
                file_key, 
                content, 
                clients['bedrock'], 
                index,
                file_user_id
            )
            
            total_transactions += num_transactions
            successful_files += 1
            
        except Exception as e:
            print(f"❌ Failed to process {file_key}: {e}")
            failed_files += 1
            continue
    
    # Final summary
    print("\n" + "="*60)
    print("📊 INDEXING SUMMARY")
    print("="*60)
    print(f"Files processed: {successful_files + failed_files}")
    print(f"✅ Successful: {successful_files}")
    print(f"❌ Failed: {failed_files}")
    print(f"💾 Total transactions indexed: {total_transactions}")
    
    # Final index stats
    time.sleep(2)
    final_stats = index.describe_index_stats()
    print(f"📊 Final index: {final_stats['total_vector_count']} vectors")
    print("="*60)
    
    print("\n💡 IMPORTANT: Transaction-level indexing complete!")
    print("   Update your Lambda to use transaction-level filtering.")

# ==================== CLI INTERFACE ====================

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        user_id = sys.argv[1]
        print(f"Indexing transactions for user: {user_id}")
        index_all_transactions(user_id=user_id, delete_existing=True)
    else:
        print("Indexing all user transactions...")
        response = input("⚠️  This will re-index ALL users. Continue? (yes/no): ")
        if response.lower() == 'yes':
            index_all_transactions(delete_existing=False)
        else:
            print("Cancelled.")