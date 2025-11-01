# How to Deploy Python Lambda with Dependencies

## Problem
CloudWatch Error: `No module named 'requests'`

This means the Lambda doesn't have the required Python packages installed.

---

## Solution: Deploy Lambda with Dependencies

### **Option 1: Deploy via AWS Console (Easiest)**

#### **Step 1: Install Dependencies Locally**

Open terminal in the `lambda/epic-oauth` folder:

```bash
cd lambda\epic-oauth

# Install dependencies to a folder
pip install -r requirements.txt -t .

# OR if you have multiple Python versions:
python -m pip install -r requirements.txt -t .
```

This will create folders like `requests/`, `boto3/`, `certifi/`, etc. in the `lambda/epic-oauth` directory.

#### **Step 2: Create Deployment Package**

```bash
# Create a ZIP file with everything
# On Windows PowerShell:
Compress-Archive -Path * -DestinationPath epic-oauth-deployment.zip -Force

# OR on Windows Command Prompt:
# Install 7-Zip first, then:
7z a -r epic-oauth-deployment.zip *
```

#### **Step 3: Upload to Lambda**

1. Go to AWS Lambda Console
2. Find your function: `epic-oauth-handler`
3. Click **"Upload from"** → **".zip file"**
4. Upload `epic-oauth-deployment.zip`
5. Click **"Save"**

---

### **Option 2: Use Lambda Layer (Cleaner)**

#### **Step 1: Create a Layer with Dependencies**

```bash
cd lambda\epic-oauth

# Create layer structure
mkdir python
pip install -r requirements.txt -t python/

# Zip just the dependencies
cd ..
Compress-Archive -Path epic-oauth\python -DestinationPath requests-layer.zip
```

#### **Step 2: Create Lambda Layer**

1. Go to AWS Lambda Console → **Layers**
2. Click **"Create layer"**
3. Name: `python-requests-layer`
4. Upload `requests-layer.zip`
5. Compatible runtimes: Python 3.11 (or your version)
6. Click **"Create"**

#### **Step 3: Attach Layer to Lambda**

1. Go to your Lambda function: `epic-oauth-handler`
2. Scroll down to **"Layers"**
3. Click **"Add a layer"**
4. Select **"Custom layers"**
5. Choose `python-requests-layer`
6. Click **"Add"**

---

### **Option 3: Deploy via AWS CLI (Advanced)**

```bash
cd lambda\epic-oauth

# Install dependencies
pip install -r requirements.txt -t .

# Create deployment package
zip -r epic-oauth-deployment.zip .

# Deploy to Lambda
aws lambda update-function-code ^
  --function-name epic-oauth-handler ^
  --zip-file fileb://epic-oauth-deployment.zip ^
  --region us-west-2
```

---

## **After Deployment:**

1. **Test the Lambda** directly in AWS Console:
   - Go to Lambda function
   - Click **"Test"** tab
   - Create a test event (doesn't matter what it is for now)
   - Click **"Test"**
   - Should see output without import errors

2. **Try the OAuth flow again:**
   - Go back to your app
   - Click "Connect Epic MyChart"
   - Complete the Epic login
   - Should now successfully exchange the code for a token!

---

## **Files You Need:**

```
lambda/epic-oauth/
├── lambda_function.py   (✅ Already exists)
├── requirements.txt      (✅ Already exists)
└── [After pip install]
    ├── requests/        (← Need this)
    ├── urllib3/
    ├── certifi/
    ├── charset_normalizer/
    ├── idna/
    └── ...
```

---

## **Quick Summary:**

1. `cd lambda\epic-oauth`
2. `pip install -r requirements.txt -t .`
3. `Compress-Archive -Path * -DestinationPath epic-oauth-deployment.zip -Force`
4. Upload ZIP to Lambda in AWS Console
5. Test OAuth flow again!

---

**Try Option 1 (easiest) and let me know if it works!** 🚀
