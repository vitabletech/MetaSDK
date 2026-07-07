---
title: 'Prerequisites | Meta-SDK'
description: 'Everything you need to set up your environment before using the Meta-SDK.'
head:
  - - meta
    - name: keywords
      content: meta sdk requirements, nodejs version, facebook developer account
---

# Prerequisites

Before you can start writing code with the Meta-SDK, ensure your development environment meets the following requirements.

## 1. Node.js Environment

You must be running **Node.js 18.0.0 or higher**.
The SDK relies heavily on the native `fetch` API which was introduced natively in Node 18.

If you are using TypeScript, ensure your `tsconfig.json` is configured with:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "types": ["node"]
  }
}
```

## 2. Meta Developer Account

You must have a registered account on the [Meta for Developers](https://developers.facebook.com/) portal.
You will need to create an "App" to obtain your **App Secret** and generate an **Access Token**.

## 3. Necessary Permissions

Depending on what you want to fetch, you must ensure your Access Token is granted the correct permissions:

- `pages_read_engagement` (to read Facebook Page posts)
- `pages_manage_engagement` (to reply to Facebook Comments)
- `instagram_basic` (to read Instagram Media)
- `instagram_manage_comments` (to reply to Instagram Comments)
