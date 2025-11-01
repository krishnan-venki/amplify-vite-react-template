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
print("SCOPES ANALYSIS")
print("=" * 80)
print(f"Full scopes: {scopes}")
print("\nScopes breakdown:")
for scope in scopes.split():
    print(f"  - {scope}")
print()

# Test configuration
base_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
client_id = "5791a93f-7f54-41b9-828a-0f3581d4f6cb"  # NEW Epic Client ID

headers = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': client_id
}

print("=" * 80)
print("DETAILED RESOURCE TESTING")
print("=" * 80)

# Test each resource with multiple approaches
resources_to_test = {
    'Observation': [
        '?patient={}&category=http://terminology.hl7.org/CodeSystem/observation-category|survey&_count=5',
        '?patient={}&category=laboratory&_count=5',
        '?patient={}&category=vital-signs&_count=5',
        '?patient={}&_count=5',
        '/{}/Observation?_count=5'  # Patient-specific search
    ],
    'Condition': [
        '?patient={}&_count=5',
        '?subject={}&_count=5',
        '/{}/Condition?_count=5'
    ],
    'MedicationRequest': [
        '?patient={}&_count=5',
        '?subject={}&_count=5',
        '/{}/MedicationRequest?_count=5'
    ],
    'AllergyIntolerance': [
        '?patient={}&_count=5',
        '/{}/AllergyIntolerance?_count=5'
    ],
    'Immunization': [
        '?patient={}&_count=5',
        '/{}/Immunization?_count=5'
    ],
    'Appointment': [
        '?patient={}&_count=5',
        '?actor={}&_count=5',
        '/{}/Appointment?_count=5'
    ]
}

for resource_type, url_patterns in resources_to_test.items():
    print(f"\n{'=' * 80}")
    print(f"🔍 TESTING: {resource_type}")
    print(f"{'=' * 80}")
    
    for pattern in url_patterns:
        # Build URL based on pattern
        if '{}/' in pattern:
            # Patient-specific format: /Patient/{id}/ResourceType
            url = f"{base_url}/Patient{pattern.format(patient_id)}"
            description = f"Patient-specific: /Patient/{patient_id}/{resource_type}"
        else:
            # Standard search format
            url = f"{base_url}/{resource_type}{pattern.format(patient_id)}"
            description = f"Standard search: {pattern.format(patient_id)}"
        
        print(f"\n   Pattern: {description}")
        
        try:
            r = requests.get(url, headers=headers, timeout=10)
            print(f"   Status: {r.status_code}")
            
            if r.status_code == 200:
                try:
                    data = r.json()
                    if 'entry' in data:
                        count = len(data.get('entry', []))
                        print(f"   ✅ SUCCESS - Found {count} resources")
                        if count > 0:
                            print(f"   First entry ID: {data['entry'][0]['resource'].get('id', 'N/A')}")
                    else:
                        print(f"   ✅ SUCCESS - Response type: {data.get('resourceType', 'Unknown')}")
                except:
                    print(f"   ✅ SUCCESS - But couldn't parse JSON")
                break  # Stop trying other patterns if this works
            elif r.status_code == 403:
                print(f"   ❌ 403 FORBIDDEN")
                # Try to get error details
                try:
                    error = r.json()
                    if 'issue' in error:
                        for issue in error.get('issue', []):
                            print(f"      Issue: {issue.get('severity', '')} - {issue.get('diagnostics', '')}")
                except:
                    pass
            else:
                print(f"   ❌ Status {r.status_code}")
                try:
                    print(f"   Response: {r.text[:200]}")
                except:
                    pass
                
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")

print("\n" + "=" * 80)
print("CONCLUSION")
print("=" * 80)
print("""
If ALL resources return 403 regardless of URL pattern, this indicates:

1. Your Epic app configuration is missing the API selections for these resources
2. Even though the OAuth scopes are granted in the token, Epic's API gateway
   is blocking access because the app isn't configured to use these APIs

SOLUTION:
Go to Epic Developer Portal → Your App → Incoming APIs section
You need to SELECT/ENABLE these APIs (not just request scopes):
- Observation.Read (Labs) (R4)
- Observation.Read (Vitals) (R4)  
- Observation.Read (Social History) (R4)
- Condition.Read (R4)
- MedicationRequest.Read (R4)
- AllergyIntolerance.Read (R4)
- Immunization.Read (R4)
- Appointment.Read (R4)

The scopes are GRANTED but the app APIs are NOT ENABLED.
""")
