"""
Sagaa Proactive Insights Engine
Analyzes user transaction data and generates personalized financial insights using LLM
"""

import json
import boto3
import os
from datetime import datetime, timedelta
from pinecone import Pinecone
from collections import defaultdict
import uuid
from decimal import Decimal

# ==================== CONFIGURATION ====================

REGION = os.environ.get('AWS_REGION', 'us-west-2')
SECRET_NAME = os.environ.get('PINECONE_SECRET_NAME', 'sagga/pinecone/credentials')
INSIGHTS_TABLE = os.environ.get('INSIGHTS_TABLE', 'sagaa-proactive-insights')

EMBEDDING_MODEL = 'amazon.titan-embed-text-v1'
LLM_MODEL = 'anthropic.claude-3-5-sonnet-20241022-v2:0'

# ==================== AWS CLIENTS ====================

bedrock_runtime = boto3.client('bedrock-runtime', region_name=REGION)
secrets_client = boto3.client('secretsmanager', region_name=REGION)
dynamodb = boto3.resource('dynamodb', region_name=REGION)

_pinecone_index = None

def get_pinecone_index():
    """Get Pinecone index (cached)"""
    global _pinecone_index
    
    if _pinecone_index is not None:
        return _pinecone_index
    
    response = secrets_client.get_secret_value(SecretId=SECRET_NAME)
    credentials = json.loads(response['SecretString'])
    
    pc = Pinecone(api_key=credentials['PINECONE_API_KEY'])
    _pinecone_index = pc.Index(credentials['PINECONE_INDEX_NAME'])
    
    print(f"[INFO] Connected to Pinecone index")
    return _pinecone_index

# ==================== DATA FETCHING ====================

def fetch_user_transactions(user_id, months=12):
    """
    Fetch user's transactions from Pinecone for last N months
    Returns list of transaction metadata
    """
    print(f"[INFO] Fetching transactions for user: {user_id}, last {months} months")
    
    try:
        index = get_pinecone_index()
        
        # Calculate timestamp for N months ago
        months_ago = datetime.now() - timedelta(days=months * 30)
        timestamp_filter = int(months_ago.timestamp())
        
        # Query Pinecone with metadata-only query (dummy vector)
        # We want ALL transactions, so we use a broad query
        results = index.query(
            vector=[0.0] * 1536,  # Dummy vector
            filter={
                "user_id": {"$eq": user_id},
                "timestamp": {"$gte": timestamp_filter},
                "affects_budget": {"$eq": True},
                "type": {"$eq": "debit"}  
            },
            top_k=10000,  # Get as many as possible
            include_metadata=True
        )
        
        transactions = [match['metadata'] for match in results.get('matches', [])]
        
        print(f"[INFO] Fetched {len(transactions)} transactions")
        return transactions
        
    except Exception as e:
        print(f"[ERROR] Failed to fetch transactions: {e}")
        raise

# ==================== CONTEXT PREPARATION ====================

def prepare_analysis_context(transactions):
    """
    Aggregate and analyze transaction data into structured context
    Returns dict with multiple views of the data
    """
    print(f"[INFO] Preparing analysis context from {len(transactions)} transactions")
    
    # Monthly aggregation
    monthly_data = defaultdict(lambda: {
        'total': 0.0,
        'count': 0,
        'discretionary': 0.0,
        'essential': 0.0,
        'weekend': 0.0,
        'weekday': 0.0,
        'subscriptions': 0.0
    })
    
    # Category aggregation
    category_data = defaultdict(lambda: {
        'total': 0.0,
        'count': 0,
        'months': set()
    })
    
    # Merchant aggregation
    merchant_data = defaultdict(lambda: {
        'total': 0.0,
        'count': 0,
        'category': None
    })
    
    # Process each transaction
    for txn in transactions:
        year = txn.get('year', 0)
        month = txn.get('month', 0)
        amount = abs(float(txn.get('amount', 0)))
        category = txn.get('category', 'uncategorized')
        merchant = txn.get('merchant', 'Unknown')
        
         # Convert to int to avoid float formatting issues
        year = int(year) if year else 0
        month = int(month) if month else 0
        
        if not year or not month:
            continue
        
        month_key = f"{int(year)}-{int(month):02d}"
        
        # Monthly aggregation
        monthly_data[month_key]['total'] += amount
        monthly_data[month_key]['count'] += 1
        
        if txn.get('is_discretionary', True):
            monthly_data[month_key]['discretionary'] += amount
        else:
            monthly_data[month_key]['essential'] += amount
        
        if txn.get('is_weekend', False):
            monthly_data[month_key]['weekend'] += amount
        else:
            monthly_data[month_key]['weekday'] += amount
        
        if txn.get('is_subscription', False):
            monthly_data[month_key]['subscriptions'] += amount
        
        # Category aggregation
        category_data[category]['total'] += amount
        category_data[category]['count'] += 1
        category_data[category]['months'].add(month_key)
        
        # Merchant aggregation
        merchant_data[merchant]['total'] += amount
        merchant_data[merchant]['count'] += 1
        if not merchant_data[merchant]['category']:
            merchant_data[merchant]['category'] = category
    
    # Sort monthly data
    sorted_months = sorted(monthly_data.keys())
    
    # Calculate trends and patterns
    context = {
        'monthly_summary': {},
        'category_summary': {},
        'merchant_summary': {},
        'behavioral_summary': {},
        'sample_transactions': []
    }
    
    # Monthly summary with calculated percentages
    for month in sorted_months:
        data = monthly_data[month]
        total = data['total']
        
        context['monthly_summary'][month] = {
            'total': total,
            'count': data['count'],
            'discretionary_pct': (data['discretionary'] / total * 100) if total > 0 else 0,
            'essential_pct': (data['essential'] / total * 100) if total > 0 else 0,
            'weekend_spending': data['weekend'],
            'weekday_spending': data['weekday'],
            'subscriptions': data['subscriptions']
        }
    
    # Category summary with trends
    for category, data in category_data.items():
        months_active = len(data['months'])
        monthly_avg = data['total'] / months_active if months_active > 0 else 0
        
        context['category_summary'][category] = {
            'total': data['total'],
            'count': data['count'],
            'monthly_avg': monthly_avg,
            'months_active': months_active
        }
    
    # Top merchants
    top_merchants = sorted(
        merchant_data.items(),
        key=lambda x: x[1]['total'],
        reverse=True
    )[:20]  # Top 20 merchants
    
    for merchant, data in top_merchants:
        context['merchant_summary'][merchant] = {
            'total': data['total'],
            'frequency': data['count'],
            'category': data['category']
        }
    
    # Behavioral summary
    total_weekend = sum(m['weekend'] for m in monthly_data.values())
    total_weekday = sum(m['weekday'] for m in monthly_data.values())
    total_discretionary = sum(m['discretionary'] for m in monthly_data.values())
    total_essential = sum(m['essential'] for m in monthly_data.values())
    total_subscriptions = sum(m['subscriptions'] for m in monthly_data.values())
    grand_total = total_discretionary + total_essential
    
    # Estimate days (rough approximation)
    num_months = len(sorted_months)
    weekend_days = num_months * 8  # ~8 weekend days per month
    weekday_days = num_months * 22  # ~22 weekdays per month
    
    context['behavioral_summary'] = {
        'weekend_avg_per_day': total_weekend / weekend_days if weekend_days > 0 else 0,
        'weekday_avg_per_day': total_weekday / weekday_days if weekday_days > 0 else 0,
        'discretionary_pct': (total_discretionary / grand_total * 100) if grand_total > 0 else 0,
        'essential_pct': (total_essential / grand_total * 100) if grand_total > 0 else 0,
        'subscription_total_monthly': total_subscriptions / num_months if num_months > 0 else 0,
        'total_spending_12mo': grand_total
    }
    
    # Sample transactions (largest and most recent)
    sorted_by_amount = sorted(
        transactions,
        key=lambda x: abs(float(x.get('amount', 0))),
        reverse=True
    )[:10]
    
    sorted_by_date = sorted(
        transactions,
        key=lambda x: x.get('date', ''),
        reverse=True
    )[:20]
    
    context['sample_transactions'] = {
        'largest': sorted_by_amount,
        'recent': sorted_by_date
    }
    
    print(f"[INFO] Context prepared: {len(context['monthly_summary'])} months analyzed")
    return context

# ==================== CONTEXT FORMATTING ====================

def format_context_for_llm(context):
    """
    Format aggregated context into readable text for LLM
    """
    sections = []
    
    # Header
    sections.append("# USER FINANCIAL DATA ANALYSIS\n")
    sections.append(f"Analysis Period: {len(context['monthly_summary'])} months\n")
    
    # Monthly trends
    sections.append("## MONTHLY SPENDING TRENDS\n")
    for month, data in context['monthly_summary'].items():
        sections.append(
            f"**{month}**: ${data['total']:,.2f} total | "
            f"{data['count']} transactions | "
            f"{data['discretionary_pct']:.0f}% discretionary | "
            f"${data['weekend_spending']:,.2f} weekend | "
            f"${data['subscriptions']:,.2f} subscriptions"
        )
    
    # Calculate month-over-month trend
    months = list(context['monthly_summary'].keys())
    if len(months) >= 2:
        first_month_total = context['monthly_summary'][months[0]]['total']
        last_month_total = context['monthly_summary'][months[-1]]['total']
        pct_change = ((last_month_total - first_month_total) / first_month_total * 100) if first_month_total > 0 else 0
        sections.append(f"\n**Overall Trend**: {pct_change:+.1f}% from first to last month\n")
    
    # Category breakdown
    sections.append("\n## SPENDING BY CATEGORY\n")
    sorted_categories = sorted(
        context['category_summary'].items(),
        key=lambda x: x[1]['total'],
        reverse=True
    )
    
    for category, data in sorted_categories[:15]:  # Top 15 categories
        sections.append(
            f"**{category.title()}**: ${data['total']:,.2f} total | "
            f"${data['monthly_avg']:,.2f}/month avg | "
            f"{data['count']} transactions"
        )
    
    # Top merchants
    sections.append("\n## TOP MERCHANTS\n")
    for merchant, data in list(context['merchant_summary'].items())[:10]:
        sections.append(
            f"**{merchant}**: {data['frequency']} visits | "
            f"${data['total']:,.2f} total | "
            f"Category: {data['category']}"
        )
    
    # Behavioral patterns
    sections.append("\n## BEHAVIORAL PATTERNS\n")
    beh = context['behavioral_summary']
    sections.append(f"- Weekend spending: ${beh['weekend_avg_per_day']:.2f}/day average")
    sections.append(f"- Weekday spending: ${beh['weekday_avg_per_day']:.2f}/day average")
    sections.append(f"- Discretionary spending: {beh['discretionary_pct']:.0f}% of total")
    sections.append(f"- Essential spending: {beh['essential_pct']:.0f}% of total")
    sections.append(f"- Monthly subscriptions: ${beh['subscription_total_monthly']:.2f}/month average")
    sections.append(f"- Total 12-month spending: ${beh['total_spending_12mo']:,.2f}")
    
    # Sample recent transactions
    sections.append("\n## SAMPLE RECENT TRANSACTIONS\n")
    for txn in context['sample_transactions']['recent'][:10]:
        sections.append(
            f"{txn.get('date', 'N/A')}: {txn.get('merchant', 'Unknown')} | "
            f"${abs(float(txn.get('amount', 0))):.2f} | "
            f"{txn.get('category', 'uncategorized')}"
        )
    
    # Largest purchases
    sections.append("\n## LARGEST PURCHASES (Last 12 months)\n")
    for txn in context['sample_transactions']['largest'][:5]:
        sections.append(
            f"{txn.get('date', 'N/A')}: {txn.get('merchant', 'Unknown')} | "
            f"${abs(float(txn.get('amount', 0))):.2f} | "
            f"{txn.get('category', 'uncategorized')}"
        )
    
    formatted_text = "\n".join(sections)
    print(f"[INFO] Formatted context: {len(formatted_text)} characters")
    
    return formatted_text

# ==================== LLM ANALYSIS ====================
PROACTIVE_INSIGHTS_PROMPT = """You are Sagaa's Proactive Insights Engine. Analyze 12 months of spending patterns and generate actionable insights with visual data.

USER DATA:
{context}

Generate insights in this EXACT JSON format (respond with valid JSON only):

{{
  "insights": [
    {{
      "title": "Clear, actionable headline under 80 characters",
      "priority": "HIGH|MEDIUM|LOW",
      "type": "subscription_waste|lifestyle_inflation|spending_pattern|merchant_concentration|behavioral_trigger",
      
      "visualization": {{
        "chart_type": "line|bar|donut|comparison_bars",
        "data": [
          {{"label": "Month or Category", "value": 12345.67, "highlight": false}}
        ],
        "annotation": "Brief chart note under 50 chars"
      }},
      
      "key_metric": {{
        "primary_value": "$X,XXX or percentage",
        "primary_label": "Clear metric label",
        "secondary": "comparison context",
        "icon": "alert|trend-up|trend-down|info|warning"
      }},
      
      "card_content": {{
        "summary": "One crisp sentence max 150 chars",
        "actions": [
          "Specific action max 100 chars",
          "Another specific action max 100 chars"
        ],
        "impact": "Quantified outcome max 100 chars"
      }},
      
      "full_content": {{
        "what_happening": "2-3 paragraphs explaining the pattern with 12-month data",
        "why_matters": "2-3 paragraphs on long-term consequences",
        "detailed_actions": [
          {{
            "action": "Specific step to address pattern",
            "rationale": "Why this works and expected results"
          }}
        ],
        "expected_impact": "Detailed outcome with timeframes"
      }}
    }}
  ]
}}

CRITICAL RULES:
1. ALL NUMBERS from USER DATA - based on 12 months of actual patterns
2. Use line chart for trends over time (month-by-month)
3. Use bar for category comparisons
4. Use donut for percentage breakdowns (discretionary/essential split)
5. Focus on PATTERNS not one-time events
6. Actions must address ROOT CAUSE not symptoms
7. Impact must show ANNUAL savings/changes

INSIGHT TYPES:
- subscription_waste: Unused or underutilized recurring charges
- lifestyle_inflation: Gradual spending increases without income change
- spending_pattern: Consistent overspending in specific categories
- merchant_concentration: Over-reliance on expensive merchants
- behavioral_trigger: Weekend/stress spending patterns

Generate 2-4 insights focusing on highest-impact patterns.
"""

def generate_insights_via_llm(formatted_context):
    """
    Call Bedrock Claude to analyze transaction data and generate insights
    """
    print(f"[INFO] Calling LLM for insight generation...")
    
    try:
        prompt = PROACTIVE_INSIGHTS_PROMPT.format(
            context=formatted_context
        )
        
        response = bedrock_runtime.invoke_model(
            modelId=LLM_MODEL,
            body=json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 4000,
                "temperature": 0.7,
                "messages": [{
                    "role": "user",
                    "content": prompt
                }]
            })
        )
        
        result = json.loads(response['body'].read())
        llm_response = result['content'][0]['text']
        
        print(f"[INFO] LLM response received: {len(llm_response)} characters")
        print(f"[DEBUG] LLM Response:\n{llm_response[:500]}...")
        
        return llm_response
        
    except Exception as e:
        print(f"[ERROR] LLM invocation failed: {e}")
        raise

# ==================== INSIGHT PARSING ====================

def parse_and_validate_insights(llm_response, source_context):
    """Parse LLM JSON response and validate"""
    print(f"[INFO] Parsing and validating LLM insights")
    
    try:
        llm_response = llm_response.strip()
        
        # Handle markdown code blocks
        if llm_response.startswith('```'):
            lines = llm_response.split('\n')
            json_lines = []
            in_json = False
            for line in lines:
                if line.startswith('```'):
                    in_json = not in_json
                    continue
                if in_json:
                    json_lines.append(line)
            llm_response = '\n'.join(json_lines)
        
        # Parse JSON
        parsed = json.loads(llm_response)
        insights = parsed.get('insights', [])
        
        print(f"[INFO] Parsed {len(insights)} insights from LLM")
        
        # Validate each
        validated = []
        for idx, insight in enumerate(insights):
            print(f"[INFO] Validating insight {idx + 1}: {insight.get('title', 'untitled')}")
            
            required = ['title', 'priority', 'type', 'visualization', 'key_metric', 'card_content', 'full_content']
            if all(field in insight for field in required):
                validated.append(insight)
            else:
                print(f"[WARN] Insight {idx + 1} missing required fields")
        
        return validated
        
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to parse JSON: {e}")
        return []

# ==================== LAMBDA HANDLER ====================

def lambda_handler(event, context):
    """
    Main Lambda handler for proactive insights generation
    Can be triggered by:
    1. EventBridge schedule (daily for all users)
    2. Direct invocation for single user (testing)
    """
    
    try:
        print(f"[INFO] Proactive Insights Lambda started")
        print(f"[DEBUG] Event: {json.dumps(event)}")
        
        # Determine user(s) to process
        if 'user_id' in event:
            # Direct invocation for testing
            user_ids = [event['user_id']]
            print(f"[INFO] Processing single user: {user_ids[0]}")
        else:
            # Scheduled invocation - get all active users
            # For now, hardcode test user
            user_ids = ['user_001']  # TODO: Get from DynamoDB or Cognito
            print(f"[INFO] Processing {len(user_ids)} users")
        
        results = []
        
        for user_id in user_ids:
            try:
                print(f"\n{'='*60}")
                print(f"[INFO] Processing user: {user_id}")
                print(f"{'='*60}")
                
                # 1. Fetch transaction data
                transactions = fetch_user_transactions(user_id, months=12)
                
                if not transactions or len(transactions) < 50:
                    print(f"[SKIP] Insufficient data for {user_id}: {len(transactions)} transactions")
                    results.append({
                        'user_id': user_id,
                        'status': 'skipped',
                        'reason': 'insufficient_data'
                    })
                    continue
                
                # 2. Prepare analysis context
                context = prepare_analysis_context(transactions)
                
                # 3. Format for LLM
                formatted_context = format_context_for_llm(context)
                
                # 4. Generate insights via LLM
                llm_response = generate_insights_via_llm(formatted_context)
                
                # 5. Parse insights
                insights = parse_and_validate_insights(llm_response, context)
                
                if not insights:
                    print(f"[WARN] No insights generated for {user_id}")
                    results.append({
                        'user_id': user_id,
                        'status': 'no_insights',
                        'reason': 'llm_generated_no_insights'
                    })
                    continue
                
                # 6. Store insights (Phase 2)
                stored_count = store_insights(user_id, insights)
                
                results.append({
                    'user_id': user_id,
                    'status': 'success',
                    'insights_generated': stored_count
                })
                
                print(f"[SUCCESS] Generated {stored_count} insights for {user_id}")
                
            except Exception as e:
                print(f"[ERROR] Failed to process {user_id}: {e}")
                import traceback
                traceback.print_exc()
                
                results.append({
                    'user_id': user_id,
                    'status': 'error',
                    'error': str(e)
                })
        
        print(f"\n{'='*60}")
        print(f"[INFO] Processing complete")
        print(f"[INFO] Results: {json.dumps(results, indent=2)}")
        print(f"{'='*60}")
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'processed_users': len(results),
                'results': results
            })
        }
        
    except Exception as e:
        print(f"[ERROR] Lambda execution failed: {e}")
        import traceback
        traceback.print_exc()
        
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e),
                'message': 'Failed to generate proactive insights'
            })
        }

def convert_floats_to_decimal(obj):
    """Convert floats to Decimal for DynamoDB"""
    if isinstance(obj, dict):
        return {k: convert_floats_to_decimal(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_floats_to_decimal(item) for item in obj]
    elif isinstance(obj, float):
        return Decimal(str(obj))
    else:
        return obj
    
# ==================== PHASE 2: STORAGE ====================

def store_insights(user_id, insights):
    """Store generated insights in DynamoDB"""
    print(f"[INFO] Storing {len(insights)} insights for user: {user_id}")
    
    try:
        table = dynamodb.Table(INSIGHTS_TABLE)
        stored_count = 0
        
        for insight in insights:
            insight_id = str(uuid.uuid4())
            timestamp = datetime.now().isoformat()
            
            # Build DynamoDB item
            item = {
                # Existing fields
                'PK': f"USER#{user_id}",
                'SK': f"INSIGHT#{timestamp}#{insight['type']}",
                'insight_id': insight_id,
                'insight_type': insight['type'],
                'priority': insight['priority'],
                'status': 'active',
                'generated_at': timestamp,
                'expires_at': (datetime.now() + timedelta(days=60)).isoformat(),  # 60 days for long-term patterns
                'viewed': False,
                'viewed_at': None,
                'dismissed': False,
                'dismissed_at': None,
                
                # Enhanced fields
                'title': insight['title'],
                'summary': insight['card_content']['summary'],
                'full_content': insight['full_content'],
                'raw_insight': insight,
                
                # New card fields
                'actions': insight['card_content']['actions'],
                'impact': insight['card_content']['impact'],
                'visualization': insight['visualization'],
                'key_metric': insight['key_metric'],
            }

            # Convert floats to Decimal
            item = convert_floats_to_decimal(item)

            table.put_item(Item=item)
            stored_count += 1
            print(f"[INFO] Stored insight: {insight['title']}")
        
        print(f"[SUCCESS] Stored {stored_count} insights in DynamoDB")
        return stored_count
        
    except Exception as e:
        print(f"[ERROR] Failed to store insights: {e}")
        raise