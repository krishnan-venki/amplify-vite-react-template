#!/bin/bash
# Create DynamoDB Tables for FHIR Resources
# Run this script to create all 6 tables at once

REGION="us-west-2"

echo "Creating DynamoDB tables for FHIR resources..."

# Table 1: health_observations
aws dynamodb create-table \
  --table-name health_observations \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_observations table"

# Table 2: health_conditions
aws dynamodb create-table \
  --table-name health_conditions \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_conditions table"

# Table 3: health_medications
aws dynamodb create-table \
  --table-name health_medications \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_medications table"

# Table 4: health_allergies
aws dynamodb create-table \
  --table-name health_allergies \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_allergies table"

# Table 5: health_immunizations
aws dynamodb create-table \
  --table-name health_immunizations \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_immunizations table"

# Table 6: health_appointments
aws dynamodb create-table \
  --table-name health_appointments \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=resourceId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=resourceId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION

echo "✅ Created health_appointments table"

echo ""
echo "🎉 All 6 DynamoDB tables created successfully!"
echo ""
echo "Verify tables:"
echo "aws dynamodb list-tables --region $REGION | grep health_"
