---
title: 'Custom Requests | Meta-SDK'
description: 'Make raw GET, POST, DELETE requests to any undocumented Meta Graph API endpoint using the underlying HTTP Client.'
head:
  - - meta
    - name: keywords
      content: custom meta request, generic graph api call, http client
---

# Custom Requests

While the SDK provides dedicated services for common tasks (like fetching Instagram Media or Facebook Comments), the Graph API is absolutely massive. It is impossible for one SDK to statically type every single endpoint Meta offers.

Because of this, the **Meta-SDK** exposes its underlying authenticated HTTP Client, allowing you to make raw requests to _any_ endpoint on the Graph API!

## Generic Methods

You can access the generic HTTP methods directly on the `client`:

- `client.get<T>(path, params?)`
- `client.post<T>(path, data?)`
- `client.delete<T>(path)`

### Example: Fetching Ad Campaigns

Even though the SDK doesn't have a dedicated `AdsService`, you can easily fetch your ad campaigns using `.get()`:

```typescript
// GET /v20.0/act_<AD_ACCOUNT_ID>/campaigns
const campaigns = await client.get('/act_123456789/campaigns', {
  fields: 'name,status,objective',
});

console.log(campaigns.data);
```

### Example: Publishing a Photo

```typescript
// POST /v20.0/me/photos
const response = await client.post('/me/photos', {
  url: 'https://example.com/photo.jpg',
  message: 'Check out this awesome photo!',
});

console.log('Photo ID:', response.id);
```

By using the custom request methods, the SDK still automatically handles your **Authentication** and **Rate Limiting**!
