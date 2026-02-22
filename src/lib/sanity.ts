import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// GROQ queries
export const PROJECTS_QUERY = `*[_type == "project"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  problem,
  approach,
  outcome,
  metrics,
  stack,
  tags,
  featured,
  "mediaUrl": media.asset->url,
  liveUrl,
  githubUrl
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  problem,
  approach,
  outcome,
  metrics,
  stack,
  tags,
  featured,
  "mediaUrl": media.asset->url,
  liveUrl,
  githubUrl
}`;

export const TEMPLATES_QUERY = `*[_type == "template"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  stack,
  downloadUrl,
  githubUrl
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  author,
  role,
  company,
  content,
  "avatarUrl": avatar.asset->url
}`;
