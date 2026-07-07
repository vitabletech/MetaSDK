# Meta SDK

A highly scalable, modern, and generic Node.js SDK for interacting with the Meta Graph API (Facebook and Instagram).

## Features

- 🚀 **Modern Architecture**: Built on the native `fetch` API for minimal dependencies and maximum performance.
- 📦 **Fully Typed**: Written in TypeScript with exhaustive typings for API responses.
- 🚦 **Smart Rate Limiting**: Automatically monitors `x-app-usage` headers. Proactively delays requests when approaching limits and seamlessly handles `429 Too Many Requests` with exponential backoff.
- 📄 **Automatic Pagination**: Abstracts away complex cursor-based URLs into simple `.hasNextPage` and `.nextPage()` methods.
- 🧩 **SOLID & Extensible**: Designed with Single Responsibility and Dependency Inversion in mind, making it trivial to add new Meta API features in the future.

## Installation

```bash
npm install meta-sdk
```

## Quick Start

Initialize the `MetaClient` with your access token.

```typescript
import { MetaClient, MetaApiError } from 'meta-sdk';

const client = new MetaClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
  version: 'v20.0', // Optional. Defaults to latest stable (e.g. 'v20.0')
  debug: true, // Optional. Set to true to see underlying HTTP requests in console
});
```

## Usage

### Facebook Graph API

#### Fetching Posts

```typescript
async function fetchPosts() {
  const posts = await client.facebook.posts.list('me'); // or specify a page ID

  console.log('Posts:', posts.data);

  // Easily fetch the next page of results
  if (posts.hasNextPage) {
    const nextPosts = await posts.nextPage();
    console.log('Next page posts:', nextPosts?.data);
  }
}
```

#### Fetching and Managing Comments

```typescript
async function manageComments() {
  const postId = '123456789_987654321';

  // List Comments
  const comments = await client.facebook.comments.list(postId);

  // Create a Comment (or reply to an existing one)
  const newComment = await client.facebook.comments.create(
    postId,
    'This is a test comment from SDK!'
  );
  console.log('Created comment ID:', newComment.id);

  // Delete a Comment
  await client.facebook.comments.delete(newComment.id);
}
```

### Instagram Graph API

#### Fetching Media

```typescript
async function fetchInstagramMedia() {
  const igUserId = '17841400000000000';
  const media = await client.instagram.media.list(igUserId);

  console.log('Media items:', media.data);
}
```

#### Instagram Comments & Replies

```typescript
async function manageInstagramComments() {
  const mediaId = '17895695668000000';

  // List Comments on Media
  const comments = await client.instagram.comments.list(mediaId);

  // Create a Comment on Media
  const newComment = await client.instagram.comments.create(
    mediaId,
    'Great photo!'
  );

  // List Replies on a Comment
  const replies = await client.instagram.comments.listReplies(newComment.id);

  // Reply to a specific Comment
  await client.instagram.comments.createReply(newComment.id, 'Thanks!');
}
```

### Generic API Requests

If you need to hit custom endpoints or endpoints not explicitly covered by the SDK's services (like WhatsApp API or Facebook Ads), you can use the generic methods directly on the `client` instance. These methods still benefit from automatic rate-limiting and access token injection!

```typescript
async function customEndpoint() {
  // GET request
  const myProfile = await client.get('/me', { fields: 'id,name,email' });

  // POST request
  const result = await client.post('/me/feed', { message: 'Hello World!' });

  // DELETE request
  await client.delete(`/${result.id}`);
}
```

## Error Handling

The SDK exposes a `MetaApiError` class which extends the native `Error` class and encapsulates Graph API specific error data.

```typescript
import { MetaApiError } from 'meta-sdk';

try {
  await client.facebook.posts.list('invalid_id');
} catch (error) {
  if (error instanceof MetaApiError) {
    console.error(`Graph API Error [${error.code}]:`, error.message);
    console.error('Type:', error.type);
    console.error('Trace ID:', error.fbtraceId);
  } else {
    console.error('Unknown Error:', error);
  }
}
```

## Building Locally

To build the package from source:

```bash
npm run build
```

This will compile the TypeScript code via `tsup` into both CommonJS and ESM modules in the `/dist` directory.

## Connect With Vitabletech

This SDK is maintained by **Vitabletech**. Feel free to reach out or follow us on our platforms:

- 🌐 [Website](https://vitabletech.in)
- 🐙 [GitHub](https://github.com/vitabletech)
- 📘 [Facebook](https://www.facebook.com/vitabletech)
- 📸 [Instagram](https://www.instagram.com/vitabletech)
- 💼 [LinkedIn](https://www.linkedin.com/company/vitabletech)
- 🎥 [YouTube](https://www.youtube.com/@vitabletech)
- 📦 [More Packages](https://gbp.vitabletech.in/)

## License

ISC License
