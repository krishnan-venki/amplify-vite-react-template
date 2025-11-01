Sagaa Health Vertical: Epic FHIR Integration

Implementation Guide

**POC Development - 2-3 Week Timeline**

Version 1.0 \| October 30, 2025

Executive Summary

This document provides the complete technical implementation plan for
integrating Epic MyChart health records into Sagaa\'s health vertical.
The integration uses Epic\'s FHIR Sandbox environment with SMART on FHIR
OAuth 2.0 authentication, replicating Apple Health\'s user experience
while enabling Sagaa\'s unique cross-vertical intelligence capabilities.

Key Objectives

-   Implement SMART on FHIR OAuth authentication flow

-   Sync 7 health data categories: Appointments, Medications, Labs,
    Immunizations, Diagnoses, Allergies, Vitals

-   Map Epic test patient data to Sagaa demo users for investor
    presentations

-   Enable full health context visibility for Financial Agent
    cross-vertical intelligence

-   Build foundation for production Epic App Orchard approval

POC Scope & Limitations

**In Scope:**

-   Epic FHIR Sandbox integration with synthetic test data

-   Complete OAuth authentication flow

-   All 7 FHIR resource types ingestion and storage

-   Personal health intelligence features

-   Cross-vertical AI context (health data accessible to finance agent)

**Out of Scope:**

-   Real Epic production environment integration

-   Additional EHR providers (Cerner, Allscripts, etc.)

-   Manual health record entry

-   PDF/document health record uploads

-   Community health insights aggregation system

-   Sagaa health dashboard UI (deferred to post-integration)

Implementation Timeline

  -----------------------------------------------------------------------
  **Week**          **Deliverables**
  ----------------- -----------------------------------------------------
  Week 1            Epic sandbox registration, OAuth flow implementation,
                    token management

  Week 2            FHIR resource integration, data storage schema,
                    context file updates

  Week 3            Cross-vertical integration, demo user mapping,
                    testing and validation
  -----------------------------------------------------------------------

1\. Epic FHIR Sandbox Setup

Epic provides a FHIR Sandbox environment for developers to build and
test integrations using synthetic patient data. This environment mimics
production Epic systems while providing complete test data sets.

1.1 Sandbox Registration Process

1.  Navigate to Epic FHIR Sandbox: https://fhir.epic.com

2.  Click \'Build Apps\' and create developer account

3.  Complete registration form with Sagaa company details

4.  Create a new application:

> Application Name: Sagaa Health Assistant
>
> Application Type: Patient-facing app
>
> FHIR Version: R4 (current standard)

5.  Configure OAuth 2.0 redirect URIs:

> Development: http://localhost:3000/auth/epic/callback
>
> Staging: https://staging.sagaa.ai/auth/epic/callback
>
> Production placeholder: https://app.sagaa.ai/auth/epic/callback

6.  Request FHIR scopes (patient access permissions):

> patient/Patient.read - Patient demographics
>
> patient/Appointment.read - Appointments and visits
>
> patient/MedicationRequest.read - Prescriptions
>
> patient/Observation.read - Labs and vitals
>
> patient/Immunization.read - Vaccinations
>
> patient/Condition.read - Diagnoses
>
> patient/AllergyIntolerance.read - Allergies

7.  Receive credentials:

> Client ID: (provided by Epic)
>
> Client Secret: (only if using confidential client)
>
> Note: Public clients (like mobile/web apps) use PKCE instead

1.2 Sandbox Environment Details

  ----------------------------------------------------------------------------------------
  **Endpoint**            **URL**
  ----------------------- ----------------------------------------------------------------
  FHIR Base URL           https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4

  Authorization Endpoint  https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize

  Token Endpoint          https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token

  Test Patient Portal     https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize
  ----------------------------------------------------------------------------------------

1.3 Available Test Patients

Epic sandbox provides several pre-configured test patients with complete
synthetic medical histories:

  --------------------------------------------------------------------------------------------
  **Patient Name**  **FHIR ID**                                     **Clinical Scenario**
  ----------------- ----------------------------------------------- --------------------------
  Derrick Lin       Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB   General adult with chronic
                                                                    conditions

  Camila Lopez      eg1pBN6QejTLPCH4bv1sH.g3                        Pregnant patient

  Jason Argonaut    eM2qS1oDk1pF1VIz3JGhm0g3                        Diabetes patient with labs
  --------------------------------------------------------------------------------------------

**Note for Demo:** These test patient identities will be mapped to Sagaa
demo users in the UI layer, so investors see \'Sarah Johnson\' while the
backend connects to \'Derrick Lin\' test data.

2\. SMART on FHIR OAuth Implementation

SMART on FHIR is a standard OAuth 2.0 profile specifically designed for
healthcare applications. It enables patients to authorize third-party
apps to access their health records while maintaining security and
privacy.

2.1 OAuth Flow Overview

The SMART on FHIR authentication follows the standard OAuth 2.0
authorization code flow with PKCE (Proof Key for Code Exchange) for
enhanced security:

1.  User clicks \'Connect Epic MyChart\' in Sagaa

2.  Sagaa generates PKCE code verifier and challenge

3.  Sagaa redirects user to Epic authorization endpoint with parameters

4.  User authenticates with Epic MyChart credentials (test login)

5.  User reviews and approves data sharing permissions

6.  Epic redirects back to Sagaa with authorization code

7.  Sagaa exchanges authorization code + code verifier for access token

8.  Sagaa uses access token to fetch FHIR resources

9.  Sagaa stores refresh token for ongoing access

2.2 AWS Amplify Gen 2 Implementation Architecture

The OAuth flow integrates with Sagaa\'s existing AWS Amplify Gen 2
infrastructure:

**Frontend Components:**

-   React component with \'Connect Epic\' button

-   OAuth callback handler page

-   PKCE code generation utilities

**Backend Components:**

-   Lambda function: handleEpicCallback - Exchange auth code for tokens

-   Lambda function: fetchFHIRResources - Retrieve health records

-   Lambda function: refreshEpicToken - Refresh expired access tokens

-   DynamoDB table: epic_tokens - Store OAuth tokens per user

-   DynamoDB tables: health\_\* - Store FHIR resource data

-   S3 bucket updates: Add health context to user context files

2.3 Implementation Code Structure

**Directory Structure:**

> amplify/
>
> functions/
>
> epic-oauth/
>
> handler.ts - OAuth callback and token exchange
>
> pkce.ts - PKCE helper functions
>
> fhir-sync/
>
> handler.ts - Fetch and store FHIR resources
>
> resources.ts - FHIR resource type definitions
>
> token-refresh/
>
> handler.ts - Token refresh logic
>
> data/
>
> resource.ts - DynamoDB table definitions

**Frontend Structure:**

> src/
>
> components/
>
> health/
>
> ConnectEpicButton.tsx
>
> EpicOAuthCallback.tsx
>
> utils/
>
> pkce-helpers.ts

2.4 Key Configuration Parameters

  -----------------------------------------------------------------------------------
  **Parameter**           **Value/Description**
  ----------------------- -----------------------------------------------------------
  response_type           code (authorization code flow)

  client_id               Provided by Epic during sandbox registration

  redirect_uri            Must match registered callback URL exactly

  scope                   patient/\*.read openid fhirUser

  state                   Random string for CSRF protection (minimum 32 characters)

  code_challenge          Base64 URL-encoded SHA256 hash of code_verifier

  code_challenge_method   S256 (SHA256 hashing)

  aud                     https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4
  -----------------------------------------------------------------------------------

3\. FHIR Resource Integration

After successful OAuth authentication, Sagaa fetches patient health
records using FHIR R4 API endpoints. This section details the
integration for all 7 required resource types.

3.1 FHIR Resource Types & Endpoints

**3.1.1 Patient Resource**

Endpoint: GET /Patient/{id}

Purpose: Patient demographics and identifiers

Key Data Fields:

-   name.given, name.family - Patient name

-   birthDate - Date of birth

-   gender - Administrative gender

-   address - Contact addresses

-   telecom - Phone numbers and email

-   identifier - MRN and other IDs

**3.1.2 Appointment Resource**

Endpoint: GET /Appointment?patient={id}

Purpose: Scheduled healthcare appointments

Key Data Fields:

-   status - booked, fulfilled, cancelled

-   start, end - Appointment date/time

-   appointmentType - Type of visit

-   participant.actor - Provider reference

-   description - Appointment reason

***Cross-Vertical Use Case:** Financial agent notifies about upcoming
appointment, checks insurance deductible status, suggests optimal
scheduling based on deductible reset date.*

**3.1.3 MedicationRequest Resource**

Endpoint: GET /MedicationRequest?patient={id}

Purpose: Prescribed medications

Key Data Fields:

-   medicationCodeableConcept - Drug name/code

-   dosageInstruction - How to take medication

-   status - active, completed, stopped

-   authoredOn - Prescription date

-   dispenseRequest.quantity - Amount prescribed

***Cross-Vertical Use Case:** Financial agent identifies recurring
medication costs, finds GoodRx coupons, allocates HSA funds, reminds
about refill timing to optimize budget.*

**3.1.4 Observation Resource (Labs & Vitals)**

Endpoint: GET /Observation?patient={id}&category=laboratory

Endpoint: GET /Observation?patient={id}&category=vital-signs

Purpose: Laboratory results and vital sign measurements

Key Data Fields:

-   code - LOINC code for test type

-   valueQuantity - Numeric result with unit

-   effectiveDateTime - When measured

-   referenceRange - Normal value ranges

-   interpretation - High, low, normal flags

*Common Vital Signs:*

> Blood pressure, heart rate, temperature, weight, height, BMI, oxygen
> saturation

***Cross-Vertical Use Case:** Health agent detects prediabetic A1C
result, financial agent budgets for nutritionist consultation and gym
membership, both coordinate on optimal timing.*

**3.1.5 Immunization Resource**

Endpoint: GET /Immunization?patient={id}

Purpose: Vaccination history

Key Data Fields:

-   vaccineCode - CVX code for vaccine type

-   occurrenceDateTime - Date administered

-   status - completed, entered-in-error

-   lotNumber - Vaccine batch identifier

-   protocolApplied - Dose number in series

**3.1.6 Condition Resource (Diagnoses)**

Endpoint: GET /Condition?patient={id}

Purpose: Medical diagnoses and problems

Key Data Fields:

-   code - ICD-10 or SNOMED diagnosis code

-   clinicalStatus - active, resolved, inactive

-   verificationStatus - confirmed, provisional

-   onsetDateTime - When diagnosed

-   severity - Severity assessment

***Cross-Vertical Use Case:** Financial agent factors chronic condition
management costs into long-term budget planning, HSA contribution
recommendations, insurance plan selection.*

**3.1.7 AllergyIntolerance Resource**

Endpoint: GET /AllergyIntolerance?patient={id}

Purpose: Known allergies and intolerances

Key Data Fields:

-   code - Allergen identification

-   clinicalStatus - active, inactive, resolved

-   criticality - low, high, unable-to-assess

-   reaction.manifestation - Symptoms

-   reaction.severity - mild, moderate, severe

4\. Data Storage Architecture

Sagaa uses a dual-storage approach: DynamoDB for structured, queryable
health records and S3 for raw FHIR JSON and user context enrichment.

4.1 DynamoDB Table Schema

**Table: epic_tokens**

Purpose: Store OAuth tokens for ongoing API access

  -----------------------------------------------------------------------
  **Field**         **Type**          **Description**
  ----------------- ----------------- -----------------------------------
  userId            String (PK)       Sagaa user ID (from Cognito)

  epicPatientId     String            Epic FHIR patient ID

  accessToken       String            Current access token (encrypted)

  refreshToken      String            Refresh token (encrypted)

  expiresAt         Number            Token expiration timestamp

  lastSync          Number            Last FHIR data sync timestamp
  -----------------------------------------------------------------------

**Health Record Tables (One per resource type):**

-   health_appointments

-   health_medications

-   health_observations

-   health_immunizations

-   health_conditions

-   health_allergies

**Common Schema Pattern for Health Records:**

  -----------------------------------------------------------------------
  **Field**         **Type**          **Description**
  ----------------- ----------------- -----------------------------------
  userId            String (PK)       Sagaa user ID

  resourceId        String (SK)       Epic FHIR resource ID

  fhirData          Map               Complete FHIR resource JSON

  normalizedData    Map               Sagaa-formatted data for AI agents

  createdAt         Number            Record creation timestamp

  updatedAt         Number            Last update timestamp
  -----------------------------------------------------------------------

4.2 S3 Storage Strategy

S3 serves two purposes: raw FHIR data backup and user context file
enrichment for AI agents.

**S3 Bucket Structure:**

> sagaa-user-data/
>
> {userId}/
>
> context.json - Enhanced with health summary
>
> health/
>
> raw-fhir/
>
> patient.json
>
> appointments.json
>
> medications.json
>
> observations.json
>
> immunizations.json
>
> conditions.json
>
> allergies.json

**Enhanced Context File Example:**

The existing context.json file gets enriched with health summary data:

> {
>
> \"user_id\": \"sarah_demo_001\",
>
> \"financial_profile\": { \... },
>
> \"health_profile\": {
>
> \"epic_connected\": true,
>
> \"last_sync\": \"2025-10-30T10:30:00Z\",
>
> \"active_conditions\": \[\"Prediabetes\", \"Hypertension\"\],
>
> \"active_medications\": \[
>
> { \"name\": \"Metformin\", \"cost_monthly\": 45 }
>
> \],
>
> \"upcoming_appointments\": \[
>
> { \"date\": \"2025-11-05\", \"type\": \"Cardiology\" }
>
> \],
>
> \"recent_labs\": { \"A1C\": 6.2, \"date\": \"2025-10-15\" }
>
> }
>
> }

5\. Cross-Vertical Integration

Sagaa\'s key differentiator is connecting health data to other life
verticals, particularly financial planning. This section details how
health context flows to the Financial Agent.

5.1 Agent Context Sharing Architecture

**Full Visibility Principle:** Financial Agent has complete read access
to health data for cross-vertical intelligence.

**Implementation Approach:**

1.  Health data stored in DynamoDB is accessible via shared data layer

2.  S3 context.json includes health summary for AI prompt context

3.  Financial Agent Lambda can query health tables directly when needed

4.  Bedrock prompts include health context for relevant financial
    decisions

5.2 Cross-Vertical Intelligence Examples

**Scenario 1: Gym Membership Decision**

User Query: \'Should I join this gym for \$65/month?\'

**Financial Agent Analysis:**

-   Checks fitness budget allocation: \$75/month available

-   Retrieves health data: User has prediabetes diagnosis, doctor
    recommended exercise

-   Sees upcoming cardiology appointment in 1 week

-   Notes: Insurance wellness program reimburses \$20/month for gym

**Sagaa Response:**

\"Your fitness budget supports \$65/month. Given your prediabetes
management goals and upcoming cardiology appointment, this is a
strategic health investment. Your insurance wellness program will
reimburse \$20/month, bringing your actual cost to \$45. I recommend
starting the membership now so you can discuss your exercise plan with
your cardiologist next week. Shall I adjust your budget to accommodate
this?\"

**Scenario 2: Medication Cost Planning**

Proactive Sagaa Notification (no user query needed):

**Health Agent Detects:**

-   New prescription: Metformin 500mg twice daily

-   Prescription filled date: 5 days ago

-   30-day supply, will need refill in 25 days

**Financial Agent Actions:**

-   Searches GoodRx: Finds coupon reducing cost from \$45 to \$12/month

-   Checks HSA balance: \$850 available

-   Creates recurring budget line item: \$12/month for Metformin

-   Sets calendar reminder: Refill in 25 days

**Sagaa Proactive Message:**

\"I see you started Metformin for prediabetes management. I found a
GoodRx coupon that reduces your monthly cost from \$45 to \$12. I\'ve
added this as a recurring expense in your healthcare budget and set up
your refill reminder for November 24th. Your HSA can cover the full year
if you prefer - shall I set up automatic HSA payments?\"

**Scenario 3: Insurance Deductible Timing**

User Context: Has elective procedure recommended, deductible resets
January 1

**Health Agent Data:**

-   Doctor recommended knee arthroscopy procedure

-   Condition: Chronic but not urgent

-   Current date: November 15

**Financial Agent Analysis:**

-   Annual deductible: \$2,000

-   Year-to-date spending: \$1,850

-   Remaining: \$150 to meet deductible

-   Procedure cost: \$8,000 (\$150 patient pays if done this year vs
    \$2,000 next year)

**Sagaa Strategic Recommendation:**

\"Your doctor recommended knee arthroscopy, which is non-urgent. Here\'s
an important financial consideration: You\'ve already paid \$1,850
toward your \$2,000 deductible this year. If you schedule the procedure
before December 31st, you\'ll only pay the remaining \$150. If you wait
until January, you\'ll start over with a new \$2,000 deductible. This
timing could save you \$1,850. Shall I help coordinate with your doctor
to schedule in December?\"

6\. Week-by-Week Implementation Plan

Detailed breakdown of development tasks across the 3-week POC timeline.

Week 1: OAuth Foundation

**Day 1-2: Epic Sandbox Setup**

-   Register for Epic FHIR Sandbox developer account

-   Create Sagaa Health Assistant application

-   Configure OAuth redirect URIs

-   Request all required FHIR scopes

-   Receive and securely store client credentials

-   Test sandbox access with test patient login

**Day 3-4: Frontend OAuth Implementation**

-   Create ConnectEpicButton React component

-   Implement PKCE code generation (code_verifier, code_challenge)

-   Build authorization URL with all required parameters

-   Store state and code_verifier in sessionStorage

-   Implement redirect to Epic authorization endpoint

-   Create EpicOAuthCallback component to handle return flow

**Day 5-7: Backend Token Exchange**

-   Create handleEpicCallback Lambda function

-   Implement authorization code exchange for access token

-   Validate state parameter for CSRF protection

-   Extract patient ID from token response

-   Create epic_tokens DynamoDB table

-   Implement secure token storage (encrypt access/refresh tokens)

-   Create refreshEpicToken Lambda function for token renewal

-   Test complete OAuth flow end-to-end

Week 2: FHIR Data Integration

**Day 8-9: FHIR Resource Fetching**

-   Create fetchFHIRResources Lambda function

-   Implement Patient resource fetch

-   Implement Appointment resource fetch with pagination

-   Implement MedicationRequest resource fetch

-   Implement Observation resource fetch (labs and vitals)

-   Handle FHIR Bundle pagination for large result sets

**Day 10-11: Remaining Resources & Data Normalization**

-   Implement Immunization resource fetch

-   Implement Condition resource fetch

-   Implement AllergyIntolerance resource fetch

-   Create FHIR to Sagaa data normalization functions

-   Extract key fields from complex FHIR JSON

-   Handle missing or optional FHIR fields gracefully

**Day 12-14: Data Storage Implementation**

-   Create all health\_\* DynamoDB tables

-   Implement batch write operations for FHIR resources

-   Store raw FHIR JSON in S3 health/raw-fhir/ directory

-   Update S3 context.json with health summary

-   Create health summary generation function

-   Test data retrieval and query patterns

-   Implement error handling and retry logic

Week 3: Integration & Demo Preparation

**Day 15-17: Cross-Vertical Integration**

-   Update Financial Agent Lambda to access health data

-   Enhance Bedrock prompts with health context

-   Implement health-aware financial recommendations

-   Create cross-agent event notification system

-   Test gym membership scenario (health + finance)

-   Test medication cost scenario (health + finance)

-   Test insurance timing scenario (health + finance)

**Day 18-19: Demo User Mapping**

-   Create Sagaa demo user accounts

-   Map Epic test patients to Sagaa demo users

-   Implement UI layer patient name substitution

-   Prepare investor demo script

-   Create demo data scenarios with compelling cross-vertical examples

**Day 20-21: Testing & Validation**

-   End-to-end OAuth flow testing

-   FHIR data sync validation for all resource types

-   Context file enrichment verification

-   Cross-vertical recommendation accuracy testing

-   Performance testing (response times, data sync speed)

-   Error handling validation

-   Security review (token encryption, data access controls)

-   Full investor demo rehearsal

7\. Success Criteria & Validation

POC is considered complete when these criteria are met:

7.1 Technical Success Criteria

-   OAuth flow completes successfully with Epic sandbox

-   Access tokens stored securely and refresh automatically

-   All 7 FHIR resource types successfully retrieved and stored

-   DynamoDB health tables populated with normalized data

-   S3 context files enhanced with health summaries

-   Financial Agent successfully queries health data

-   Cross-vertical recommendations work accurately

-   Error handling prevents crashes and provides user feedback

7.2 Demo Success Criteria

-   Demo user can click \'Connect Epic MyChart\' and complete OAuth

-   Health records appear in Sagaa (showing demo user\'s name, not test
    patient)

-   Financial Agent provides health-aware recommendation (gym membership
    scenario)

-   Proactive notification demonstrates medication cost optimization

-   Insurance timing scenario shows strategic financial planning with
    health context

-   Demo runs smoothly in 10-15 minute presentation

-   Investors clearly see Sagaa\'s cross-vertical intelligence advantage

8\. Post-POC Next Steps

After successful POC completion and investor presentations:

8.1 Production Epic Integration (2-3 Months)

-   Apply to Epic App Orchard

-   Complete security questionnaire

-   Undergo Epic security review

-   Obtain SOC 2 Type II certification

-   Implement production-grade error handling

-   Add comprehensive logging and monitoring

-   Scale infrastructure for real user load

8.2 Health Dashboard UI Development

-   Design Sagaa-specific health records interface

-   Create health overview dashboard

-   Build individual views for medications, appointments, labs, etc.

-   Implement health timeline visualization

-   Add cross-vertical insight cards

-   Design proactive health notifications

8.3 Expand to Additional EHR Providers

-   Cerner/Oracle Health integration

-   CommonHealth aggregator (access to 1000+ health systems)

-   Medicare Blue Button API

-   Manual record entry for non-participating providers

8.4 Community Health Insights (Real System)

-   Build differential privacy aggregation system

-   Create health condition cohort matching

-   Implement treatment success story collection

-   Design HIPAA-compliant sharing mechanism

-   Add community validation for health insights

Conclusion

This Epic FHIR integration establishes the technical foundation for
Sagaa\'s health vertical while demonstrating the platform\'s unique
cross-vertical intelligence capabilities. By focusing on a functional
POC with Epic\'s sandbox environment, Sagaa can effectively showcase its
differentiating value proposition to investors within a 2-3 week
timeline.

The key success factor is not building a complete production-ready
health system, but rather proving the concept that health data can
meaningfully inform financial decisions and other life management areas.
This POC provides the compelling evidence investors need to see Sagaa\'s
vision realized in a working demonstration.

Upon successful POC completion, the path to production Epic integration
and expansion to additional health data sources becomes clear, with this
POC serving as the architectural blueprint for Sagaa\'s health vertical.

\-\--

Document Version: 1.0

Date: October 30, 2025

Prepared for: Sagaa Development Team
