# Meta SDK Implementation Plan

This plan outlines the architecture and implementation details for a highly scalable, generic, and maintainable Node.js SDK (npm package) for interacting with Meta Graph API (Facebook and Instagram).

## Goal Description

Create a TypeScript-based NPM package to fetch Facebook/Instagram posts, fetch their comments, and reply to comments. It will include built-in pagination, smart rate-limiting to prevent throttling, and follow SOLID design principles for easy future extension.

## User Review Required

> [!IMPORTANT]
>
> - **HTTP Client Choice**: I plan to use the native `fetch` API for modern compatibility and minimal dependencies. Are you okay with this, or do you strongly prefer `axios`?
> - **Target Environments**: Is this SDK intended purely for Node.js (backend) or should it also support browser environments (frontend)? (Using native `fetch` supports both, but browser usage of Meta APIs often involves CORS and secret handling, so this is typically a backend task).

## Open Questions

- Do you have a preferred package bundler (e.g., `tsup`, `rollup`, `tsc`) for distributing the npm package? (I recommend `tsup` for easy setup and fast bundling).
- Are there specific Meta API versions we need to target (e.g., `v19.0`, `v20.0`), or should we default to the latest stable version and allow it to be configurable?

## Proposed Architecture

The SDK will follow SOLID and DRY principles:

- **Dependency Inversion**: Services will rely on an abstract `IHttpClient` interface, making it easy to swap out the underlying request mechanism.
- **Single Responsibility**: Separate modules for Rate Limiting, Pagination, HTTP communication, and specific Meta/Instagram namespaces.
- **Open/Closed**: The architecture will allow you to add new features (like WhatsApp or Ads API) in the future without changing the core client.

### Project Structure

```text
meta-sdk/
├── src/
│   ├── index.ts                (Entry point)
│   ├── client/
│   │   ├── MetaClient.ts       (Main client orchestrator)
│   │   ├── HttpClient.ts       (Wrapper for native fetch with interceptors)
│   │   └── RateLimiter.ts      (Handles backoff & parses Meta's x-app-usage headers)
│   ├── pagination/
│   │   └── Paginator.ts        (Generic wrapper for Meta's cursor-based pagination)
│   ├── services/
│   │   ├── facebook/           (Facebook-specific endpoints)
│   │   │   ├── FacebookPostsService.ts
│   │   │   └── FacebookCommentsService.ts
│   │   └── instagram/          (Instagram-specific endpoints)
│   │       ├── InstagramMediaService.ts
│   │       └── InstagramCommentsService.ts
│   ├── types/
│   │   ├── index.ts            (Interfaces and generic types)
│   │   ├── config.ts           (Client configuration types)
│   │   └── responses.ts        (Meta API response typings)
│   └── errors/
│       └── MetaApiError.ts     (Custom error classes for Graph API errors)
├── package.json
├── tsconfig.json
└── README.md
```

### Key Features Design

#### 1. Smart Rate Limiting

Meta sends `x-app-usage`, `x-page-usage`, or `x-business-use-case-usage` headers in its responses.
The `RateLimiter` class will intercept all API responses:

- It will parse these headers. If usage exceeds a certain configurable threshold (e.g., 90%), the SDK can proactively delay subsequent requests.
- If a `429 Too Many Requests` is encountered, the SDK will automatically retry the request using exponential backoff up to a maximum number of retries.

#### 2. Automatic Pagination

Meta Graph API returns a `paging` object with `cursors` or `next`/`previous` links.
The SDK will abstract this into a `Paginator` utility. Responses that are lists will return an object with a `.nextPage()` method, making traversal seamless:

```typescript
const posts = await client.facebook.posts.list(pageId);
// Get next page
if (posts.hasNextPage) {
  const nextPosts = await posts.nextPage();
}
```

#### 3. SOLID Services

The main `MetaClient` will inject the authenticated `HttpClient` into the sub-services (`FacebookService`, `InstagramService`). This guarantees that adding a new service in the future only requires defining a new class and attaching it to the client, touching no existing logic.

## Proposed Changes

### Core SDK Setup

- **[NEW]** `package.json`: Configure scripts for build, test, lint.
- **[NEW]** `tsconfig.json`: TypeScript configuration for generating CommonJS and ESM modules.
- **[NEW]** `tsup.config.ts`: Configuration for the bundler.

### Implementation

- **[NEW]** `src/client/HttpClient.ts`: Generic request executor.
- **[NEW]** `src/client/RateLimiter.ts`: Retry and backoff logic.
- **[NEW]** `src/pagination/Paginator.ts`: Class wrapping array results for easy `.nextPage()` calling.
- **[NEW]** `src/services/facebook/*`: Classes mapping to `/vX.X/{page-id}/feed` and `/{post-id}/comments`.
- **[NEW]** `src/services/instagram/*`: Classes mapping to `/vX.X/{ig-user-id}/media` and `/{media-id}/comments`.

## Verification Plan

### Automated Tests

- We will set up `Jest` for unit testing.
- Write tests for the `RateLimiter` to ensure it properly reads headers and backs off.
- Write tests for the `Paginator` to ensure it correctly fetches the next cursor.
- Write tests for the `HttpClient` to ensure query parameters and access tokens are formatted correctly.

### Manual Verification

- We can write a small scratch script (`scratch/test-sdk.ts`) to instantiate the client and attempt to fetch actual data (if test credentials/tokens are provided).
