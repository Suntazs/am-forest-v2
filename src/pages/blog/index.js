import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import { postsQuery } from '@/lib/sanity.queries';

export default function BlogIndex({ posts }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const gridRef = useRef(null);
  const animationTimeouts = useRef([]);

  const handleMouseEnter = (index) => {
    if (!animationComplete) return;
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!animationComplete) return;
    setIsHovering(false);
    setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
  };

  const getGridPosition = (index) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cols = isMobile ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    const totalRows = Math.ceil(posts.length / cols);
    const rowHeight = 100 / totalRows;
    
    return {
      left: `${(index % cols) * (100 / cols)}%`,
      top: `${Math.floor(index / cols) * rowHeight}%`,
      width: `${100 / cols}%`,
      height: `${rowHeight}%`,
    };
  };

  // Intersection Observer for triggering overlay animations
  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);
            
            // Wait a tick to ensure DOM is ready
            setTimeout(() => {
              // Get all overlay elements directly
              const overlays = gridRef.current?.querySelectorAll('[data-overlay-index]');
              
              if (overlays && overlays.length > 0) {
                // Create array of overlay elements with their indices
                const overlayArray = Array.from(overlays);
                const shuffled = [...overlayArray].sort(() => Math.random() - 0.5);
                
                // Animate each overlay with delay
                shuffled.forEach((overlay, order) => {
                  const delay = order * 150; // 150ms between each animation
                  const timeout = setTimeout(() => {
                    overlay.style.opacity = '0';
                    
                    // Check if this is the last overlay
                    if (order === shuffled.length - 1) {
                      // Add extra delay for the fade transition to complete (0.6s from CSS)
                      setTimeout(() => {
                        setAnimationComplete(true);
                      }, 600);
                    }
                  }, delay);
                  animationTimeouts.current.push(timeout);
                });
              }
            }, 100); // Small delay to ensure DOM is ready
          }
        });
      },
      {
        threshold: 0.05, // Trigger when 5% of the section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(gridRef.current);

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
      // Clear all animation timeouts
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current = [];
    };
  }, [animationStarted]);

  return (
    <>
      <Head>
        <title>Blogs | AM Forest - Mežsaimniecības ziņas un padomi</title>
        <meta name="description" content="AM Forest blogs - jaunākās ziņas un padomi par mežsaimniecību, kokmateriāliem un ilgtspējīgu meža apsaimniekošanu Latvijā. Uzziniet vairāk par meža nozari." />
        <link rel="canonical" href="https://amforest.lv/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AM Forest Blogs - Mežsaimniecības ziņas un padomi" />
        <meta property="og:description" content="Jaunākās ziņas un padomi par mežsaimniecību, kokmateriāliem un ilgtspējīgu meža apsaimniekošanu Latvijā." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amforest.lv/blog" />
        <meta property="og:site_name" content="AM Forest" />
        <meta property="og:locale" content="lv_LV" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AM Forest Blogs" />
        <meta name="twitter:description" content="Jaunākās ziņas un padomi par mežsaimniecību un ilgtspējīgu meža apsaimniekošanu." />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "AM Forest Blogs",
              "description": "Mežsaimniecības ziņas, padomi un ieskati",
              "url": "https://amforest.lv/blog",
              "publisher": {
                "@type": "Organization",
                "name": "AM Forest",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://amforest.lv/logo.png"
                }
              }
            })
          }}
        />
      </Head>

      <main className="relative overflow-hidden bg-[#faf6ed] min-h-screen">
        <div className="w-full py-16 md:py-24">
          {/* Header */}
          <header className="mt-30 px-6 md:px-12 lg:px-20 pb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-700 mb-6">
              AM Forest Blogs
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 opacity-80 max-w-3xl">
              Jaunākās ziņas, padomi un ieskati mežsaimniecības nozarē. 
              Uzziniet vairāk par ilgtspējīgu meža apsaimniekošanu un nozares tendencēm.
            </p>
          </header>

          {/* Blog posts grid */}
          {posts && posts.length > 0 ? (
            <div className="w-full md:px-12 lg:px-20 mt-16">
              <div 
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden"
                onMouseLeave={handleMouseLeave}
              >
                {/* Hover background - exactly like services */}
                {animationComplete && (
                  <div
                    className={`absolute pointer-events-none z-0 transition-all ease-out duration-300`}
                    style={{
                      ...getGridPosition(hoveredIndex !== null ? hoveredIndex : 0),
                      opacity: hoveredIndex !== null && isHovering ? 1 : 0
                    }}
                  >
                    <div className="w-full h-full bg-[#dbf6a3]" />
                  </div>
                )}
              
              {posts.map((post, index) => {
                // Calculate grid position for borders - same logic as services
                const cols = typeof window !== 'undefined' ? 
                  (window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3)) : 3;
                const totalRows = Math.ceil(posts.length / cols);
                const currentRow = Math.floor(index / cols);
                const currentCol = index % cols;
                const isLastRow = currentRow === totalRows - 1;
                const isLastCol = currentCol === cols - 1;
                
                return (
                  <article 
                    key={post._id}
                    className={`
                      relative overflow-hidden transition-all duration-300 group
                      ${!isLastRow ? 'border-b' : ''} 
                      ${!isLastCol ? 'border-r' : ''} 
                      border-[#243c36]
                    `}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="p-6 md:p-8 lg:p-10 z-10 h-full">
                        {/* Image */}
                        <div className="relative aspect-[16/9] -mx-6 md:-mx-8 lg:-mx-10 -mt-6 md:-mt-8 lg:-mt-10 mb-6">
                          {post.mainImage ? (
                            <Image
                              src={urlFor(post.mainImage).url()}
                              alt={post.mainImage.alt || post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-[#243c36] opacity-50">No image</span>
                            </div>
                          )}
                          
                          {/* Category tag - top right corner */}
                          {post.categories && post.categories.length > 0 && (
                            <div className="absolute top-0 right-0 bg-[#dbf6a3] px-4 py-2">
                              <span className="text-sm font-medium text-[#243c36]">
                                {post.categories[0].title}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-bold text-[#243c36] mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        
                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-[#243c36] opacity-80 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        
                        {/* Meta info */}
                        <div className="flex items-center justify-between text-sm text-[#243c36] opacity-60">
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('lv-LV', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                          
                          <span className="text-2xl md:text-3xl text-[#243c36] opacity-50 hover:rotate-90 transition-transform duration-300 inline-block">
                            +
                          </span>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Overlay that starts visible and fades out */}
                    <div 
                      data-overlay-index={index}
                      className="absolute inset-0 bg-[#dbf6a3] pointer-events-none"
                      style={{ 
                        opacity: 1,
                        transition: 'opacity 0.6s ease-out',
                        zIndex: 20
                      }}
                    />
                  </article>
                );
              })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-[#243c36] opacity-70">
                Pašlaik nav pieejamu rakstu. Pārbaudiet vēlāk!
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(postsQuery);

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}