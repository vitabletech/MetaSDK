---
title: 'Instagram API | Meta-SDK'
description: 'Interact with Instagram Professional Accounts, Media, and Comments easily using the Meta-SDK.'
head:
  - - meta
    - name: keywords
      content: instagram api, instagram graph api, fetch media, instagram comments
---

# Instagram API

The SDK provides dedicated services for interacting with Instagram Professional Accounts.

## Fetching Media

You can fetch all media (Reels, Images, Carousels) for a given Instagram User ID.

```typescript
// Fetch the latest media
const media = await client.instagram.media.list('IG_USER_ID', { limit: 5 });

for (const item of media.data) {
  console.log(`Media Type: ${item.media_type}`);
  console.log(`URL: ${item.media_url}`);
}
```

## Managing Comments & Replies

Instagram is slightly stricter than Facebook. Top-level comments belong to the `media` object, but replies belong to the `comment` object. The SDK handles this distinction clearly.

### List Top-Level Comments

```typescript
const comments = await client.instagram.comments.list('MEDIA_ID_HERE');
console.log(comments.data);
```

### List Replies to a Comment

```typescript
const replies = await client.instagram.comments.listReplies('COMMENT_ID_HERE');
console.log(replies.data);
```

### Create a Reply

To reply to an existing comment, use the `createReply` method:

```typescript
const reply = await client.instagram.comments.createReply(
  'COMMENT_ID_HERE',
  'We hear you!'
);
console.log('Replied successfully with ID:', reply.id);
```

---

## Official References

- [Instagram Graph API Overview](https://developers.facebook.com/docs/instagram-api/)
- [Instagram Media Node Reference](https://developers.facebook.com/docs/instagram-api/reference/media/)
- [Instagram Comment Node Reference](https://developers.facebook.com/docs/instagram-api/reference/comment/)
