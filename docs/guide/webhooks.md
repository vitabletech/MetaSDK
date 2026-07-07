---
title: 'Webhooks Security | Meta-SDK'
description: 'Automate cryptographic signature validation (HMAC SHA-256) for Meta Graph API webhooks.'
head:
  - - meta
    - name: keywords
      content: meta webhooks, facebook webhooks, instagram webhooks, x-hub-signature-256, hmac validation
---

# Webhooks

Meta Webhooks are incredibly powerful because they allow you to listen for events (like new comments or messages) in real-time without constantly polling the API.

However, setting them up requires cryptographic signature validation. The **Meta-SDK** completely automates this for you.

## 1. Verifying the Setup Challenge

When you configure your Webhook URL in the Meta App Dashboard, Meta will send a `GET` request to your server to verify you own it. The SDK handles this instantly.

```typescript
// Inside your Express/Next.js GET route
app.get('/api/webhooks', (req, res) => {
  const mode = req.query['hub.mode'];
  const verifyToken = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // This returns the challenge string if valid, or null if invalid
  const validChallenge = client.webhooks.verifyChallenge(
    mode,
    verifyToken,
    challenge
  );

  if (validChallenge) {
    res.status(200).send(validChallenge);
  } else {
    res.status(403).send('Forbidden');
  }
});
```

## 2. Validating the Signature

When a real event occurs, Meta sends a `POST` request to your server. Meta signs the raw JSON body using `HMAC SHA-256` and your App Secret.

> [!IMPORTANT]
> You **must** provide the unparsed, raw body buffer/string to the SDK. If your framework (like Express `body-parser`) has already parsed it into a JSON object, the cryptographic hash will fail.

```typescript
app.post('/api/webhooks', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const rawBody = req.rawBody; // The unparsed string/buffer

  // 1. Validate the cryptographic signature
  const isValid = client.webhooks.validateSignature(rawBody, signature);

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // 2. Safely parse the payload
  const event = client.webhooks.parsePayload(rawBody);
  console.log('Received authentic event:', event);

  res.status(200).send('EVENT_RECEIVED');
});
```

---

## Official References

- [Meta Webhooks Overview](https://developers.facebook.com/docs/graph-api/webhooks)
- [Securing Webhooks & X-Hub-Signature-256](https://developers.facebook.com/docs/graph-api/webhooks/getting-started#security)
- [Instagram Webhooks Reference](https://developers.facebook.com/docs/instagram-api/guides/webhooks)
