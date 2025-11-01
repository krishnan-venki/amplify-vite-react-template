"""
Test script to verify Epic access token works
Run this locally to test if the access token can fetch patient data
"""

import requests

# INSTRUCTIONS:
# 1. Get the access token from DynamoDB (epic_tokens table)
#    - Find your user ID: 8871f320-0051-7075-5db0-cb07b0b60821
#    - Copy the accessToken value
# 2. Replace ACCESS_TOKEN below with the actual token
# 3. Run: python test_epic_token.py

ACCESS_TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE"
PATIENT_ID = "eq081-VQEgP8drUUqCWzHfw3"
CLIENT_ID = "8da73e32-fe02-45da-a666-5bc96bdf2de2"
FHIR_BASE_URL = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"

def test_patient_fetch():
    url = f"{FHIR_BASE_URL}/Patient/{PATIENT_ID}"
    
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}',
        'Accept': 'application/fhir+json',
        'Epic-Client-ID': CLIENT_ID
    }
    
    print(f"Testing Epic FHIR API...")
    print(f"URL: {url}")
    print(f"Client ID: {CLIENT_ID}")
    print(f"Token length: {len(ACCESS_TOKEN)}")
    print(f"Token starts: {ACCESS_TOKEN[:50]}...")
    print()
    
    response = requests.get(url, headers=headers, timeout=30)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    print()
    
    if response.status_code == 200:
        print("✅ SUCCESS! Patient data:")
        print(response.json())
    else:
        print(f"❌ FAILED: {response.text}")
        if 'WWW-Authenticate' in response.headers:
            print(f"Auth Error: {response.headers['WWW-Authenticate']}")

if __name__ == "__main__":
    if ACCESS_TOKEN == "PASTE_YOUR_ACCESS_TOKEN_HERE":
        print("ERROR: Please paste your access token in the script first!")
        print("Get it from DynamoDB epic_tokens table")
    else:
        test_patient_fetch()
