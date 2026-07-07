---
title: 'Installation | Meta-SDK'
description: 'Learn how to install the Meta-SDK via NPM in your Node.js project.'
head:
  - - meta
    - name: keywords
      content: install meta sdk, npm install, setup, nodejs
---

# Installation

Getting started with the **Meta-SDK** is incredibly simple. It has zero external dependencies, making it ultra-lightweight.

## Prerequisites

- **Node.js**: Version 18.x or higher (requires the native `fetch` API).
- **TypeScript**: If you are using TypeScript, ensure your `tsconfig.json` has `"moduleResolution": "node"`.

## Install via NPM

Run the following command to install the package in your project:

```bash
npm install @vitabletech/meta-sdk
```

## Import the Client

You can import the SDK into your project using either ES Modules or CommonJS:

### ES Modules (Recommended)

```typescript
import { MetaClient } from '@vitabletech/meta-sdk';
```

### CommonJS

```javascript
const { MetaClient } = require('@vitabletech/meta-sdk');
```

## Next Steps

Now that the SDK is installed, head over to the [Authentication Guide](./authentication.md) to initialize the client with your Meta Access Token!
