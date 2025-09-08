import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>https://amforest.lv</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://amforest.lv/about</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://amforest.lv/contact</loc>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://amforest.lv/blog</loc>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     
     <!-- Service pages -->
     <url>
       <loc>https://amforest.lv/services/treilera-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/mezizvedeja-traktora-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/universala-ritenu-traktora-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/kezu-ekskavatora-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/kniebeja-ekskavatora-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/kokvedeja-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/kokvedeja-puspiekabes-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/malkas-skalditaja-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/auto-servisa-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/telpu-ire</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/dastosanas-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/meza-projekta-taksacijas</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>https://amforest.lv/services/stigosanas-pakalpojumi</loc>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <!-- Dynamic blog posts -->
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>https://amforest.lv/blog/${post.slug.current}</loc>
           <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Fetch all blog posts
  const posts = await client.fetch(groq`
    *[_type == "post"] | order(publishedAt desc) {
      slug,
      publishedAt
    }
  `);

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // Write the sitemap to the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;