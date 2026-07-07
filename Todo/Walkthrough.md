# Meta SDK Walkthrough

I have successfully created the highly scalable, generic, and maintainable Node.js SDK for the Meta Graph API based on the approved implementation plan.

## Completed Features

### 1. Robust Core Architecture

- **Dependency Inversion**: Implemented a generic `HttpClient` utilizing the native `fetch` API. This keeps the bundle size minimal and ensures modern runtime compatibility.
- **Service Abstractions**: Specific endpoints for Facebook and Instagram are modularized under `src/services/facebook` and `src/services/instagram`. This makes the SDK incredibly easy to extend in the future.

### 2. Smart Rate Limiting (`RateLimiter`)

- The SDK automatically monitors `x-app-usage` headers on every response.
- If usage creeps above the defined threshold (default 90%), it introduces a delay to prevent throttling.
- It also handles `429 Too Many Requests` responses natively by applying an exponential backoff and retry strategy.

### 3. Automatic Pagination (`Paginator`)

- Meta returns complex cursor-based URLs for pagination. The `Paginator` class abstracts this away.
- Responses now expose `.hasNextPage` and `.nextPage()` methods, allowing for seamless list traversal without manually managing cursor query parameters.

### 4. Build System Setup

- Integrated `tsup` for lightning-fast bundling.
- Generates both CommonJS (`.js`) and ESM (`.mjs`) builds, alongside full TypeScript declaration files (`.d.ts`).
- Set up `Jest` for automated testing of the core utilities.

## How To Use The SDK

Here is a quick example of how you can use the newly created SDK in your projects:

```typescript
import { MetaClient } from 'meta-sdk';

// Initialize the client
const client = new MetaClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
  version: 'v20.0', // Optional, defaults to latest
  debug: true, // Set to true to see URL requests
});

async function run() {
  // 1. Fetching Facebook Posts with Pagination
  const posts = await client.facebook.posts.list('me');
  console.log(`Fetched ${posts.data.length} posts`);

  if (posts.hasNextPage) {
    const nextPosts = await posts.nextPage();
    console.log(`Fetched ${nextPosts.data.length} more posts`);
  }

  // 2. Fetching Instagram Media
  const media = await client.instagram.media.list('me');
  console.log(`Fetched ${media.data.length} media items`);

  // 3. Commenting
  const response = await client.facebook.comments.create(
    'POST_ID',
    'Hello from the SDK!'
  );
  console.log('Comment created with ID:', response.id);
}

run();
```

## Validation Performed

- **Unit Tests**: Wrote and passed `Jest` tests for `RateLimiter` and `Paginator` logic.
- **Build Verification**: Configured and verified the `tsup` build step successfully compiles the `es2022` target.
- **E2E Structure Test**: Created a small script in `scratch/test-sdk.ts` demonstrating the client routing HTTP requests with correct auth parameters.
