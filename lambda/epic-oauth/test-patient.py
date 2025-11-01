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

# Test Patient resource (which we know works)
base_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
client_id = "5791a93f-7f54-41b9-828a-0f3581d4f6cb"  # NEW Epic Client ID

print("Testing WITH Epic-Client-ID header:")
headers_with = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json',
    'Epic-Client-ID': client_id
}

url = f"{base_url}/Patient/{patient_id}"
r = requests.get(url, headers=headers_with, timeout=10)
print(f"   Status: {r.status_code}")
if r.status_code == 200:
    print(f"   ✅ SUCCESS with Epic-Client-ID header")
else:
    print(f"   ❌ FAILED: {r.text[:100]}")

print("\nTesting WITHOUT Epic-Client-ID header:")
headers_without = {
    'Authorization': f'Bearer {access_token}',
    'Accept': 'application/fhir+json'
}

r = requests.get(url, headers=headers_without, timeout=10)
print(f"   Status: {r.status_code}")
if r.status_code == 200:
    print(f"   ✅ SUCCESS without Epic-Client-ID header")
else:
    print(f"   ❌ FAILED: {r.text[:100]}")
