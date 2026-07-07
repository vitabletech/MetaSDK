---
title: 'Authentication | Meta-SDK'
description: 'Learn how to securely initialize the Meta-SDK and manage Graph API Access Tokens.'
head:
  - - meta
    - name: keywords
      content: meta sdk authentication, access token, app secret, verify token
---

# Authentication

Before you can make requests to Facebook or Instagram, you need to initialize the `MetaClient` with an Access Token.

## Finding your Token

You can generate a Page Access Token or a System User Access Token from the **Meta App Dashboard** (developers.facebook.com).

> [!WARNING] Keep your tokens safe!
> Never hardcode your Access Token in your source code. Always use Environment Variables (`.env`).

## Initializing the Client

```typescript
import { MetaClient } from '@vitabletech/meta-sdk';

// 1. Initialize the client
const client = new MetaClient({
  accessToken: process.env.META_ACCESS_TOKEN || '',
  version: 'v20.0', // Optional. Defaults to latest stable (e.g. 'v20.0')
  // Optional: Set to true to log all HTTP requests
  debug: true,
});

// 2. You are ready to go!
const myProfile = await client.get('/me');
console.log(myProfile);
```

## Security Best Practices

**Do not use this SDK in frontend code (like React, Vue, or Angular).**
This is a Node.js Backend SDK. If you bundle your Access Token into a frontend application, anyone can steal it using Chrome DevTools and gain full control over your Facebook Pages and Instagram accounts.

Always install the SDK in your backend (Express, NestJS, Next.js API Routes), and have your frontend communicate with your backend.
