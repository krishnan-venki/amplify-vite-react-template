"""
Sagaa Monthly Review Insights Engine - ENHANCED VERSION
Generates insights with visualization data for rich card display
"""

import json
import boto3
import os
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from pinecone import Pinecone
from collections import defaultdict
from decimal import Decimal
import uuid
import calendar

# ==================== CONFIGURATION ====================

REGION = os.environ.get('AWS_REGION', 'us-west-2')
SECRET_NAME = os.environ.get('PINECONE_SECRET_NAME', 'sagga/pinecone/credentials')
INSIGHTS_TABLE = os.environ.get('INSIGHTS_TABLE', 'sagaa-proactive-insights')
GOALS_TABLE = 'sagaa_user_goals'
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

def fetch_transactions_for_month(user_id, year, month):
    """Fetch transactions for a specific month"""
    print(f"[INFO] Fetching transactions for {year}-{month:02d}")
    
    try:
        index = get_pinecone_index()
        
        results = index.query(
            vector=[0.0] * 1536,
            filter={
                "user_id": {"$eq": user_id},
                "year": {"$eq": year},
                "month": {"$eq": month},
                "type": {"$eq": "debit"},
                "affects_budget": {"$eq": True}
            },
            top_k=10000,
            include_metadata=True
        )
        
        transactions = [match['metadata'] for match in results.get('matches', [])]
        print(f"[INFO] Fetched {len(transactions)} transactions for {year}-{month:02d}")
        return transactions
        
    except Exception as e:
        print(f"[ERROR] Failed to fetch transactions: {e}")
        raise

def fetch_user_goals(user_id):
    """Fetch active goals with latest evaluation for user"""
    print(f"[INFO] Fetching goals for user: {user_id}")
    
    try:
        table = dynamodb.Table(GOALS_TABLE)
        
        response = table.query(
            KeyConditionExpression='user_id = :uid',
            ExpressionAttributeValues={
                ':uid': user_id
            }
        )
        
        goals = response['Items']
        print(f"[INFO] Found {len(goals)} goals")
        
        # Extract relevant context for LLM
        goal_context = []
        for goal in goals:
            if goal.get('status') != 'active':
                continue
            
            # Get latest evaluation
            eval_history = goal.get('evaluation_history', [])
            latest_eval = eval_history[-1] if eval_history else None
            
            context = {
                'goal_id': goal['goal_id'],
                'name': goal['goal_name'],
                'type': goal['goal_type'],
                'priority': goal['context']['user_priority'],
                'intent': goal['context']['intent'],
                'progress': goal['progress'],
                'target': goal['target']
            }
            
            # Add latest evaluation summary if exists
            if latest_eval:
                context['latest_evaluation'] = {
                    'status': latest_eval.get('status', 'unknown'),
                    'insights': latest_eval.get('insights', [])[:2],  # Top 2 insights
                    'recommendations': latest_eval.get('recommendations', [])[:2]  # Top 2 recommendations
                }
            
            goal_context.append(context)
        
        return goal_context
        
    except Exception as e:
        print(f"[ERROR] Failed to fetch goals: {e}")
        return []

def fetch_baseline_transactions(user_id, target_year, target_month):
    """Fetch 12 months of baseline data (12 months before target month)"""
    print(f"[INFO] Fetching baseline transactions (12 months before {target_year}-{target_month:02d})")
    
    baseline_transactions = []
    target_date = datetime(target_year, target_month, 1)
    
    for i in range(1, 13):
        baseline_date = target_date - relativedelta(months=i)
        month_txns = fetch_transactions_for_month(
            user_id, 
            baseline_date.year, 
            baseline_date.month
        )
        baseline_transactions.extend(month_txns)
    
    print(f"[INFO] Fetched {len(baseline_transactions)} baseline transactions")
    return baseline_transactions

# ==================== CONTEXT PREPARATION ====================

def aggregate_transactions(transactions):
    """Aggregate transaction data"""
    total_spending = 0.0
    category_spending = defaultdict(float)
    merchant_spending = defaultdict(float)
    discretionary = 0.0
    essential = 0.0
    weekend = 0.0
    weekday = 0.0
    subscriptions = 0.0
    
    for txn in transactions:
        amount = abs(float(txn.get('amount', 0)))
        category = txn.get('category', 'uncategorized')
        merchant = txn.get('merchant', 'Unknown')
        
        total_spending += amount
        category_spending[category] += amount
        merchant_spending[merchant] += amount
        
        if txn.get('is_discretionary', True):
            discretionary += amount
        else:
            essential += amount
        
        if txn.get('is_weekend', False):
            weekend += amount
        else:
            weekday += amount
        
        if txn.get('is_subscription', False):
            subscriptions += amount
    
    return {
        'total': total_spending,
        'count': len(transactions),
        'categories': dict(category_spending),
        'merchants': dict(merchant_spending),
        'discretionary': discretionary,
        'essential': essential,
        'weekend': weekend,
        'weekday': weekday,
        'subscriptions': subscriptions
    }

def prepare_monthly_review_context(target_transactions, baseline_transactions, target_year, target_month, goals):
    """Prepare context comparing target month to baseline"""
    print(f"[INFO] Preparing monthly review context")
    
    # Aggregate target month
    target_data = aggregate_transactions(target_transactions)
    
    # Aggregate baseline
    baseline_data = aggregate_transactions(baseline_transactions)
    baseline_monthly_avg = {
        'total': baseline_data['total'] / 12,
        'discretionary': baseline_data['discretionary'] / 12,
        'essential': baseline_data['essential'] / 12,
        'weekend': baseline_data['weekend'] / 12,
        'weekday': baseline_data['weekday'] / 12,
        'subscriptions': baseline_data['subscriptions'] / 12
    }
    
    # Calculate category averages for baseline
    baseline_category_avg = {}
    for category, total in baseline_data['categories'].items():
        baseline_category_avg[category] = total / 12
    
    # Compare target to baseline
    comparison = {
        'total_diff': target_data['total'] - baseline_monthly_avg['total'],
        'total_pct_change': ((target_data['total'] - baseline_monthly_avg['total']) / baseline_monthly_avg['total'] * 100) if baseline_monthly_avg['total'] > 0 else 0,
        'discretionary_diff': target_data['discretionary'] - baseline_monthly_avg['discretionary'],
        'essential_diff': target_data['essential'] - baseline_monthly_avg['essential'],
        'weekend_diff': target_data['weekend'] - baseline_monthly_avg['weekend'],
        'category_changes': {}
    }
    
    # Category-level comparisons
    for category, target_amount in target_data['categories'].items():
        baseline_avg = baseline_category_avg.get(category, 0)
        if baseline_avg > 0:
            pct_change = ((target_amount - baseline_avg) / baseline_avg) * 100
            diff = target_amount - baseline_avg
            
            if abs(pct_change) > 10 and abs(diff) > 50:
                comparison['category_changes'][category] = {
                    'target': target_amount,
                    'baseline_avg': baseline_avg,
                    'diff': diff,
                    'pct_change': pct_change
                }
    
    # Calculate discretionary percentage
    discretionary_pct = (target_data['discretionary'] / target_data['total'] * 100) if target_data['total'] > 0 else 0
    baseline_discretionary_pct = (baseline_monthly_avg['discretionary'] / baseline_monthly_avg['total'] * 100) if baseline_monthly_avg['total'] > 0 else 0
    
    context = {
        'target_month': f"{target_year}-{target_month:02d}",
        'target_month_name': calendar.month_name[target_month],
        'target_data': target_data,
        'baseline_monthly_avg': baseline_monthly_avg,
        'comparison': comparison,
        'discretionary_pct': discretionary_pct,
        'baseline_discretionary_pct': baseline_discretionary_pct
    }
    context['goals'] = goals
    return context

# ==================== LLM PROMPT GENERATION ====================

def format_monthly_review_for_llm(context):
    """Format context for LLM consumption"""
    
    sections = []
    
    # Target month summary
    sections.append(f"## TARGET MONTH: {context['target_month_name']} {context['target_month']}")
    sections.append(f"Total Spending: ${context['target_data']['total']:,.2f}")
    sections.append(f"Transaction Count: {context['target_data']['count']}")
    sections.append(f"Discretionary: ${context['target_data']['discretionary']:,.2f} ({context['discretionary_pct']:.1f}%)")
    sections.append(f"Essential: ${context['target_data']['essential']:,.2f}")
    sections.append(f"Subscriptions: ${context['target_data']['subscriptions']:,.2f}")
    
    # Baseline comparison
    sections.append(f"\n## BASELINE (12-Month Average)")
    sections.append(f"Average Monthly Spending: ${context['baseline_monthly_avg']['total']:,.2f}")
    sections.append(f"Discretionary Average: ${context['baseline_monthly_avg']['discretionary']:,.2f} ({context['baseline_discretionary_pct']:.1f}%)")
    sections.append(f"Essential Average: ${context['baseline_monthly_avg']['essential']:,.2f}")
    
    # Comparison
    sections.append(f"\n## COMPARISON")
    diff = context['comparison']['total_diff']
    pct = context['comparison']['total_pct_change']
    direction = "higher" if diff > 0 else "lower"
    sections.append(f"Total Change: ${abs(diff):,.2f} {direction} ({abs(pct):.1f}%)")
    
    # Category changes
    if context['comparison']['category_changes']:
        sections.append(f"\n## SIGNIFICANT CATEGORY CHANGES")
        for category, change in sorted(
            context['comparison']['category_changes'].items(),
            key=lambda x: abs(x[1]['diff']),
            reverse=True
        )[:5]:  # Top 5 changes
            direction = "↑" if change['diff'] > 0 else "↓"
            sections.append(
                f"{direction} {category}: ${change['target']:,.2f} "
                f"(baseline: ${change['baseline_avg']:,.2f}, "
                f"change: {change['pct_change']:+.1f}%)"
            )
    
    # Top categories
    sections.append(f"\n## TOP SPENDING CATEGORIES (Target Month)")
    for category, amount in sorted(
        context['target_data']['categories'].items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]:
        sections.append(f"- {category}: ${amount:,.2f}")
    
    # Add goals section
    if context.get('goals'):
        sections.append("\n## ACTIVE FINANCIAL GOALS\n")
        for goal in context['goals']:
            sections.append(f"\n**{goal['name']}** ({goal['type']}, Priority: {goal['priority']})")
            sections.append(f"Intent: {goal['intent']}")
            
            if goal['type'] == 'savings_target':
                current = float(goal['progress'].get('current_amount', 0))
                target = float(goal['target'].get('target_value', 0))
                pct = float(goal['progress'].get('percentage_complete', 0))
                sections.append(f"Progress: ${current:,.2f} / ${target:,.2f} ({pct:.0f}%)")
            else:  # spending_reduction
                current = float(goal['progress'].get('current_period_spending', 0))
                target = float(goal['target'].get('target_value', 0))
                sections.append(f"Current: ${current:,.2f}/month, Target: ${target:,.2f}/month")
            
            # Add latest evaluation if exists
            if goal.get('latest_evaluation'):
                eval = goal['latest_evaluation']
                sections.append(f"Status: {eval['status']}")
                if eval.get('insights'):
                    sections.append("Key Insights:")
                    for insight in eval['insights']:
                        sections.append(f"  - {insight}")
                if eval.get('recommendations'):
                    sections.append("Recommendations:")
                    for rec in eval['recommendations']:
                        sections.append(f"  - {rec}")

    return "\n".join(sections)

# ==================== ENHANCED LLM GENERATION ====================

MONTHLY_REVIEW_PROMPT_TEMPLATE = """You are Sagaa's Goal Achievement Coach. Your PRIMARY mission is helping users achieve their financial goals through intelligent spending analysis and specific reallocation recommendations.

🎯 GOAL-CENTRIC ANALYSIS FRAMEWORK:

Your analysis must ALWAYS answer these questions:
1. How did this month's spending IMPACT the user's goals? (accelerated, delayed, blocked)
2. What SPECIFIC spending changes would accelerate goal achievement?
3. Which categories should be CUT and by HOW MUCH?
4. Where should those funds be REALLOCATED?
5. How many MONTHS/WEEKS faster would the goal be achieved?

USER SPENDING DATA:
{context}

USER FINANCIAL GOALS:
{goals}

═══════════════════════════════════════════════════════════════

MANDATORY ANALYSIS APPROACH:

IF USER HAS ACTIVE GOALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For EACH high-priority goal, you MUST:

1. **Calculate Goal Impact**
   - Compare this month's spending to baseline
   - Identify categories where spending increased
   - Calculate how much those increases delayed the goal
   - Calculate how much decreased spending accelerated the goal

2. **Generate Reallocation Plan**
   - Identify the TOP 2-3 discretionary categories to reduce
   - Specify EXACT dollar amounts to cut (must be realistic, typically 20-40% of category)
   - Show WHERE to reallocate those funds (specific goal)
   - Calculate new goal completion date with reallocation

3. **Quantify Timeline Impact**
   - Current pace: "At current spending, goal completes in X months"
   - With reallocation: "With this plan, goal completes in Y months (Z months faster)"
   - Monthly acceleration: "Each month you execute this saves W days"

EXAMPLE GOAL INSIGHT (Savings Goal):
{{
  "title": "Cut Dining $150/mo → Hit Emergency Fund 3 Months Early",
  "category": "goal_accelerator",
  "goal_id": "Goal_001",
  "goal_name": "Emergency Fund",
  "goal_type": "savings_target",
  
  "reallocation_plan": {{
    "from_categories": [
      {{"category": "Dining", "current": 450, "target": 300, "reduction": 150}},
      {{"category": "Entertainment", "current": 200, "target": 150, "reduction": 50}}
    ],
    "to_goal": "Emergency Fund",
    "total_monthly_increase": 200,
    "current_monthly_contribution": 300,
    "new_monthly_contribution": 500
  }},
  
  "timeline_impact": {{
    "current_completion": "9 months",
    "accelerated_completion": "6 months", 
    "acceleration": "3 months faster",
    "current_pace": "$300/month",
    "required_pace": "$500/month"
  }}
}}

EXAMPLE GOAL INSIGHT (Spending Reduction Goal):
{{
  "title": "Dining Jumped $120 - Back on Track With 2 Simple Swaps",
  "category": "goal_blocker",
  "goal_id": "Goal_003",
  "goal_name": "Reduce Dining Spending",
  "goal_type": "spending_reduction",
  
  "spending_analysis": {{
    "target_monthly": 250,
    "actual_monthly": 370,
    "over_target": 120,
    "baseline_monthly": 350,
    "vs_baseline": "+20"
  }},
  
  "reallocation_plan": {{
    "specific_actions": [
      {{"action": "Replace 4 restaurant dinners with home cooking", "savings": 80}},
      {{"action": "Pack lunch 2x/week instead of buying", "savings": 40}}
    ],
    "total_monthly_savings": 120,
    "gets_you_to": "target of $250/month"
  }}
}}

IF USER HAS NO ACTIVE GOALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Analyze spending patterns and SUGGEST goal creation:

1. **Identify Goal Opportunities**
   - High discretionary spending → suggest savings goal
   - Increasing category → suggest spending reduction goal
   - Inconsistent savings → suggest emergency fund goal

2. **Quantify the Opportunity**
   - "You spent $X on [category] - that's $Y above baseline"
   - "If you saved half of that, you could build $Z in N months"
   - Show realistic goal target and timeline

EXAMPLE GOAL SUGGESTION:
{{
  "title": "Turn $400/mo Dining Into $2,400 Vacation Fund by December",
  "category": "goal_suggestion",
  "suggested_goal": {{
    "type": "savings_target",
    "name": "Vacation Fund",
    "target_amount": 2400,
    "timeline_months": 6,
    "funding_source": "Reduce dining from $400 to $200/month"
  }},
  "opportunity_analysis": {{
    "current_spending": "Dining: $400/month (baseline: $280)",
    "reduction_potential": "$200/month (still above baseline)",
    "goal_achievement": "6 months to $2,400 vacation fund"
  }}
}}

═══════════════════════════════════════════════════════════════

JSON OUTPUT FORMAT:

Generate insights in this EXACT JSON format (respond with valid JSON only, no other text):

{{
  "insights": [
    {{
      "title": "Action-oriented headline with numbers <80 chars",
      "priority": "HIGH|MEDIUM|LOW",
      "category": "goal_accelerator|goal_blocker|goal_at_risk|goal_milestone|goal_reallocation|goal_suggestion",
      "timeframe": "immediate|this_week|this_month",
      
      "goal_context": {{
        "goal_id": "Goal_001",
        "goal_name": "Emergency Fund" or "New Goal Suggestion",
        "goal_type": "savings_target|spending_reduction|debt_payoff",
        "current_status": "Brief status description"
      }},
      
      "visualization": {{
        "chart_type": "goal_progress_timeline|reallocation_flow|comparison_bars|goal_velocity",
        "data": [
          {{"label": "Category/Timeline", "value": 1234.56, "highlight": true}}
        ],
        "annotation": "Shows timeline acceleration or reallocation"
      }},
      
      "key_metric": {{
        "primary_value": "$XXX or X months",
        "primary_label": "Timeline acceleration or savings",
        "secondary": "Current vs target pace",
        "icon": "target|alert|trend-up|clock"
      }},
      
      "reallocation_plan": {{
        "from_categories": [
          {{"category": "Dining", "current": 450, "target": 300, "reduction": 150}}
        ],
        "to_goal": "Goal Name",
        "total_monthly_impact": 150,
        "timeline_acceleration": "3 months faster"
      }},
      
      "card_content": {{
        "summary": "One sentence showing goal impact <150 chars",
        "actions": [
          "Cut [Category] from $X to $Y → save $Z/month",
          "Reallocate $Z to [Goal] → complete A months faster"
        ],
        "impact": "Complete [Goal] by [Date] instead of [Date]"
      }},
      
      "full_content": {{
        "what_happening": "Explain spending changes and goal impact with specific numbers",
        "why_matters": "Why this affects goal timeline and what's at stake",
        "detailed_actions": [
          {{
            "action": "Specific reallocation with dollar amounts",
            "rationale": "How this accelerates the goal with timeline math"
          }}
        ],
        "expected_impact": "Detailed timeline acceleration and milestone impact"
      }}
    }}
  ]
}}

═══════════════════════════════════════════════════════════════

CRITICAL RULES:

1. **EVERY insight MUST connect to a goal** (active or suggested)
2. **ALL numbers from USER DATA** - never fabricate values
3. **SPECIFIC reallocation plans** - exact categories and dollar amounts
4. **QUANTIFIED timeline impact** - "X months faster" not "faster"
5. **REALISTIC reductions** - 20-40% of discretionary spending, not 80%
6. **Address ALL high-priority goals** - generate 1 insight per high-priority goal
7. **Goal suggestions** - if no active goals, suggest 1-2 based on spending patterns

PRIORITIZATION:
- HIGH: Goals at risk, major blockers, or high-impact accelerators (>$100/month reallocation)
- MEDIUM: Moderate opportunities (>$50/month reallocation)  
- LOW: Minor optimizations (<$50/month reallocation)

CHART TYPE GUIDELINES:
- goal_progress_timeline: Show current vs accelerated goal completion dates
- reallocation_flow: Visualize money moving from categories to goals
- goal_velocity: Current monthly pace vs required pace
- comparison_bars: Category spending changes that impact goals

Generate 2-4 insights:
- 1 insight per high-priority active goal
- 1-2 goal suggestions if no active goals
- Focus on HIGHEST IMPACT reallocation opportunities
"""

def generate_monthly_review_via_llm(formatted_context, goals_text="No active financial goals"):
    """Generate insights using LLM with enhanced prompt"""
    print(f"[INFO] Generating monthly review insights via LLM")
    
    try:
        prompt = MONTHLY_REVIEW_PROMPT_TEMPLATE.format(
            context=formatted_context,
            goals=goals_text
        )
        
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 6000,
            "temperature": 0.2,  # Lower for more consistent output
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        response = bedrock_runtime.invoke_model(
            modelId=LLM_MODEL,
            body=json.dumps(body)
        )
        
        response_body = json.loads(response['body'].read())
        llm_output = response_body['content'][0]['text']
        
        print(f"[DEBUG] LLM Response length: {len(llm_output)} chars")
        
        return llm_output
        
    except Exception as e:
        print(f"[ERROR] LLM generation failed: {e}")
        raise

# ==================== JSON PARSING & VALIDATION ====================

def parse_and_validate_insights(llm_response, source_context):
    """Parse LLM JSON response and validate against source data"""
    print(f"[INFO] Parsing and validating LLM insights")
    
    try:
        # Try to extract JSON from response
        llm_response = llm_response.strip()
        
        # Handle markdown code blocks if present
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
        
        # Validate each insight
        validated_insights = []
        for idx, insight in enumerate(insights):
            print(f"[INFO] Validating insight {idx + 1}: {insight.get('title', 'untitled')}")
            
            is_valid, corrected_insight = validate_insight(insight, source_context)
            
            if is_valid:
                validated_insights.append(corrected_insight)
            else:
                print(f"[WARN] Insight {idx + 1} failed validation, skipping")
        
        print(f"[SUCCESS] {len(validated_insights)} insights validated")
        return validated_insights
        
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to parse JSON: {e}")
        print(f"[DEBUG] LLM Response: {llm_response[:500]}")
        return []
    except Exception as e:
        print(f"[ERROR] Validation failed: {e}")
        import traceback
        traceback.print_exc()
        return []

def validate_insight(insight, source_context):
    """
    Validate insight structure and data accuracy
    Returns (is_valid, corrected_insight)
    """
    errors = []
    warnings = []
    corrected = insight.copy()
    
    # Check required fields
    required_fields = ['title', 'priority', 'category', 'visualization', 'key_metric', 'card_content', 'full_content']
    for field in required_fields:
        if field not in insight:
            errors.append(f"Missing required field: {field}")
    
    if errors:
        print(f"[ERROR] Validation errors: {errors}")
        return False, insight
    
    # Validate card content length
    try:
        summary = insight['card_content']['summary']
        if len(summary) > 150:
            warnings.append(f"Summary too long ({len(summary)} chars), truncating")
            corrected['card_content']['summary'] = summary[:147] + '...'
        
        for i, action in enumerate(insight['card_content']['actions']):
            if len(action) > 100:
                warnings.append(f"Action {i+1} too long ({len(action)} chars)")
        
        impact = insight['card_content']['impact']
        if len(impact) > 100:
            warnings.append(f"Impact too long ({len(impact)} chars), truncating")
            corrected['card_content']['impact'] = impact[:97] + '...'
    except KeyError as e:
        errors.append(f"Missing card content field: {e}")
        return False, insight
    
    # Validate chart data against source
    try:
        chart_data = insight['visualization']['data']
        target_total = source_context['target_data']['total']
        baseline_total = source_context['baseline_monthly_avg']['total']
        
        # Check if chart values are reasonable
        for datapoint in chart_data:
            value = datapoint.get('value', 0)
            
            # Check if value is wildly off from actual data
            max_reasonable = max(target_total, baseline_total) * 1.5
            if value > max_reasonable:
                warnings.append(f"Chart value {value} seems too high (max: {max_reasonable})")
            
            # Try to match against actual data
            label = datapoint.get('label', '')
            if label in source_context['target_data']['categories']:
                actual_value = source_context['target_data']['categories'][label]
                if abs(value - actual_value) > 1:
                    warnings.append(f"Chart data corrected: {label} {value} → {actual_value}")
                    datapoint['value'] = actual_value
    
    except KeyError as e:
        warnings.append(f"Chart validation issue: {e}")
    
    # Check that actions are concrete
    try:
        for action in insight['card_content']['actions']:
            has_number = any(char.isdigit() for char in action)
            has_specificity = any(word in action.lower() for word in ['$', 'by', 'before', 'reduce', 'save', 'cut'])
            
            if not (has_number or has_specificity):
                warnings.append(f"Action may be too vague: {action}")
    except Exception:
        pass
    
    if warnings:
        print(f"[WARN] Validation warnings: {warnings}")
    
    return True, corrected

# ==================== DYNAMODB FLOAT CONVERSION ====================

def convert_floats_to_decimal(obj):
    """
    Recursively convert all float values to Decimal for DynamoDB compatibility
    
    DynamoDB does not support Python float types - must use Decimal instead.
    This function walks through nested dicts, lists, and converts any floats.
    """
    if isinstance(obj, dict):
        return {k: convert_floats_to_decimal(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_floats_to_decimal(item) for item in obj]
    elif isinstance(obj, float):
        # Convert float to Decimal, preserving precision
        return Decimal(str(obj))
    else:
        return obj

# ==================== STORAGE ====================

def store_insights(user_id, insights, target_month):
    """Store validated insights in DynamoDB with enhanced structure"""
    print(f"[INFO] Storing {len(insights)} enhanced insights for user: {user_id}")
    
    try:
        table = dynamodb.Table(INSIGHTS_TABLE)
        stored_count = 0
        
        for insight in insights:
            insight_id = str(uuid.uuid4())
            timestamp = datetime.now().isoformat()
            
            # Build DynamoDB item
            item = {
                # ========== EXISTING FIELDS (RETAINED) ==========
                'PK': f"USER#{user_id}",
                'SK': f"GOALS#{timestamp}#monthly_review",
                'insight_id': insight_id,
                'insight_type': insight.get('category', 'monthly_review'),
                'priority': insight['priority'],
                'status': 'active',
                'generated_at': timestamp,
                'expires_at': (datetime.now() + timedelta(days=45)).isoformat(),
                'viewed': False,
                'viewed_at': None,
                'dismissed': False,
                'dismissed_at': None,
                
                # ========== ENHANCED EXISTING FIELDS ==========
                'title': insight['title'],
                'summary': insight['card_content']['summary'],  # Enhanced: purpose-built for cards
                'full_content': insight['full_content'],        # Enhanced: structured JSON instead of markdown
                'raw_insight': insight,                         # Enhanced: includes visualization data
                
                # ========== NEW FIELDS FOR CARD DISPLAY ==========
                'actions': insight['card_content']['actions'],
                'impact': insight['card_content']['impact'],
                'visualization': insight['visualization'],
                'key_metric': insight['key_metric'],
                'timeframe': insight.get('timeframe', 'this_month'),
                
                # ========== GOAL-SPECIFIC FIELDS ==========
                'goal_context': insight.get('goal_context'),  # Goal name, type, status
                'reallocation_plan': insight.get('reallocation_plan'),  # Specific reallocation details
                
                # ========== METADATA ==========
                'target_month': target_month,
            }
            
            # ✅ CRITICAL FIX: Convert all floats to Decimal for DynamoDB
            # DynamoDB does not support Python float types
            item = convert_floats_to_decimal(item)
            print(f"[DEBUG] Converted floats to Decimal for DynamoDB compatibility")
            
            table.put_item(Item=item)
            stored_count += 1
            print(f"[SUCCESS] Stored insight: {insight['title']}")
        
        print(f"[SUCCESS] Stored {stored_count} insights in DynamoDB")
        return stored_count
        
    except Exception as e:
        print(f"[ERROR] Failed to store insights: {e}")
        import traceback
        traceback.print_exc()
        raise

# ==================== LAMBDA HANDLER ====================

def lambda_handler(event, context):
    """Main Lambda handler for enhanced monthly review insights"""
    
    try:
        print(f"[INFO] Enhanced Monthly Review Insights Lambda started")
        print(f"[DEBUG] Event: {json.dumps(event)}")
        
        # Determine target month
        if 'target_year' in event and 'target_month' in event:
            target_year = int(event['target_year'])
            target_month = int(event['target_month'])
            print(f"[INFO] Using provided target month: {target_year}-{target_month:02d}")
        else:
            today = datetime.now()
            last_month = today - relativedelta(months=1)
            target_year = last_month.year
            target_month = last_month.month
            print(f"[INFO] Using last complete month: {target_year}-{target_month:02d}")
        
        # Determine user(s)
        if 'user_id' in event:
            user_ids = [event['user_id']]
            print(f"[INFO] Processing single user: {user_ids[0]}")
        else:
            # TODO: Get all active users
            user_ids = ['user_001']
            print(f"[INFO] Processing {len(user_ids)} users")
        
        results = []
        
        for user_id in user_ids:
            try:
                print(f"\n{'='*60}")
                print(f"[INFO] Processing monthly review for user: {user_id}")
                print(f"[INFO] Target month: {target_year}-{target_month:02d}")
                print(f"{'='*60}")
                
                # 1. Fetch target month transactions
                target_transactions = fetch_transactions_for_month(
                    user_id, 
                    target_year, 
                    target_month
                )
                
                if not target_transactions or len(target_transactions) < 5:
                    print(f"[SKIP] Insufficient data: {len(target_transactions)} transactions")
                    results.append({
                        'user_id': user_id,
                        'status': 'skipped',
                        'reason': 'insufficient_target_month_data'
                    })
                    continue
                
                # 2. Fetch baseline transactions
                baseline_transactions = fetch_baseline_transactions(
                    user_id,
                    target_year,
                    target_month
                )
                
                if not baseline_transactions or len(baseline_transactions) < 50:
                    print(f"[SKIP] Insufficient baseline: {len(baseline_transactions)} transactions")
                    results.append({
                        'user_id': user_id,
                        'status': 'skipped',
                        'reason': 'insufficient_baseline_data'
                    })
                    continue
                
                # 2.5. Fetch user goals
                goals = fetch_user_goals(user_id)

                # 3. Prepare context
                source_context = prepare_monthly_review_context(
                    target_transactions,
                    baseline_transactions,
                    target_year,
                    target_month,
                    goals  # NEW
                )
                
                # 4. Format for LLM
                formatted_context = format_monthly_review_for_llm(source_context)
                
                # Extract goals text for LLM prompt with enhanced context
                goals_section = []
                if source_context.get('goals'):
                    goals_section.append("ACTIVE FINANCIAL GOALS:\n" + "="*50)
                    for goal in source_context['goals']:
                        goals_section.append(f"\n📌 **{goal['name']}**")
                        goals_section.append(f"   Type: {goal['type']}")
                        goals_section.append(f"   Priority: {goal['priority']}")
                        goals_section.append(f"   Intent: {goal['intent']}")
                        
                        if goal['type'] == 'savings_target':
                            current = float(goal['progress'].get('current_amount', 0))
                            target = float(goal['target'].get('target_value', 0))
                            pct = float(goal['progress'].get('percentage_complete', 0))
                            remaining = target - current
                            
                            goals_section.append(f"   Target: ${target:,.2f}")
                            goals_section.append(f"   Current Progress: ${current:,.2f} ({pct:.0f}% complete)")
                            goals_section.append(f"   Remaining: ${remaining:,.2f}")
                            
                            # Calculate required monthly contribution
                            if goal.get('target', {}).get('target_date'):
                                target_date = datetime.fromisoformat(goal['target']['target_date'].replace('Z', '+00:00'))
                                months_remaining = max(1, (target_date.year - datetime.now().year) * 12 + 
                                                      (target_date.month - datetime.now().month))
                                required_monthly = remaining / months_remaining
                                goals_section.append(f"   Required Monthly: ${required_monthly:.2f} to hit target by {target_date.strftime('%B %Y')}")
                                goals_section.append(f"   Timeline: {months_remaining} months remaining")
                                
                        else:  # spending_reduction
                            current = float(goal['progress'].get('current_period_spending', 0))
                            target = float(goal['target'].get('target_value', 0))
                            diff = current - target
                            
                            goals_section.append(f"   Target Spending: ${target:,.2f}/month")
                            goals_section.append(f"   Current Spending: ${current:,.2f}/month")
                            if diff > 0:
                                goals_section.append(f"   Over Target: ${diff:,.2f}/month ⚠️")
                            else:
                                goals_section.append(f"   Under Target: ${abs(diff):,.2f}/month ✓")
                        
                        # Add latest evaluation if exists
                        if goal.get('latest_evaluation'):
                            eval_data = goal['latest_evaluation']
                            goals_section.append(f"   Status: {eval_data['status']}")
                            if eval_data.get('insights'):
                                goals_section.append("   Recent Insights:")
                                for insight in eval_data['insights'][:2]:  # Top 2 insights
                                    goals_section.append(f"     • {insight}")
                            if eval_data.get('recommendations'):
                                goals_section.append("   Recent Recommendations:")
                                for rec in eval_data['recommendations'][:2]:  # Top 2 recommendations
                                    goals_section.append(f"     • {rec}")
                    
                    goals_section.append("\n" + "="*50)
                    goals_text = "\n".join(goals_section)
                else:
                    goals_text = "NO ACTIVE GOALS - Analyze spending patterns and suggest goal creation opportunities based on discretionary spending or saving potential."
                
                # 5. Generate insights via LLM
                llm_response = generate_monthly_review_via_llm(formatted_context, goals_text)
                
                # 6. Parse and validate
                insights = parse_and_validate_insights(llm_response, source_context)
                
                if not insights:
                    print(f"[WARN] No valid insights generated for {user_id}")
                    results.append({
                        'user_id': user_id,
                        'status': 'no_insights',
                        'reason': 'llm_generated_no_valid_insights'
                    })
                    continue
                
                # 7. Store insights
                stored_count = store_insights(
                    user_id, 
                    insights, 
                    f"{target_year}-{target_month:02d}"
                )
                
                results.append({
                    'user_id': user_id,
                    'status': 'success',
                    'target_month': f"{target_year}-{target_month:02d}",
                    'insights_generated': stored_count
                })
                
                print(f"[SUCCESS] Generated {stored_count} enhanced insights for {user_id}")
                
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
        print(f"[INFO] Monthly review processing complete")
        print(f"[INFO] Results: {json.dumps(results, indent=2)}")
        print(f"{'='*60}")
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'processed_users': len(results),
                'target_month': f"{target_year}-{target_month:02d}",
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
                'message': 'Failed to generate enhanced monthly review insights'
            })
        }