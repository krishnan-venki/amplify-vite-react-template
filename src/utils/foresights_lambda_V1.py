"""
Sagaa Financial Foresights Engine
Generates forward-looking predictions based on historical transaction patterns
"""

import json
import boto3
import os
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from pinecone import Pinecone
from collections import defaultdict
import uuid
from decimal import Decimal
import calendar

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

def fetch_user_transactions(user_id, months=24, include_income=True):
    """
    Fetch user's transactions from Pinecone for last N months
    Can include both expenses (debit) and income (credit) for forecasting
    """
    print(f"[INFO] Fetching transactions for user: {user_id}, last {months} months")
    print(f"[INFO] Include income: {include_income}")
    
    try:
        index = get_pinecone_index()
        
        # Calculate timestamp for N months ago
        months_ago = datetime.now() - timedelta(days=months * 30)
        timestamp_filter = int(months_ago.timestamp())
        
        # Build filter
        base_filter = {
            "user_id": {"$eq": user_id},
            "timestamp": {"$gte": timestamp_filter},
            "affects_budget": {"$eq": True}
        }
        
        # If not including income, filter to debits only
        if not include_income:
            base_filter["type"] = {"$eq": "debit"}
        
        results = index.query(
            vector=[0.0] * 1536,
            filter=base_filter,
            top_k=10000,
            include_metadata=True
        )

        transactions = [match['metadata'] for match in results.get('matches', [])]
        
        # Separate income and expenses for analysis
        income_txns = [t for t in transactions if t.get('type', '').lower() == 'credit']
        expense_txns = [t for t in transactions if t.get('type', '').lower() == 'debit']
        
        print(f"[INFO] Fetched {len(transactions)} total transactions")
        print(f"[INFO]   Income: {len(income_txns)} transactions")
        print(f"[INFO]   Expenses: {len(expense_txns)} transactions")
        
        return transactions
        
    except Exception as e:
        print(f"[ERROR] Failed to fetch transactions: {e}")
        raise

# ==================== CONTEXT PREPARATION ====================

def prepare_foresight_context(transactions):
    """
    Prepare context for foresight generation
    Includes income, expenses, and historical patterns
    """
    print(f"[INFO] Preparing foresight context from {len(transactions)} transactions")
    
    # Separate income and expenses
    income_txns = [t for t in transactions if t.get('type', '').lower() == 'credit']
    expense_txns = [t for t in transactions if t.get('type', '').lower() == 'debit']
    
    # Monthly aggregation for income
    monthly_income = defaultdict(lambda: {
        'total': 0.0,
        'count': 0
    })
    
    # Monthly aggregation for expenses
    monthly_expenses = defaultdict(lambda: {
        'total': 0.0,
        'count': 0,
        'discretionary': 0.0,
        'essential': 0.0,
        'subscriptions': 0.0,
        'categories': defaultdict(float)
    })
    
    # Process income
    for txn in income_txns:
        year = int(txn.get('year', 0)) if txn.get('year', 0) else 0
        month = int(txn.get('month', 0)) if txn.get('month', 0) else 0
        amount = abs(float(txn.get('amount', 0)))
        
        if year and month:
            month_key = f"{year}-{month:02d}"
            monthly_income[month_key]['total'] += amount
            monthly_income[month_key]['count'] += 1
    
    # Process expenses
    for txn in expense_txns:
        year = int(txn.get('year', 0)) if txn.get('year', 0) else 0
        month = int(txn.get('month', 0)) if txn.get('month', 0) else 0
        amount = abs(float(txn.get('amount', 0)))
        category = txn.get('category', 'uncategorized')
        
        if year and month:
            month_key = f"{year}-{month:02d}"
            monthly_expenses[month_key]['total'] += amount
            monthly_expenses[month_key]['count'] += 1
            monthly_expenses[month_key]['categories'][category] += amount
            
            if txn.get('is_discretionary', True):
                monthly_expenses[month_key]['discretionary'] += amount
            else:
                monthly_expenses[month_key]['essential'] += amount
            
            if txn.get('is_subscription', False):
                monthly_expenses[month_key]['subscriptions'] += amount
    
    # Calculate net cash flow per month
    all_months = sorted(set(list(monthly_income.keys()) + list(monthly_expenses.keys())))
    
    monthly_cashflow = {}
    for month in all_months:
        income = monthly_income[month]['total']
        expenses = monthly_expenses[month]['total']
        net = income - expenses
        
        monthly_cashflow[month] = {
            'income': income,
            'expenses': expenses,
            'net': net,
            'savings_rate': (net / income * 100) if income > 0 else 0
        }
    
    # Calculate category trends (last 6 months vs prior 6 months)
    recent_months = all_months[-6:] if len(all_months) >= 6 else all_months
    prior_months = all_months[-12:-6] if len(all_months) >= 12 else []
    
    category_trends = {}
    all_categories = set()
    for month in recent_months:
        all_categories.update(monthly_expenses[month]['categories'].keys())
    
    for category in all_categories:
        recent_total = sum(monthly_expenses[m]['categories'][category] for m in recent_months)
        recent_avg = recent_total / len(recent_months) if recent_months else 0
        
        if prior_months:
            prior_total = sum(monthly_expenses[m]['categories'][category] for m in prior_months)
            prior_avg = prior_total / len(prior_months)
            
            if prior_avg > 0:
                pct_change = ((recent_avg - prior_avg) / prior_avg) * 100
                category_trends[category] = {
                    'recent_avg': recent_avg,
                    'prior_avg': prior_avg,
                    'pct_change': pct_change,
                    'trend': 'increasing' if pct_change > 5 else ('decreasing' if pct_change < -5 else 'stable')
                }
    
    # Detect seasonal patterns (same month year-over-year)
    seasonal_patterns = {}
    current_month = datetime.now().month
    
    for target_month in range(1, 13):
        month_data = []
        for year in [2023, 2024, 2025]:  # Look at last 3 years
            month_key = f"{year}-{target_month:02d}"
            if month_key in monthly_expenses:
                month_data.append(monthly_expenses[month_key]['total'])
        
        if len(month_data) >= 2:
            avg_spending = sum(month_data) / len(month_data)
            seasonal_patterns[calendar.month_name[target_month]] = {
                'avg_spending': avg_spending,
                'data_points': len(month_data)
            }
    
    context = {
        'monthly_cashflow': dict(sorted(monthly_cashflow.items())),
        'monthly_income': dict(sorted(monthly_income.items())),
        'monthly_expenses': dict(sorted(monthly_expenses.items())),
        'category_trends': category_trends,
        'seasonal_patterns': seasonal_patterns,
        'summary': {
            'avg_monthly_income': sum(m['total'] for m in monthly_income.values()) / len(monthly_income) if monthly_income else 0,
            'avg_monthly_expenses': sum(m['total'] for m in monthly_expenses.values()) / len(monthly_expenses) if monthly_expenses else 0,
            'avg_monthly_savings': sum(m['net'] for m in monthly_cashflow.values()) / len(monthly_cashflow) if monthly_cashflow else 0,
            'avg_savings_rate': sum(m['savings_rate'] for m in monthly_cashflow.values()) / len(monthly_cashflow) if monthly_cashflow else 0
        }
    }
    
    print(f"[INFO] Foresight context prepared:")
    print(f"[INFO]   {len(all_months)} months of data")
    print(f"[INFO]   Avg monthly income: ${context['summary']['avg_monthly_income']:,.2f}")
    print(f"[INFO]   Avg monthly expenses: ${context['summary']['avg_monthly_expenses']:,.2f}")
    print(f"[INFO]   Avg monthly savings: ${context['summary']['avg_monthly_savings']:,.2f}")
    print(f"[INFO]   Avg savings rate: {context['summary']['avg_savings_rate']:.1f}%")
    
    return context

# ==================== CONTEXT FORMATTING ====================

def format_foresight_context_for_llm(context):
    """
    Format foresight context for LLM prediction
    """
    sections = []
    
    # Header
    sections.append("# FINANCIAL FORECASTING DATA (24 Month History)\n")
    sections.append(f"Current Date: {datetime.now().strftime('%B %Y')}\n")
    
    # Summary metrics
    sections.append("## HISTORICAL AVERAGES\n")
    summary = context['summary']
    sections.append(f"**Average Monthly Income**: ${summary['avg_monthly_income']:,.2f}")
    sections.append(f"**Average Monthly Expenses**: ${summary['avg_monthly_expenses']:,.2f}")
    sections.append(f"**Average Monthly Savings**: ${summary['avg_monthly_savings']:,.2f}")
    sections.append(f"**Average Savings Rate**: {summary['avg_savings_rate']:.1f}%")
    
    # Recent cash flow trend (last 6 months)
    sections.append("\n## RECENT CASH FLOW (Last 6 Months)\n")
    recent_months = list(context['monthly_cashflow'].items())[-6:]
    for month, data in recent_months:
        sections.append(
            f"**{month}**: Income ${data['income']:,.2f} | "
            f"Expenses ${data['expenses']:,.2f} | "
            f"Net {'+' if data['net'] >= 0 else ''}{data['net']:,.2f} | "
            f"Savings Rate {data['savings_rate']:.1f}%"
        )
    
    # Category trends
    if context['category_trends']:
        sections.append("\n## CATEGORY TRENDS (Last 6 months vs Prior 6 months)\n")
        sorted_trends = sorted(
            context['category_trends'].items(),
            key=lambda x: abs(x[1]['pct_change']),
            reverse=True
        )[:10]
        
        for category, trend in sorted_trends:
            sections.append(
                f"**{category.title()}**: ${trend['recent_avg']:,.2f}/month recent "
                f"(vs ${trend['prior_avg']:,.2f} prior, {trend['pct_change']:+.1f}% change, "
                f"Trend: {trend['trend']})"
            )
    
    # Seasonal patterns
    if context['seasonal_patterns']:
        sections.append("\n## SEASONAL SPENDING PATTERNS (Historical)\n")
        for month_name, pattern in sorted(context['seasonal_patterns'].items(), 
                                         key=lambda x: list(calendar.month_name).index(x[0])):
            sections.append(
                f"**{month_name}**: Avg ${pattern['avg_spending']:,.2f} "
                f"(based on {pattern['data_points']} years of data)"
            )
    
    # Monthly expense breakdown (last 3 months)
    sections.append("\n## RECENT MONTHLY EXPENSES BY CATEGORY (Last 3 Months)\n")
    recent_expense_months = list(context['monthly_expenses'].items())[-3:]
    for month, data in recent_expense_months:
        sections.append(f"\n**{month}**: ${data['total']:,.2f} total")
        sorted_categories = sorted(
            data['categories'].items(),
            key=lambda x: x[1],
            reverse=True
        )[:8]
        for cat, amount in sorted_categories:
            sections.append(f"  - {cat.title()}: ${amount:,.2f}")
    
    formatted_text = "\n".join(sections)
    print(f"[INFO] Formatted foresight context: {len(formatted_text)} characters")
    
    return formatted_text

# ==================== LLM ANALYSIS ====================

FORESIGHTS_PROMPT = """You are Sagaa's Financial Foresights Engine. Generate forward-looking predictions with visual data for card display.

USER DATA:
{context}

Generate foresights in this EXACT JSON format (respond with valid JSON only):

{{
  "foresights": [
    {{
      "title": "Clear predictive headline under 80 characters",
      "priority": "HIGH|MEDIUM|LOW",
      "type": "seasonal_surge|cash_flow_warning|income_change|spending_trend|budget_risk",
      "timeframe": "next_month|next_3_months|next_6_months",
      "confidence": "high|medium|low",
      
      "visualization": {{
        "chart_type": "bar_with_trend|line|bar",
        "data": [
          {{"label": "Month", "value": 12345.67, "highlight": false}}
        ],
        "trend_line": [optional array of trend values],
        "annotation": "Brief chart note under 50 chars"
      }},
      
      "key_metric": {{
        "primary_value": "$X,XXX or percentage",
        "primary_label": "Clear metric label",
        "secondary": "comparison or context",
        "icon": "alert|trend-up|trend-down|info"
      }},
      
      "card_content": {{
        "summary": "One crisp predictive sentence max 150 chars",
        "actions": [
          "Specific preparatory action max 100 chars",
          "Another specific action max 100 chars"
        ],
        "impact": "Quantified prevention or outcome max 100 chars"
      }},
      
      "full_content": {{
        "what_predicted": "2-3 paragraphs explaining the prediction with data",
        "why_matters": "2-3 paragraphs on consequences if unprepared",
        "detailed_actions": [
          {{
            "action": "Specific preparatory step",
            "rationale": "Why this prevents the predicted issue"
          }}
        ],
        "expected_impact": "Detailed outcome if actions taken"
      }}
    }}
  ]
}}

CRITICAL RULES:
1. ALL NUMBERS from USER DATA - no made-up predictions
2. Use bar_with_trend for time-based predictions (show historical + forecast)
3. Use line chart for seasonal patterns (show year-over-year)
4. Predictions must be based on actual historical patterns
5. Summary must be PREDICTIVE ("will surge", "expect increase")
6. Actions must be PREPARATORY ("set aside", "prepare for", "schedule")
7. Timeframe indicates WHEN prediction applies
8. Confidence based on pattern strength in data

CHART TYPE GUIDELINES:
- bar_with_trend: Show last 6 months + next 3 months projection
- line: Show seasonal pattern (same month across years)
- bar: Show category-level predictions

Generate 1-3 high-confidence foresights only.
"""

def generate_foresights_via_llm(formatted_context):
    """
    Call Bedrock Claude to generate financial foresights
    """
    print(f"[INFO] Calling LLM for foresight generation...")
    
    try:
        prompt = FORESIGHTS_PROMPT.format(
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
    
def parse_and_validate_foresights(llm_response, source_context):
    """Parse LLM JSON response and validate"""
    print(f"[INFO] Parsing and validating LLM foresights")
    
    try:
        # Handle markdown code blocks
        llm_response = llm_response.strip()
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
        foresights = parsed.get('foresights', [])
        
        print(f"[INFO] Parsed {len(foresights)} foresights from LLM")
        
        # Validate each
        validated = []
        for idx, foresight in enumerate(foresights):
            print(f"[INFO] Validating foresight {idx + 1}: {foresight.get('title', 'untitled')}")
            
            # Basic structure check
            required = ['title', 'priority', 'type', 'visualization', 'key_metric', 'card_content', 'full_content']
            if all(field in foresight for field in required):
                validated.append(foresight)
            else:
                print(f"[WARN] Foresight {idx + 1} missing required fields")
        
        return validated
        
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to parse JSON: {e}")
        return []

# ==================== STORAGE ====================

def store_foresights(user_id, foresights):
    """
    Store generated foresights in DynamoDB
    """
    print(f"[INFO] Storing {len(foresights)} foresights for user: {user_id}")
    
    try:
        table = dynamodb.Table(INSIGHTS_TABLE)
        stored_count = 0
        
        for foresight in foresights:
            foresight_id = str(uuid.uuid4())
            timestamp = datetime.now().isoformat()
            
            # Build DynamoDB item
            item = {
                # Existing fields
                'PK': f"USER#{user_id}",
                'SK': f"FORESIGHT#{timestamp}#{foresight['type']}",
                'insight_id': foresight_id,
                'insight_type': foresight['type'],
                'priority': foresight['priority'],
                'status': 'active',
                'generated_at': timestamp,
                'expires_at': (datetime.now() + timedelta(days=90)).isoformat(),
                'viewed': False,
                'viewed_at': None,
                'dismissed': False,
                'dismissed_at': None,
                
                # Enhanced fields
                'title': foresight['title'],
                'summary': foresight['card_content']['summary'],
                'full_content': foresight['full_content'],
                'raw_insight': foresight,
                
                # New card fields
                'actions': foresight['card_content']['actions'],
                'impact': foresight['card_content']['impact'],
                'visualization': foresight['visualization'],
                'key_metric': foresight['key_metric'],
                
                # Foresight-specific
                'timeframe': foresight['timeframe'],
                'confidence': foresight['confidence'],
            }

            # ✅ Convert floats to Decimal
            item = convert_floats_to_decimal(item)

            table.put_item(Item=item)
            stored_count += 1
            print(f"[INFO] Stored foresight: {foresight['title']}")
        
        print(f"[SUCCESS] Stored {stored_count} foresights in DynamoDB")
        return stored_count
        
    except Exception as e:
        print(f"[ERROR] Failed to store foresights: {e}")
        raise

# ==================== LAMBDA HANDLER ====================

def lambda_handler(event, context):
    """
    Main Lambda handler for foresights generation
    Triggered monthly or quarterly to generate forward-looking predictions
    """
    
    try:
        print(f"[INFO] Foresights Lambda started")
        print(f"[DEBUG] Event: {json.dumps(event)}")
        
        # Determine user(s)
        if 'user_id' in event:
            user_ids = [event['user_id']]
            print(f"[INFO] Processing single user: {user_ids[0]}")
        else:
            # TODO: Get all active users from DynamoDB or Cognito
            user_ids = ['user_001']
            print(f"[INFO] Processing {len(user_ids)} users")
        
        results = []
        
        for user_id in user_ids:
            try:
                print(f"\n{'='*60}")
                print(f"[INFO] Generating foresights for user: {user_id}")
                print(f"{'='*60}")
                
                # 1. Fetch 24 months of transactions (including income)
                transactions = fetch_user_transactions(
                    user_id, 
                    months=24,
                    include_income=True
                )
                
                if not transactions or len(transactions) < 100:
                    print(f"[SKIP] Insufficient data for {user_id}: {len(transactions)} transactions")
                    results.append({
                        'user_id': user_id,
                        'status': 'skipped',
                        'reason': 'insufficient_data'
                    })
                    continue
                
                # 2. Prepare foresight context
                context = prepare_foresight_context(transactions)
                
                # 3. Format for LLM
                formatted_context = format_foresight_context_for_llm(context)
                
                # 4. Generate foresights via LLM
                llm_response = generate_foresights_via_llm(formatted_context)
                foresights = parse_and_validate_foresights(llm_response, context)
                
                if not foresights:
                    print(f"[WARN] No foresights generated for {user_id}")
                    results.append({
                        'user_id': user_id,
                        'status': 'no_foresights',
                        'reason': 'llm_generated_no_foresights'
                    })
                    continue
                
                # 6. Store foresights
                stored_count = store_foresights(user_id, foresights)
                
                results.append({
                    'user_id': user_id,
                    'status': 'success',
                    'foresights_generated': stored_count
                })
                
                print(f"[SUCCESS] Generated {stored_count} foresights for {user_id}")
                
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
        print(f"[INFO] Foresights processing complete")
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
                'message': 'Failed to generate foresights'
            })
        }