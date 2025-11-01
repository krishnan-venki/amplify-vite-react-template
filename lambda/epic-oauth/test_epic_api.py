"""
Quick test to check if Epic FHIR API access token works
"""
import requests

# Your access token from DynamoDB
ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOjEuMi44NDAuMTE0MzUwLjEuMTMuMC4xLjcuMy42ODg4ODQuMTAwIiwiY2xpZW50X2lkIjoiOGRhNzNlMzItZmUwMi00NWRhLWE2NjYtNWJjOTZiZGYyZGUyIiwiZXBpYy5lY2kiOiJ1cm46ZXBpYzpPcGVuLkVwaWMtY3VycmVudCIsImVwaWMubWV0YWRhdGEiOiIxNHFGSEVHcktjcFVHakluVGlpU19fTGZsVTdFd2pLTUViU3dON1d5QVBPdE9uTmxNdERJeURlQk1KS054NElqaFpqZmhIWTAwNXBYM0E3UGYyMFROYkw3MVdMZW1Yck0xYnhNWGx5ZzJuN0ZFR2o5d1R6Q1ZGdVRnX2FIbjc3MSIsImVwaWMudG9rZW50eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxOTM1Mjg4LCJpYXQiOjE3NjE5MzE2ODgsImlzcyI6InVybjpvaWQ6MS4yLjg0MC4xMTQzNTAuMS4xMy4wLjEuNy4zLjY4ODg4NC4xMDAiLCJqdGkiOiIyNTBmODJjZi1iMjQzLTRlODAtYjRiOS1iOTY1ZmMzNjU1Y2YiLCJuYmYiOjE3NjE5MzE2ODgsInN1YiI6ImU0RXJPTDFTSUpnOWRyVTdpVnM1SXVBMyJ9.TPxNEteUCvJQhROt_AplV6VhGRH1wwU15W-L-X8hdO4fmW0tLsf4u2jT8xAguBHGWDGT-DriO9twz-J7IuWv2iSr_ukOY6UeX_JhGnUAwRIZoXLyK00Qs4Rqx4njKao3UbMeohEuTtWTwXhH9qPMF4DeuNw1VClkVzBB0n5o_mTLbr70x7uGI6HfNlZgU6IzrCob8oJQByQO6PmquwLzgk3A3XEG10zMyZkTLKDUDGwuOSdpbTAOdE-GYC-mYSPF1pYkNR1WZkpBqU2gB9iophRQfOl6IGN6vrijUcUZj-yDBRxJvSVWAuvqcw93tqUHpzETO5trLpnCXffyD2OOYw"

PATIENT_ID = "eq081-VQEgP8drUUqCWzHfw3"
FHIR_BASE_URL = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"

# Test fetching patient resource
url = f"{FHIR_BASE_URL}/Patient/{PATIENT_ID}"

headers = {
    'Authorization': f'Bearer {ACCESS_TOKEN}',
    'Accept': 'application/fhir+json'
}

print(f"Testing Epic FHIR API...")
print(f"URL: {url}")
print(f"Headers: {headers}")
print()

response = requests.get(url, headers=headers)

print(f"Status Code: {response.status_code}")
print(f"Response Headers: {dict(response.headers)}")
print()
print(f"Response Body:")
print(response.text)

if response.status_code == 200:
    print("\n✅ SUCCESS! Token works!")
    patient_data = response.json()
    print(f"Patient Name: {patient_data.get('name', [{}])[0]}")
elif response.status_code == 401:
    print("\n❌ 401 Unauthorized - Token invalid or expired")
else:
    print(f"\n❌ Error: {response.status_code}")
