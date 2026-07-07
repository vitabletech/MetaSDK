import { MetaClient } from '../src/index';

async function testSDK() {
  const client = new MetaClient({
    accessToken: 'test-token',
    debug: true,
  });

  console.log('Testing Facebook SDK...');
  try {
    // This will fail because the token is fake, but it verifies structure
    const posts = await client.facebook.posts.list('me');
    console.log(posts.data);
  } catch (e: any) {
    console.log('Expected error due to fake token:', e.message);
  }

  console.log('\nTesting Instagram SDK...');
  try {
    const media = await client.instagram.media.list('me');
    console.log(media.data);
  } catch (e: any) {
    console.log('Expected error due to fake token:', e.message);
  }
}

testSDK();
