@echo off
REM Deploy epic-oauth-handler Lambda function
REM This script packages and uploads the updated Lambda code

set FUNCTION_NAME=epic-oauth-handler
set REGION=us-west-2

echo.
echo ========================================
echo Deploying Lambda Function: %FUNCTION_NAME%
echo ========================================
echo.

echo [1/3] Creating deployment package...
echo.

REM Create a temporary deployment package
if exist function.zip del function.zip
powershell -Command "Compress-Archive -Path lambda_function.py -DestinationPath function.zip -Force"

echo [32m✓ Deployment package created: function.zip[0m
echo.

echo [2/3] Uploading to AWS Lambda...
echo.

aws lambda update-function-code ^
  --function-name %FUNCTION_NAME% ^
  --zip-file fileb://function.zip ^
  --region %REGION%

if %ERRORLEVEL% NEQ 0 (
  echo [31m✗ Failed to deploy Lambda function[0m
  exit /b 1
)

echo.
echo [32m✓ Lambda function code updated successfully![0m
echo.

echo [3/3] Waiting for Lambda to be ready...
timeout /t 5 /nobreak >nul

echo.
echo [32m✓ Lambda deployment complete![0m
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo 1. Update Lambda IAM permissions for new tables
echo 2. Test by disconnecting and reconnecting Epic
echo 3. Check CloudWatch logs for resource fetching
echo.

echo Cleanup...
if exist function.zip del function.zip
echo.
echo Done!
