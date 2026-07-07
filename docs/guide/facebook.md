---
title: 'Facebook API | Meta-SDK'
description: 'Interact with Facebook Pages, Posts, and Comments seamlessly using the Meta-SDK.'
head:
  - - meta
    - name: keywords
      content: facebook api, facebook graph api, fetch posts, manage comments
---

# Facebook API

The SDK provides dedicated services for interacting with Facebook Pages, Posts, and Comments.

## Fetching Posts

You can fetch posts for a given Facebook Page ID using the `posts` service.

```typescript
// Fetch the latest 10 posts from your page
const posts = await client.facebook.posts.list('me', { limit: 10 });

for (const post of posts.data) {
  console.log(`Post ID: ${post.id}`);
  console.log(`Message: ${post.message}`);
}
```

## Managing Comments

You can easily list, create, and delete comments on any Facebook Post.

### List Comments

```typescript
const comments = await client.facebook.comments.list('POST_ID_HERE');
console.log(comments.data);
```

### Reply to a Post

```typescript
const result = await client.facebook.comments.create(
  'POST_ID_HERE',
  'Thanks for reaching out!'
);
console.log('Created comment with ID:', result.id);
```

### Delete a Comment

```typescript
await client.facebook.comments.delete('COMMENT_ID_HERE');
console.log('Comment deleted successfully!');
```

---

## Official References

- [Meta Graph API Page Nodes & Edges](https://developers.facebook.com/docs/graph-api/reference/page/)
- [Meta Graph API Comment Node Reference](https://developers.facebook.com/docs/graph-api/reference/v20.0/comment)
- [Facebook Page Access Tokens Guide](https://developers.facebook.com/docs/pages/access-tokens)
