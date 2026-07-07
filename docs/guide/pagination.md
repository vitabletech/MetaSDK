---
title: 'Pagination | Meta-SDK'
description: 'Learn how to use the built-in Paginator to handle large datasets from the Meta Graph API.'
head:
  - - meta
    - name: keywords
      content: meta api pagination, graph api cursors, next page, paginator
---

# Pagination

The Meta Graph API limits the number of items you can fetch in a single request. To fetch hundreds or thousands of items, you must use Pagination.

The **Meta-SDK** uses a custom `Paginator` class that makes fetching subsequent pages incredibly intuitive.

## Using Cursors (For APIs)

If you are building a REST API where the frontend requests data from your backend, you should pass the cursors back and forth.

```typescript
// Pass the frontend's ?after=XYZ query string straight into the SDK
const posts = await client.facebook.posts.list('me', {
  limit: 10,
  after: req.query.after,
});

// Send it back to the frontend.
// The SDK will automatically include a `paging` object with cursors.
res.json(posts);
```

## Using `nextPage()` (For Background Jobs)

If you are writing a backend Cron Job, a data-sync worker, or a one-off script, you can completely automate the pagination using the `.nextPage()` method.

```typescript
async function syncAllPosts() {
  let posts = await client.facebook.posts.list('me', { limit: 100 });

  while (posts.data.length > 0) {
    // Save to your database...
    await saveToDatabase(posts.data);

    // Fetch the next page automatically
    if (posts.hasNextPage) {
      posts = await posts.nextPage();
    } else {
      break;
    }
  }
}
```

The SDK automatically reads the cursors from the Meta API response and fires the correct subsequent requests for you!

---

## Official References

- [Meta Graph API Pagination Guide](https://developers.facebook.com/docs/graph-api/results)
- [Understanding Cursors and Paging Nodes](https://developers.facebook.com/docs/graph-api/using-graph-api/#paging)
