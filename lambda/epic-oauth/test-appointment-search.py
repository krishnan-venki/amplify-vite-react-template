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
print("APPOINTMENT SEARCH TESTING")
print("=" * 80)
print(f"Patient ID: {patient_id}")
print(f"Has Appointment scope: {'patient/Appointment.read' in scopes or 'patient/Appointment.r' in scopes}")
print()

base_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
client_id = "5791a93f-7f54-41b9-828a-0f3581d4f6cb"

headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': client_id
}

# Calculate date ranges
today = datetime.utcnow()
one_year_ago = (today - timedelta(days=365)).strftime('%Y-%m-%d')
one_year_future = (today + timedelta(days=365)).strftime('%Y-%m-%d')
one_month_ago = (today - timedelta(days=30)).strftime('%Y-%m-%d')
one_month_future = (today + timedelta(days=30)).strftime('%Y-%m-%d')

# Try different Appointment search patterns
test_urls = [
    {
        'name': 'Simple patient search',
        'url': f"{base_url}/Appointment?patient={patient_id}"
    },
    {
        'name': 'Patient + count limit',
        'url': f"{base_url}/Appointment?patient={patient_id}&_count=10"
    },
    {
        'name': 'Patient compartment search',
        'url': f"{base_url}/Patient/{patient_id}/Appointment"
    },
    {
        'name': 'Patient compartment + count',
        'url': f"{base_url}/Patient/{patient_id}/Appointment?_count=10"
    },
    {
        'name': 'With date range (1 year)',
        'url': f"{base_url}/Appointment?patient={patient_id}&date=ge{one_year_ago}&date=le{one_year_future}"
    },
    {
        'name': 'With date range (1 month)',
        'url': f"{base_url}/Appointment?patient={patient_id}&date=ge{one_month_ago}&date=le{one_month_future}"
    },
    {
        'name': 'With single date parameter (ge)',
        'url': f"{base_url}/Appointment?patient={patient_id}&date=ge{one_year_ago}"
    },
    {
        'name': 'With status parameter',
        'url': f"{base_url}/Appointment?patient={patient_id}&status=booked,pending,proposed"
    },
    {
        'name': 'Date + Status',
        'url': f"{base_url}/Appointment?patient={patient_id}&date=ge{one_year_ago}&status=booked"
    },
    {
        'name': 'Using actor instead of patient',
        'url': f"{base_url}/Appointment?actor={patient_id}"
    },
    {
        'name': 'Actor + date',
        'url': f"{base_url}/Appointment?actor={patient_id}&date=ge{one_year_ago}"
    }
]

print("Testing various Appointment search patterns...\n")

for test in test_urls:
    print(f"{'=' * 80}")
    print(f"Test: {test['name']}")
    print(f"URL: {test['url']}")
    print(f"{'=' * 80}")
    
    try:
        r = requests.get(test['url'], headers=headers, timeout=10)
        print(f"Status: {r.status_code}")
        
        if r.status_code == 200:
            try:
                data = r.json()
                if data.get('resourceType') == 'Bundle':
                    count = len(data.get('entry', []))
                    print(f"✅ SUCCESS! Found {count} appointments")
                    
                    if count > 0:
                        first = data['entry'][0]['resource']
                        print(f"   First appointment ID: {first.get('id')}")
                        print(f"   Status: {first.get('status')}")
                        print(f"   Start: {first.get('start', 'N/A')}")
                    
                    # If successful, show the full first entry
                    if count > 0:
                        print(f"\n   First appointment details:")
                        print(f"   {json.dumps(data['entry'][0]['resource'], indent=2)[:500]}...")
                    
                    break  # Found working pattern!
                else:
                    print(f"✅ Response type: {data.get('resourceType')}")
            except:
                print(f"✅ 200 OK but couldn't parse JSON")
                print(f"   Response: {r.text[:200]}")
                
        elif r.status_code == 403:
            print(f"❌ 403 FORBIDDEN")
            try:
                error = r.json()
                if 'issue' in error:
                    for issue in error.get('issue', []):
                        print(f"   {issue.get('diagnostics', '')}")
            except:
                print(f"   Response: {r.text[:200]}")
                
        elif r.status_code == 400:
            print(f"❌ 400 BAD REQUEST - Invalid search parameters")
            try:
                error = r.json()
                if 'issue' in error:
                    for issue in error.get('issue', []):
                        print(f"   {issue.get('diagnostics', '')}")
            except:
                print(f"   Response: {r.text[:300]}")
        else:
            print(f"❌ Status {r.status_code}")
            print(f"   Response: {r.text[:200]}")
            
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    print()

print("\n" + "=" * 80)
print("CONCLUSION")
print("=" * 80)
print("""
Look for the pattern that returned 200 OK above.

Common Epic requirements for Appointment search:
1. Required parameter: patient or actor
2. Optional but recommended: date range
3. Optional: status filter
4. Some systems require at least one time-based parameter

If ALL patterns return 403:
  → API permissions haven't synced yet (30-minute delay)
  → Or Appointment.Read (Appointments) API not enabled in Epic app

If some return 400 Bad Request:
  → Those search parameters aren't supported by Epic
  → Tells us what NOT to use
""")
