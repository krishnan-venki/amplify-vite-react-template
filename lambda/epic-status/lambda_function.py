"""
Epic Connection Status Lambda Handler
Returns user's Epic connection status and patient data
"""

import json
import os
import boto3
from datetime import datetime
from decimal import Decimal

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')

# Environment variables
EPIC_TOKENS_TABLE = os.environ.get('EPIC_TOKENS_TABLE', 'epic_tokens')
HEALTH_PATIENTS_TABLE = os.environ.get('HEALTH_PATIENTS_TABLE', 'health_patients')


def lambda_handler(event, context):
    """
    Get Epic connection status for the current user
    
    Returns:
    {
        "connected": true/false,
        "patientData": { ... } or null
    }
    """
    print(f"Received event: {json.dumps(event)}")
    
    try:
        # Extract userId from Cognito claims - handle both API Gateway v1 and v2
        user_id = None
        
        # Debug: Print the requestContext structure
        if 'requestContext' in event:
            print(f"requestContext keys: {list(event['requestContext'].keys())}")
            if 'authorizer' in event['requestContext']:
                print(f"authorizer structure: {json.dumps(event['requestContext']['authorizer'])}")
        
        # Try API Gateway v1 format (REST API)
        if 'requestContext' in event and 'authorizer' in event['requestContext']:
            authorizer = event['requestContext']['authorizer']
            if 'claims' in authorizer:
                user_id = authorizer['claims'].get('sub')
                print(f"Found user_id in API Gateway v1 format: {user_id}")
        
        # Try API Gateway v2 format (HTTP API)
        if not user_id and 'requestContext' in event and 'authorizer' in event['requestContext']:
            authorizer = event['requestContext']['authorizer']
            if 'jwt' in authorizer and 'claims' in authorizer['jwt']:
                user_id = authorizer['jwt']['claims'].get('sub')
                print(f"Found user_id in API Gateway v2 format: {user_id}")
        
        if not user_id:
            print(f"Could not extract user ID from event. Full event: {json.dumps(event)}")
            return error_response(401, 'Unauthorized: Could not determine user identity')
        
        print(f"Checking Epic connection status for user: {user_id}")
        
        # Check if user has an active Epic connection
        tokens_table = dynamodb.Table(EPIC_TOKENS_TABLE)
        token_response = tokens_table.get_item(Key={'userId': user_id})
        
        if 'Item' not in token_response:
            print(f"No Epic connection found for user: {user_id}")
            return success_response({
                'connected': False,
                'patientData': None
            })
        
        token_data = token_response['Item']
        
        # Check if token is expired
        expires_at = token_data.get('expiresAt', '')
        if expires_at:
            try:
                exp_time = datetime.fromisoformat(expires_at.replace('Z', '+00:00'))
                if exp_time < datetime.utcnow():
                    print(f"Token expired for user: {user_id}")
                    return success_response({
                        'connected': False,
                        'patientData': None,
                        'error': 'Token expired. Please reconnect.'
                    })
            except Exception as e:
                print(f"Error parsing expiration time: {str(e)}")
        
        # Get patient data
        patients_table = dynamodb.Table(HEALTH_PATIENTS_TABLE)
        patient_response = patients_table.get_item(Key={'userId': user_id})
        
        patient_data = None
        if 'Item' in patient_response:
            patient_data = convert_decimal_to_float(patient_response['Item'])
        
        print(f"Epic connection active for user: {user_id}")
        
        return success_response({
            'connected': True,
            'patientData': patient_data
        })
        
    except Exception as e:
        print(f"Error checking Epic connection status: {str(e)}")
        return error_response(500, f'Internal server error: {str(e)}')


def convert_decimal_to_float(obj):
    """
    Convert Decimal objects to float for JSON serialization
    """
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, dict):
        return {k: convert_decimal_to_float(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_decimal_to_float(item) for item in obj]
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        'body': json.dumps({
            'error': message
        })
    }
