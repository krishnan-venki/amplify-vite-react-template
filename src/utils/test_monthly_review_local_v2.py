"""
Local test script for monthly review insights generation
"""

import json
from monthly_review_insights_lambda_V2 import lambda_handler

# Test event - analyze October 2025
test_event = {
    'user_id': '8871f320-0051-7075-5db0-cb07b0b60821',  # Your user ID
    'target_year': 2025,  # Year to analyze
    'target_month': 9    # Month to analyze (October)
}

print("\n" + "="*60)
print("TESTING MONTHLY REVIEW INSIGHTS")
print("="*60)
print(f"User: {test_event['user_id']}")
print(f"Target Month: {test_event['target_year']}-{test_event['target_month']:02d}")
print(f"Baseline: {test_event['target_year']-1}-{test_event['target_month']:02d} to {test_event['target_year']}-{test_event['target_month']-1:02d}")
print("="*60)

# Run locally
result = lambda_handler(test_event, None)

print("\n" + "="*60)
print("RESULT:")
print("="*60)
print(json.dumps(json.loads(result['body']), indent=2))