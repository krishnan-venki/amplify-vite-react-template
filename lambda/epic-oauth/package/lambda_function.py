"""
Epic OAuth Lambda Handler - Python Version
Handles OAuth 2.0 token exchange with Epic FHIR API
"""

import json
import os
import boto3
from datetime import datetime, timedelta
from decimal import Decimal
import requests
from urllib.parse import urlencode

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')

# Environment variables
EPIC_CLIENT_ID = os.environ.get('EPIC_CLIENT_ID')
EPIC_TOKEN_URL = os.environ.get('EPIC_TOKEN_URL')
EPIC_FHIR_BASE_URL = os.environ.get('EPIC_FHIR_BASE_URL')
EPIC_REDIRECT_URI = os.environ.get('EPIC_REDIRECT_URI')
EPIC_TOKENS_TABLE = os.environ.get('EPIC_TOKENS_TABLE', 'epic_tokens')
HEALTH_PATIENTS_TABLE = os.environ.get('HEALTH_PATIENTS_TABLE', 'health_patients')
AWS_REGION = os.environ.get('AWS_REGION', 'us-west-2')


def lambda_handler(event, context):
    """
    Main Lambda handler for Epic OAuth callback
    
    Expected event body:
    {
        "code": "authorization_code_from_epic",
        "codeVerifier": "pkce_code_verifier"
    }
    """
    print(f"Received event: {json.dumps(event)}")
    
    try:
        # Extract userId from Cognito claims
        user_id = event['requestContext']['authorizer']['claims']['sub']
        print(f"Processing Epic OAuth for user: {user_id}")
        
        # Parse request body
        body = json.loads(event['body'])
        authorization_code = body.get('code')
        code_verifier = body.get('codeVerifier')
        
        if not authorization_code or not code_verifier:
            return error_response(400, 'Missing required parameters: code and codeVerifier')
        
        # Step 1: Exchange authorization code for access token
        token_response = exchange_code_for_token(authorization_code, code_verifier)
        
        # Step 2: Store tokens in DynamoDB
        store_tokens(user_id, token_response)
        
        # Step 3: Fetch patient resource from Epic FHIR API
        patient_id = token_response['patient']
        access_token = token_response['access_token']
        patient_data = fetch_patient_resource(patient_id, access_token)
        
        # Step 4: Store patient data in DynamoDB
        store_patient_data(user_id, patient_id, patient_data)
        
        print(f"Successfully processed Epic OAuth for user {user_id}")
        
        return success_response({
            'message': 'Successfully connected to Epic',
            'patientId': patient_id,
            'patientName': extract_patient_name(patient_data)
        })
        
    except requests.exceptions.RequestException as e:
        print(f"HTTP request error: {str(e)}")
        return error_response(500, f'Failed to communicate with Epic: {str(e)}')
    
    except Exception as e:
        print(f"Error processing Epic OAuth: {str(e)}")
        return error_response(500, f'Internal server error: {str(e)}')


def exchange_code_for_token(authorization_code, code_verifier):
    """
    Exchange authorization code for access token using PKCE
    """
    print("Exchanging authorization code for access token")
    
    token_data = {
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': EPIC_REDIRECT_URI,
        'client_id': EPIC_CLIENT_ID,
        'code_verifier': code_verifier
    }
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
    
    response = requests.post(
        EPIC_TOKEN_URL,
        data=token_data,
        headers=headers,
        timeout=30
    )
    
    if response.status_code != 200:
        error_msg = f"Token exchange failed: {response.status_code} - {response.text}"
        print(error_msg)
        raise Exception(error_msg)
    
    token_response = response.json()
    print(f"Successfully exchanged code for token. Patient ID: {token_response.get('patient')}")
    
    return token_response


def store_tokens(user_id, token_response):
    """
    Store OAuth tokens in DynamoDB
    """
    print(f"Storing tokens for user: {user_id}")
    
    table = dynamodb.Table(EPIC_TOKENS_TABLE)
    
    # Calculate token expiration
    expires_in = token_response.get('expires_in', 3600)
    expires_at = datetime.utcnow() + timedelta(seconds=expires_in)
    
    current_time = datetime.utcnow().isoformat()
    
    item = {
        'userId': user_id,
        'accessToken': token_response['access_token'],
        'refreshToken': token_response.get('refresh_token', ''),
        'tokenType': token_response.get('token_type', 'Bearer'),
        'expiresAt': expires_at.isoformat(),
        'scope': token_response.get('scope', ''),
        'epicPatientId': token_response.get('patient', ''),
        'lastSync': current_time,
        'createdAt': current_time,
        'updatedAt': current_time
    }
    
    table.put_item(Item=item)
    print(f"Successfully stored tokens for user: {user_id}")


def fetch_patient_resource(patient_id, access_token):
    """
    Fetch Patient resource from Epic FHIR API
    """
    print(f"Fetching patient resource for patient ID: {patient_id}")
    
    url = f"{EPIC_FHIR_BASE_URL}/Patient/{patient_id}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/fhir+json'
    }
    
    response = requests.get(url, headers=headers, timeout=30)
    
    if response.status_code != 200:
        error_msg = f"Failed to fetch patient resource: {response.status_code} - {response.text}"
        print(error_msg)
        raise Exception(error_msg)
    
    patient_data = response.json()
    print(f"Successfully fetched patient resource for: {patient_id}")
    
    return patient_data


def store_patient_data(user_id, patient_id, patient_data):
    """
    Store patient data in DynamoDB (both FHIR format and normalized)
    """
    print(f"Storing patient data for user: {user_id}")
    
    table = dynamodb.Table(HEALTH_PATIENTS_TABLE)
    
    # Normalize patient data for easier querying
    normalized_data = normalize_patient_data(patient_data)
    
    current_time = datetime.utcnow().isoformat()
    
    item = {
        'userId': user_id,
        'epicPatientId': patient_id,
        'fhirData': convert_floats_to_decimal(patient_data),
        'normalizedData': normalized_data,
        'createdAt': current_time,
        'updatedAt': current_time
    }
    
    table.put_item(Item=item)
    print(f"Successfully stored patient data for user: {user_id}")


def normalize_patient_data(patient_data):
    """
    Extract and normalize key patient information
    """
    normalized = {}
    
    # Extract name
    if patient_data.get('name') and len(patient_data['name']) > 0:
        name = patient_data['name'][0]
        normalized['firstName'] = ' '.join(name.get('given', []))
        normalized['lastName'] = name.get('family', '')
        normalized['fullName'] = f"{normalized.get('firstName', '')} {normalized.get('lastName', '')}".strip()
    
    # Extract birth date
    normalized['birthDate'] = patient_data.get('birthDate', '')
    
    # Extract gender
    normalized['gender'] = patient_data.get('gender', '')
    
    # Extract identifiers (MRN, etc.)
    identifiers = []
    if patient_data.get('identifier'):
        for identifier in patient_data['identifier']:
            identifiers.append({
                'system': identifier.get('system', ''),
                'value': identifier.get('value', ''),
                'type': identifier.get('type', {}).get('text', '')
            })
    normalized['identifiers'] = identifiers
    
    # Extract MRN specifically
    mrn = next(
        (id['value'] for id in identifiers if 'MRN' in id.get('type', '').upper()),
        ''
    )
    normalized['mrn'] = mrn
    
    # Extract contact information
    if patient_data.get('telecom'):
        for contact in patient_data['telecom']:
            system = contact.get('system', '')
            value = contact.get('value', '')
            if system == 'phone':
                normalized['phone'] = value
            elif system == 'email':
                normalized['email'] = value
    
    # Extract address
    if patient_data.get('address') and len(patient_data['address']) > 0:
        address = patient_data['address'][0]
        normalized['address'] = {
            'line': address.get('line', []),
            'city': address.get('city', ''),
            'state': address.get('state', ''),
            'postalCode': address.get('postalCode', ''),
            'country': address.get('country', '')
        }
    
    return normalized


def extract_patient_name(patient_data):
    """
    Extract patient's full name from FHIR resource
    """
    if patient_data.get('name') and len(patient_data['name']) > 0:
        name = patient_data['name'][0]
        given = ' '.join(name.get('given', []))
        family = name.get('family', '')
        return f"{given} {family}".strip()
    return 'Unknown'


def convert_floats_to_decimal(obj):
    """
    Convert float values to Decimal for DynamoDB compatibility
    DynamoDB doesn't support float types, only Decimal
    """
    if isinstance(obj, float):
        return Decimal(str(obj))
    elif isinstance(obj, dict):
        return {k: convert_floats_to_decimal(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_floats_to_decimal(item) for item in obj]
    return obj


def success_response(data):
    """
    Return successful response with CORS headers
    """
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': json.dumps(data)
    }


def error_response(status_code, message):
    """
    Return error response with CORS headers
    """
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': json.dumps({
            'error': message
        })
    }
