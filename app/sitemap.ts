import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";

// ------ 型定義 ------
interface BlogPostForSitemap {
  slug: string;
  _updatedAt?: string; // ISO date string
  category?: unknown;  // category は sitemap では使わないので簡易でOK
}

// ------ Sanity から取得 ------
async function getBlogPosts(): Promise<BlogPostForSitemap[]> {
  return await client.fetch(
    `
    *[_type == "post"]{
      "slug": slug.current,
      _updatedAt,
      category
    }
  `
  );
}

// ------ サイトマップ生成 ------
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kobitobase.com";

  // 固定ページ
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

  // ブログ記事
  const posts = await getBlogPosts();

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

