---
title: 'Error Handling | Meta-SDK'
description: 'Learn how to catch and debug MetaApiErrors thrown by the Graph API.'
head:
  - - meta
    - name: keywords
      content: meta api error, error handling, try catch graph api
---

# Error Handling

Whenever the Meta Graph API rejects your request (due to a bad token, missing permissions, or invalid parameters), the SDK parses their error response and throws a specialized `MetaApiError`.

## Catching Errors

You should always wrap your SDK calls in a `try...catch` block to handle exceptions gracefully.

```typescript
import { MetaApiError } from '@vitabletech/meta-sdk';

try {
  const result = await client.facebook.comments.delete('INVALID_ID');
} catch (error) {
  if (error instanceof MetaApiError) {
    console.error(`Meta API Error [${error.code}]: ${error.message}`);
    console.error(`Subcode: ${error.subcode}`);
    console.error(`Trace ID: ${error.fbtrace_id}`);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}
```

## Common Error Codes

| Code  | Meaning                    | Action                                                                                                   |
| ----- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `190` | Invalid OAuth Access Token | Your token expired or was invalidated. You need to prompt the user to re-authenticate.                   |
| `100` | Invalid Parameter          | You provided a malformed ID, or requested fields that don't exist on the object.                         |
| `10`  | Permission Denied          | The user did not grant the necessary permission (e.g., `pages_manage_engagement`) during the OAuth flow. |
