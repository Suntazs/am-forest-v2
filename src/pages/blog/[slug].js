import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import { postQuery, postsQuery } from '@/lib/sanity.queries';

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10 -mx-6 md:mx-0">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || ' '}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-[#243c36] opacity-70 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-6">
          <code className={`language-${value.language}`}>
            {value.code}
          </code>
        </pre>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#243c36] mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-[#243c36] mt-8 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-[#243c36] mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-[#243c36] opacity-90 mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#dbf6a3] pl-6 my-8 italic">
        <p className="text-lg md:text-xl text-[#243c36] opacity-90">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-[#243c36] opacity-90 mb-6 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-[#243c36] opacity-90 mb-6 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <del>{children}</del>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#243c36] underline hover:text-[#1a2b25] transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <main className="relative overflow-hidden bg-[#faf6ed] min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="text-center">
            <p className="text-lg text-[#243c36]">Ielādē...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="relative overflow-hidden bg-[#faf6ed] min-h-screen">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-4">
              Raksts nav atrasts
            </h1>
            <p className="text-lg text-[#243c36] opacity-80 mb-8">
              Diemžēl meklētais raksts nav pieejams.
            </p>
            <Link 
              href="/blog"
              className="inline-block px-6 py-3 bg-[#243c36] text-white rounded-md hover:bg-[#1a2b25] transition-colors"
            >
              Atgriezties uz bloga lapu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const seoTitle = `${post.title} | AM Forest Blog`;
  const seoDescription = post.excerpt || `Lasiet par ${post.title} AM Forest blogā. Uzziniet vairāk par mežsaimniecību un ilgtspējīgu meža apsaimniekošanu.`;
  const seoImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : null;
  const canonicalUrl = `https://amforest.lv/blog/${post.slug.current}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta property="og:site_name" content="AM Forest" />
        <meta property="og:locale" content="lv_LV" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        
        {/* Article metadata */}
        <meta property="article:published_time" content={post.publishedAt} />
        {post.author?.name && <meta property="article:author" content={post.author.name} />}
        {post.categories && post.categories.map((cat) => (
          <meta key={cat._id} property="article:tag" content={cat.title} />
        ))}
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": seoDescription,
              "image": seoImage,
              "datePublished": post.publishedAt,
              "dateModified": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.author?.name || "AM Forest"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AM Forest",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://amforest.lv/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              }
            })
          }}
        />
      </Head>

      <main className="relative overflow-hidden bg-[#faf6ed] min-h-screen">
        {/* Background pattern - optional */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23243c36' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <article className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-4xl relative z-10 mt-30">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#243c36] mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-sm md:text-base text-[#243c36] opacity-70 mb-8">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('lv-LV', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <span>{post.categories[0].title}</span>
                </>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>{post.author.name}</span>
                </>
              )}
            </div>

            {/* Main image */}
            {post.mainImage && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl -mx-6 md:mx-0">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Lead paragraph */}
            {post.excerpt && (
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-[#243c36] opacity-90 mb-8 font-medium">
                {post.excerpt}
              </p>
            )}

            {/* Render body content */}
            {post.body && (
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8">
            <div className="flex justify-center">
              <Link 
                href="/blog"
                className="inline-block px-6 py-3 bg-[#243c36] text-white rounded-md hover:bg-[#1a2b25] transition-colors"
              >
                Skatīt visus rakstus
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}

// Get static paths for all blog posts
export async function getStaticPaths() {
  const posts = await client.fetch(postsQuery);
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
}

// Get static props for each blog post
export async function getStaticProps({ params }) {
  const post = await client.fetch(postQuery, { slug: params.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}