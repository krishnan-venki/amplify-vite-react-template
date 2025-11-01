import boto3
import requests
import json
from datetime import datetime, timedelta

# Get the access token from DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('epic_tokens')

user_id = '8871f320-0051-7075-5db0-cb07b0b60821'
patient_id = 'eq081-VQEgP8drUUqCWzHfw3'

response = table.get_item(Key={'userId': user_id})
item = response.get('Item', {})
access_token = item.get('accessToken', '')
scopes = item.get('scope', '')

print("=" * 80)
print("TESTING WITH CORRECT URL PATTERNS PER EPIC DOCUMENTATION")
print("=" * 80)
print(f"\nScopes: {scopes}\n")

# Test configuration
base_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
client_id = "5791a93f-7f54-41b9-828a-0f3581d4f6cb"

headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': client_id
}

# Calculate date range for Appointments (1 year back to 1 year forward)
from_date = (datetime.utcnow() - timedelta(days=365)).strftime('%Y-%m-%d')
to_date = (datetime.utcnow() + timedelta(days=365)).strftime('%Y-%m-%d')

# Test each resource with CORRECT URL patterns
tests = [
    {
        'name': 'Patient (baseline)',
        'url': f"{base_url}/Patient/{patient_id}",
        'description': 'Should work - proves token is valid'
    },
    {
        'name': 'Observation (laboratory)',
        'url': f"{base_url}/Observation?patient={patient_id}&category=laboratory&_count=10",
        'description': 'Labs using category=laboratory (simple format)'
    },
    {
        'name': 'Observation (vital-signs)',
        'url': f"{base_url}/Observation?patient={patient_id}&category=vital-signs&_count=10",
        'description': 'Vitals using category=vital-signs (simple format)'
    },
    {
        'name': 'Condition',
        'url': f"{base_url}/Condition?patient={patient_id}&_count=10",
        'description': 'Problems/diagnoses'
    },
    {
        'name': 'MedicationRequest',
        'url': f"{base_url}/MedicationRequest?patient={patient_id}&_count=10",
        'description': 'Medication orders'
    },
    {
        'name': 'AllergyIntolerance',
        'url': f"{base_url}/AllergyIntolerance?patient={patient_id}&_count=10",
        'description': 'Allergies'
    },
    {
        'name': 'Immunization',
        'url': f"{base_url}/Immunization?patient={patient_id}&_count=10",
        'description': 'Vaccines'
    },
    {
        'name': 'Appointment (with date range)',
        'url': f"{base_url}/Appointment?patient={patient_id}&date=ge{from_date}&date=le{to_date}&_count=10",
        'description': f'Appointments from {from_date} to {to_date}'
    }
]

results = []

for test in tests:
    print(f"\n{'=' * 80}")
    print(f"🔍 {test['name']}")
    print(f"   {test['description']}")
    print(f"   URL: {test['url']}")
    print(f"{'=' * 80}")
    
    try:
        r = requests.get(test['url'], headers=headers, timeout=10)
        
        status_emoji = '✅' if r.status_code == 200 else '❌'
        print(f"\n{status_emoji} Status: {r.status_code}")
        
        if r.status_code == 200:
            try:
                data = r.json()
                resource_type = data.get('resourceType', 'Unknown')
                
                if resource_type == 'Bundle':
                    count = len(data.get('entry', []))
                    print(f"   Found {count} resources")
                    results.append({'test': test['name'], 'status': 'SUCCESS', 'count': count})
                    
                    if count > 0:
                        first = data['entry'][0]['resource']
                        print(f"   First resource ID: {first.get('id', 'N/A')}")
                        print(f"   First resource type: {first.get('resourceType', 'N/A')}")
                elif resource_type == 'Patient':
                    print(f"   Patient: {data.get('name', [{}])[0].get('text', 'N/A')}")
                    results.append({'test': test['name'], 'status': 'SUCCESS', 'count': 1})
                else:
                    print(f"   Resource type: {resource_type}")
                    results.append({'test': test['name'], 'status': 'SUCCESS', 'count': 1})
                    
            except Exception as e:
                print(f"   ✅ SUCCESS but couldn't parse: {e}")
                results.append({'test': test['name'], 'status': 'SUCCESS', 'count': '?'})
                
        elif r.status_code == 403:
            print(f"   ❌ 403 FORBIDDEN - insufficient_scope")
            results.append({'test': test['name'], 'status': 'FORBIDDEN', 'count': 0})
            
            # Try to parse error
            try:
                error = r.json()
                if 'issue' in error:
                    for issue in error.get('issue', []):
                        print(f"      {issue.get('severity', '')}: {issue.get('diagnostics', '')}")
            except:
                pass
                
        else:
            print(f"   ❌ Error {r.status_code}")
            results.append({'test': test['name'], 'status': f'ERROR_{r.status_code}', 'count': 0})
            try:
                print(f"   Response: {r.text[:300]}")
            except:
                pass
                
    except Exception as e:
        print(f"   ❌ EXCEPTION: {str(e)}")
        results.append({'test': test['name'], 'status': 'EXCEPTION', 'count': 0})

# Summary
print(f"\n\n{'=' * 80}")
print("SUMMARY")
print("=" * 80)

for result in results:
    status_emoji = '✅' if result['status'] == 'SUCCESS' else '❌'
    print(f"{status_emoji} {result['test']}: {result['status']} (count: {result['count']})")

print(f"\n{'=' * 80}")
print("INTERPRETATION")
print("=" * 80)
print("""
If Patient works but others return 403:
  → Epic's API permissions haven't synced yet (wait 30 minutes from config change)

If some resources work but others don't:
  → Those specific APIs might need different URL parameters
  → Check Epic documentation for required search parameters

If Appointment fails even with date parameters:
  → Appointment might need status parameter too: &status=booked,pending,proposed
  → Or Epic might require specific appointment permissions
""")
