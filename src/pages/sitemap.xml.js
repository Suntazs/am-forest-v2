function generateSiteMap() {
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
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
