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
import time  # For adding delay before FHIR API calls

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
        
        # Add small delay to allow Epic's servers to propagate the token
        print("Waiting 2 seconds for token propagation...")
        time.sleep(2)
        
        # TEMPORARY: Skip patient fetch to test token storage first
        # We'll add this back once we verify env vars are correct
        try:
            patient_data = fetch_patient_resource(patient_id, access_token)
            # Step 4: Store patient data in DynamoDB
            store_patient_data(user_id, patient_id, patient_data)
            patient_name = extract_patient_name(patient_data)
            
            # Step 5: Fetch additional FHIR resources
            print("Fetching additional FHIR resources...")
            fetch_and_store_fhir_resources(user_id, patient_id, access_token)
            
        except Exception as e:
            print(f"Warning: Failed to fetch patient data (will skip for now): {str(e)}")
            patient_name = "Unknown (patient fetch failed)"
        
        print(f"Successfully processed Epic OAuth for user {user_id}")
        
        return success_response({
            'message': 'Successfully connected to Epic',
            'patientId': patient_id,
            'patientName': patient_name,
            'tokenStored': True
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
    print(f"Authorization code length: {len(authorization_code)}")
    print(f"Authorization code (first 50): {authorization_code[:50]}...")
    print(f"Code verifier: {code_verifier}")
    print(f"Code verifier length: {len(code_verifier)}")
    print(f"Redirect URI: {EPIC_REDIRECT_URI}")
    print(f"Client ID: {EPIC_CLIENT_ID}")
    
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
    
    print(f"Token endpoint: {EPIC_TOKEN_URL}")
    print(f"Request payload keys: {list(token_data.keys())}")
    
    response = requests.post(
        EPIC_TOKEN_URL,
        data=token_data,
        headers=headers,
        timeout=30
    )
    
    print(f"Epic response status: {response.status_code}")
    print(f"Epic response headers: {dict(response.headers)}")
    print(f"Epic response body: {response.text[:500]}")
    
    if response.status_code != 200:
        error_msg = f"Token exchange failed: {response.status_code} - {response.text}"
        print(error_msg)
        raise Exception(error_msg)
    
    token_response = response.json()
    print(f"Successfully exchanged code for token. Patient ID: {token_response.get('patient')}")
    print(f"Token response keys: {list(token_response.keys())}")
    print(f"Full token response (sensitive data masked):")
    for key, value in token_response.items():
        if 'token' in key.lower():
            print(f"  {key}: {str(value)[:50]}... (length: {len(str(value))})")
        else:
            print(f"  {key}: {value}")
    print(f"Access token (first 50 chars): {token_response.get('access_token', '')[:50]}...")
    print(f"Token type: {token_response.get('token_type')}")
    print(f"Expires in: {token_response.get('expires_in')}")
    print(f"Scope: {token_response.get('scope')}")
    
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
    
    # Try without Epic-Client-ID header first (might not be needed for Non-Production Client ID)
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/fhir+json'
    }
    
    print(f"Making FHIR API request to: {url}")
    print(f"Using client ID: {EPIC_CLIENT_ID}")
    print(f"Access token length: {len(access_token)}")
    print(f"Access token starts with: {access_token[:20]}...")
    print(f"Access token ends with: ...{access_token[-20:]}")
    print(f"Testing WITHOUT Epic-Client-ID header first...")
    
    response = requests.get(url, headers=headers, timeout=30)
    
    if response.status_code != 200:
        error_msg = f"Failed to fetch patient resource: {response.status_code} - {response.text}"
        print(error_msg)
        print(f"Response headers: {dict(response.headers)}")
        raise Exception(error_msg)
    
    patient_data = response.json()
    print(f"Successfully fetched patient resource for: {patient_id}")
    
    return patient_data


def fetch_and_store_fhir_resources(user_id, patient_id, access_token):
    """
    Fetch additional FHIR resources and store them in DynamoDB
    Resources: Observations, Conditions, Medications, Allergies, Immunizations, Appointments
    """
    print(f"Fetching additional FHIR resources for patient: {patient_id}")
    
    # Resource types to fetch with their DynamoDB table names
    resources = {
        'Observation': 'health_observations',
        'Condition': 'health_conditions',
        'MedicationRequest': 'health_medications',
        'AllergyIntolerance': 'health_allergies',
        'Immunization': 'health_immunizations',
        'Appointment': 'health_appointments'
    }
    
    # Add Epic-Client-ID header for sandbox environments (common requirement for 403 prevention)
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/fhir+json',
        'Epic-Client-ID': EPIC_CLIENT_ID
    }
    
    results = {}
    
    for resource_type, table_name in resources.items():
        try:
            print(f"Fetching {resource_type}...")
            
            # Build search URL with appropriate parameters for each resource type
            # Epic has specific requirements for certain resources
            
            if resource_type == 'Observation':
                # Observations need category filters - fetch both lab and vital signs
                # Note: We have both categories in our scopes
                url = f"{EPIC_FHIR_BASE_URL}/{resource_type}?patient={patient_id}&category=laboratory&_count=100"
            elif resource_type == 'Condition':
                # Conditions require category parameter for Epic
                url = f"{EPIC_FHIR_BASE_URL}/{resource_type}?patient={patient_id}&category=http://terminology.hl7.org/CodeSystem/condition-category|problem-list-item&_count=100"
            else:
                # Standard patient search for all other resources (including Appointment)
                # Epic uses standard FHIR search: /{ResourceType}?patient={id}
                url = f"{EPIC_FHIR_BASE_URL}/{resource_type}?patient={patient_id}&_count=100"
            
            print(f"🔗 Fetching URL: {url}")
            response = requests.get(url, headers=headers, timeout=30)
            
            print(f"Response status for {resource_type}: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            print(f"Response body preview: {response.text[:500]}")
            
            if response.status_code == 200:
                bundle = response.json()
                entry_count = len(bundle.get('entry', []))
                print(f"✅ Successfully fetched {entry_count} {resource_type} resources")
                
                # Store in DynamoDB
                if entry_count > 0:
                    store_fhir_bundle(user_id, patient_id, resource_type, bundle, table_name)
                    results[resource_type] = entry_count
                else:
                    print(f"No {resource_type} resources found")
                    results[resource_type] = 0
            else:
                print(f"⚠️ Failed to fetch {resource_type}: {response.status_code} - {response.text[:200]}")
                results[resource_type] = -1  # Indicate error
                
        except Exception as e:
            print(f"❌ Error fetching {resource_type}: {str(e)}")
            results[resource_type] = -1  # Indicate error
    
    print(f"FHIR resource fetch summary: {results}")
    return results


def store_fhir_bundle(user_id, patient_id, resource_type, bundle, table_name):
    """
    Store FHIR bundle entries in DynamoDB
    """
    try:
        print(f"Storing {resource_type} data in {table_name}")
        table = dynamodb.Table(table_name)
        
        current_time = datetime.utcnow().isoformat()
        entries = bundle.get('entry', [])
        
        # Store each resource entry
        for entry in entries:
            resource = entry.get('resource', {})
            resource_id = resource.get('id', '')
            
            if not resource_id:
                continue
            
            item = {
                'userId': user_id,
                'resourceId': f"{patient_id}#{resource_type}#{resource_id}",  # Composite key
                'epicPatientId': patient_id,
                'resourceType': resource_type,
                'fhirData': convert_floats_to_decimal(resource),
                'createdAt': current_time,
                'updatedAt': current_time
            }
            
            # Add normalized data for specific resource types
            if resource_type == 'Observation':
                item['normalizedData'] = normalize_observation(resource)
            elif resource_type == 'Condition':
                item['normalizedData'] = normalize_condition(resource)
            elif resource_type == 'MedicationRequest':
                item['normalizedData'] = normalize_medication(resource)
            elif resource_type == 'AllergyIntolerance':
                item['normalizedData'] = normalize_allergy(resource)
            elif resource_type == 'Immunization':
                item['normalizedData'] = normalize_immunization(resource)
            elif resource_type == 'Appointment':
                item['normalizedData'] = normalize_appointment(resource)
            
            table.put_item(Item=item)
        
        print(f"Successfully stored {len(entries)} {resource_type} entries")
        
    except Exception as e:
        print(f"Error storing {resource_type} data: {str(e)}")
        raise


def normalize_observation(observation):
    """Extract key fields from Observation resource"""
    normalized = {
        'id': observation.get('id', ''),
        'status': observation.get('status', ''),
        'category': observation.get('category', [{}])[0].get('coding', [{}])[0].get('display', ''),
        'code': observation.get('code', {}).get('text', ''),
        'effectiveDateTime': observation.get('effectiveDateTime', ''),
        'issued': observation.get('issued', '')
    }
    
    # Extract value (can be quantity, string, or codeable concept)
    if 'valueQuantity' in observation:
        normalized['value'] = f"{observation['valueQuantity'].get('value', '')} {observation['valueQuantity'].get('unit', '')}"
        normalized['valueNumber'] = observation['valueQuantity'].get('value')
        normalized['unit'] = observation['valueQuantity'].get('unit', '')
    elif 'valueString' in observation:
        normalized['value'] = observation['valueString']
    elif 'valueCodeableConcept' in observation:
        normalized['value'] = observation['valueCodeableConcept'].get('text', '')
    
    return normalized


def normalize_condition(condition):
    """Extract key fields from Condition resource"""
    coding = condition.get('code', {}).get('coding', [{}])[0]
    return {
        'id': condition.get('id', ''),
        'clinicalStatus': condition.get('clinicalStatus', {}).get('coding', [{}])[0].get('code', ''),
        'verificationStatus': condition.get('verificationStatus', {}).get('coding', [{}])[0].get('code', ''),
        'code': coding.get('code', ''),
        'display': coding.get('display', ''),
        'onsetDateTime': condition.get('onsetDateTime', ''),
        'recordedDate': condition.get('recordedDate', '')
    }


def normalize_medication(medication):
    """Extract key fields from MedicationRequest resource"""
    med_coding = medication.get('medicationCodeableConcept', {}).get('coding', [{}])[0]
    return {
        'id': medication.get('id', ''),
        'status': medication.get('status', ''),
        'intent': medication.get('intent', ''),
        'medicationDisplay': med_coding.get('display', ''),
        'medicationCode': med_coding.get('code', ''),
        'authoredOn': medication.get('authoredOn', ''),
        'dosageInstruction': medication.get('dosageInstruction', [{}])[0].get('text', '') if medication.get('dosageInstruction') else ''
    }


def normalize_allergy(allergy):
    """Extract key fields from AllergyIntolerance resource"""
    substance_coding = allergy.get('code', {}).get('coding', [{}])[0]
    return {
        'id': allergy.get('id', ''),
        'clinicalStatus': allergy.get('clinicalStatus', {}).get('coding', [{}])[0].get('code', ''),
        'verificationStatus': allergy.get('verificationStatus', {}).get('coding', [{}])[0].get('code', ''),
        'type': allergy.get('type', ''),
        'category': allergy.get('category', [''])[0] if allergy.get('category') else '',
        'criticality': allergy.get('criticality', ''),
        'substance': substance_coding.get('display', ''),
        'substanceCode': substance_coding.get('code', ''),
        'recordedDate': allergy.get('recordedDate', ''),
        'reaction': allergy.get('reaction', [{}])[0].get('manifestation', [{}])[0].get('text', '') if allergy.get('reaction') else ''
    }


def normalize_immunization(immunization):
    """Extract key fields from Immunization resource"""
    vaccine_coding = immunization.get('vaccineCode', {}).get('coding', [{}])[0]
    return {
        'id': immunization.get('id', ''),
        'status': immunization.get('status', ''),
        'vaccineCode': vaccine_coding.get('code', ''),
        'vaccineDisplay': vaccine_coding.get('display', ''),
        'occurrenceDateTime': immunization.get('occurrenceDateTime', ''),
        'recorded': immunization.get('recorded', ''),
        'lotNumber': immunization.get('lotNumber', ''),
        'expirationDate': immunization.get('expirationDate', '')
    }


def normalize_appointment(appointment):
    """Extract key fields from Appointment resource"""
    service_type = appointment.get('serviceType', [{}])[0] if appointment.get('serviceType') else {}
    return {
        'id': appointment.get('id', ''),
        'status': appointment.get('status', ''),
        'appointmentType': appointment.get('appointmentType', {}).get('text', ''),
        'serviceType': service_type.get('text', ''),
        'description': appointment.get('description', ''),
        'start': appointment.get('start', ''),
        'end': appointment.get('end', ''),
        'created': appointment.get('created', ''),
        'comment': appointment.get('comment', '')
    }


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
