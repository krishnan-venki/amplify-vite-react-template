# API Endpoint Management Guide

## Two Approaches for Managing Multiple API Endpoints

### Approach 1: Multiple Individual Environment Variables
**Best for**: Different API services (separate API Gateways or services)

#### .env.development
```
VITE_CHAT_API_URL=https://chat-api.amazonaws.com/dev
VITE_PAYMENT_API_URL=https://payment-api.amazonaws.com/dev
VITE_ANALYTICS_API_URL=https://analytics-api.amazonaws.com/dev
```

#### .env.production
```
VITE_CHAT_API_URL=https://chat-api.amazonaws.com/prod
VITE_PAYMENT_API_URL=https://payment-api.amazonaws.com/prod
VITE_ANALYTICS_API_URL=https://analytics-api.amazonaws.com/prod
```

#### Usage in code:
```typescript
const chatUrl = import.meta.env.VITE_CHAT_API_URL;
const paymentUrl = import.meta.env.VITE_PAYMENT_API_URL;
```

---

### Approach 2: Single Base URL + Centralized Config (RECOMMENDED)
**Best for**: Multiple endpoints from the same API Gateway

#### .env.development
```
VITE_API_BASE_URL=https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev
```

#### .env.production
```
VITE_API_BASE_URL=https://63z70erbsb.execute-api.us-west-2.amazonaws.com/prod
```

#### src/config/api.ts
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  'https://63z70erbsb.execute-api.us-west-2.amazonaws.com/dev';

export const API_ENDPOINTS = {
  PROMPT: `${API_BASE_URL}/prompt`,
  CHAT: `${API_BASE_URL}/chat`,
  ANALYTICS: `${API_BASE_URL}/analytics`,
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  USER_SETTINGS: `${API_BASE_URL}/user/settings`,
  HEALTH: `${API_BASE_URL}/health`,
  FINANCE: `${API_BASE_URL}/finance`,
} as const;

export default API_ENDPOINTS;
```

#### Usage in code:
```typescript
import API_ENDPOINTS from '../config/api';

// In your fetch calls:
const res = await fetch(API_ENDPOINTS.PROMPT, { ... });
const res2 = await fetch(API_ENDPOINTS.CHAT, { ... });
```

---

## Advantages of Approach 2 (Centralized Config):

✅ **Single source of truth** - All endpoints defined in one place
✅ **Easier maintenance** - Change base URL in one place
✅ **Type safety** - TypeScript autocomplete for all endpoints
✅ **Fewer environment variables** - Only one base URL needed
✅ **Easy to add endpoints** - Just add to the config file
✅ **Better for teams** - Clear documentation of all available endpoints

---

## When to Use Each Approach:

### Use Approach 1 (Multiple Env Vars) when:
- APIs are from different services/vendors
- APIs have completely different authentication methods
- APIs are hosted on different domains/gateways
- You need flexibility to point each API to different environments independently

### Use Approach 2 (Base URL + Config) when:
- All endpoints are from the same API Gateway
- Endpoints share the same authentication
- You have many endpoints (5+)
- You want better code organization and maintainability

---

## AWS Amplify Configuration

For **either approach**, add your environment variables in AWS Amplify Console:

1. Go to AWS Amplify Console
2. Select your app
3. Go to **Environment variables**
4. Add:
   - Approach 1: `VITE_CHAT_API_URL`, `VITE_PAYMENT_API_URL`, etc.
   - Approach 2: `VITE_API_BASE_URL` (just one!)
