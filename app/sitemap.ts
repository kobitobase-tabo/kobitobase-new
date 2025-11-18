import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";

// Sanityから全ブログ記事を取得
async function getBlogPosts() {
  return await client.fetch(`
    *[_type == "post"]{
      "slug": slug.current,
      _updatedAt,
      category
    }
  `);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kobitobase.com"; // ← KOBITO BASE のURL

  // --- 固定ページ ---
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/niwa`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // --- Sanityのブログ記事（全て） ---
  const posts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
