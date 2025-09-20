import { client } from '@/lib/sanity.client';
import { latestPostsQuery } from '@/lib/sanity.queries';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const posts = await client.fetch(latestPostsQuery);

    if (posts && posts.length > 0) {
      // Select a random post
      const randomIndex = Math.floor(Math.random() * posts.length);
      const randomPost = posts[randomIndex];

      return res.status(200).json(randomPost);
    } else {
      return res.status(404).json({ message: 'No posts found' });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
}