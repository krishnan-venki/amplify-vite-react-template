@echo off
REM Create DynamoDB Tables for FHIR Resources
REM Run this script to create all 6 tables at once

set REGION=us-west-2

echo Creating DynamoDB tables for FHIR resources...
echo.

REM Table 1: health_observations
aws dynamodb create-table ^
  --table-name health_observations ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_observations table[0m
echo.

REM Table 2: health_conditions
aws dynamodb create-table ^
  --table-name health_conditions ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_conditions table[0m
echo.

REM Table 3: health_medications
aws dynamodb create-table ^
  --table-name health_medications ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_medications table[0m
echo.

REM Table 4: health_allergies
aws dynamodb create-table ^
  --table-name health_allergies ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_allergies table[0m
echo.

REM Table 5: health_immunizations
aws dynamodb create-table ^
  --table-name health_immunizations ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_immunizations table[0m
echo.

REM Table 6: health_appointments
aws dynamodb create-table ^
  --table-name health_appointments ^
  --attribute-definitions AttributeName=userId,AttributeType=S AttributeName=resourceId,AttributeType=S ^
  --key-schema AttributeName=userId,KeyType=HASH AttributeName=resourceId,KeyType=RANGE ^
  --billing-mode PAY_PER_REQUEST ^
  --region %REGION%

echo [32m✓ Created health_appointments table[0m
echo.

echo [32m✓ All 6 DynamoDB tables created successfully![0m
echo.
echo Verify tables:
echo aws dynamodb list-tables --region %REGION% | findstr health_
