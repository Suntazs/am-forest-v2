import { groq } from 'next-sanity'

// Get all posts for the blog index page
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      name,
      slug
    },
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    excerpt,
    readTime
  }
`

// Get a single post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      name,
      image,
      bio,
      slug
    },
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    excerpt,
    body,
    readTime
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && references(*[_type=="category" && slug.current == $slug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      name,
      slug
    },
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    excerpt,
    readTime
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

// Get latest posts (for homepage or sidebar)
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    excerpt
  }
`