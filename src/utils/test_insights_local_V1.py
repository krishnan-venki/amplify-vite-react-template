"""
Local test script for proactive insights generation
"""

import json
from proactive_insights_lambda_V1 import lambda_handler

# Test event for single user
test_event = {
    'user_id': '8871f320-0051-7075-5db0-cb07b0b60821'  # Your test user
}

# Run locally
result = lambda_handler(test_event, None)

print("\n" + "="*60)
print("RESULT:")
print("="*60)
print(json.dumps(json.loads(result['body']), indent=2))