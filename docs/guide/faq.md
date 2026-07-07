---
title: 'FAQ | Meta-SDK'
description: 'Frequently Asked Questions about the Meta-SDK.'
head:
  - - meta
    - name: keywords
      content: meta sdk faq, browser support, rate limits, javascript facebook sdk
---

# Frequently Asked Questions

### Can I use this SDK in the browser (React / Vue)?

**No.** This is strictly a Node.js backend SDK.
If you bundle this SDK into a frontend application, you will expose your Meta Access Token and App Secret to the public, which is a massive security risk. Your frontend should communicate with your own backend API, and your backend API should use this SDK.

### Does the SDK support the Instagram Basic Display API?

The SDK primarily targets the **Instagram Graph API** (for Professional/Creator accounts). The Basic Display API is being deprecated by Meta and is generally not recommended for new projects.

### What happens if I hit a Rate Limit?

The Meta Graph API is very strict about rate limits. If you exceed your limit, Meta responds with a `429 Too Many Requests` status.
The Meta-SDK intercepts this error automatically, pauses the request for a few seconds using an exponential backoff strategy, and retries it for you. You don't need to write any custom retry logic!

### How do I upload Videos?

Video uploads require chunking and the `graph-video.facebook.com` endpoint. While the SDK doesn't have a dedicated `video.upload` method yet, you can easily achieve this using the `client.post()` method (see [Custom Requests](./custom-requests.md)).
