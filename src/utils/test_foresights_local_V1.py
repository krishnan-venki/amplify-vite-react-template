"""
Local test script for foresights generation
"""

import json
from foresights_lambda_V1 import lambda_handler

# Test event
test_event = {
    'user_id': '8871f320-0051-7075-5db0-cb07b0b60821'  # Your user ID
}

print("\n" + "="*60)
print("TESTING FINANCIAL FORESIGHTS")
print("="*60)
print(f"User: {test_event['user_id']}")
print("Analysis: Last 24 months of income + expenses")
print("Generating: 3-6 month forecasts")
print("="*60)

# Run locally
result = lambda_handler(test_event, None)

print("\n" + "="*60)
print("RESULT:")
print("="*60)
print(json.dumps(json.loads(result['body']), indent=2))