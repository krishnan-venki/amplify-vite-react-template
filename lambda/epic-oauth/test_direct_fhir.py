"""
Direct test of Epic FHIR API with a fresh token
This will help us identify if it's an endpoint issue vs token issue
"""

# Test different Epic FHIR endpoints to see which one works
ENDPOINTS_TO_TEST = [
    "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
    "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2",
    "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/api/FHIR/R4",
]

# Instructions:
# 1. Get token from CloudWatch logs (the "access_token" value from token response)
# 2. Paste it below
# 3. Run: python test_direct_fhir.py

ACCESS_TOKEN = "PASTE_FROM_CLOUDWATCH"
PATIENT_ID = "eq081-VQEgP8drUUqCWzHfw3"
CLIENT_ID = "8da73e32-fe02-45da-a666-5bc96bdf2de2"

import requests

for endpoint in ENDPOINTS_TO_TEST:
    url = f"{endpoint}/Patient/{PATIENT_ID}"
    
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Accept': 'application/fhir+json',
        'Epic-Client-ID': CLIENT_ID
    }
    
    print(f"\n{'='*60}")
    print(f"Testing: {endpoint}")
    print(f"{'='*60}")
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ SUCCESS! This is the correct endpoint!")
            print(f"Patient name: {response.json().get('name', [{}])[0]}")
            break
        else:
            print(f"❌ Failed: {response.text[:200]}")
            if 'WWW-Authenticate' in response.headers:
                print(f"Auth header: {response.headers['WWW-Authenticate']}")
    except Exception as e:
        print(f"❌ Error: {e}")
