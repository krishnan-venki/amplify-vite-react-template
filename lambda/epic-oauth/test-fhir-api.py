import boto3
import requests
import json

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
print("ACCESS TOKEN INFO")
print("=" * 80)
print(f"Scopes granted: {scopes}")
print(f"Token length: {len(access_token)}")
print()

# Test each resource type
base_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
client_id = "5791a93f-7f54-41b9-828a-0f3581d4f6cb"  # Your Epic Client ID (NEW APP)

# Add Epic-Client-ID header (common requirement for Epic sandbox to prevent 403s)
headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': client_id
}

resources = [
    'Observation',
    'Condition', 
    'MedicationRequest',
    'AllergyIntolerance',
    'Immunization',
    'Appointment'
]

print("=" * 80)
print("TESTING FHIR API CALLS")
print("=" * 80)

for resource_type in resources:
    # Match the exact scope format Epic granted
    if resource_type == 'Observation':
        # Epic granted: patient/Observation.r?category=http://terminology.hl7.org/CodeSystem/observation-category|survey
        urls_to_try = [
            (f"{base_url}/{resource_type}?patient={patient_id}&category=http://terminology.hl7.org/CodeSystem/observation-category|survey&_count=5", "Survey category (matches granted scope)"),
            (f"{base_url}/{resource_type}?patient={patient_id}&category=survey&_count=5", "Survey category (short)"),
        ]
    else:
        urls_to_try = [
            (f"{base_url}/{resource_type}?patient={patient_id}&_count=5", "Standard patient search"),
        ]
    
    print(f"\n🔍 Testing {resource_type}...")
    
    for url, description in urls_to_try:
        print(f"   Trying: {description}")
        print(f"   URL: {url}")
        
        try:
            r = requests.get(url, headers=headers, timeout=10)
            print(f"   Status: {r.status_code}")
            
            if r.status_code == 200:
                data = r.json()
                count = len(data.get('entry', []))
                print(f"   ✅ SUCCESS - Found {count} resources")
                break  # Stop trying other patterns if this one works
            else:
                print(f"   ❌ FAILED - {r.text[:100]}")
                
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
    
    print()

print("\n" + "=" * 80)
