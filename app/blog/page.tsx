"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// ===============================
// 🔧 型定義
// ===============================
interface Category {
  title?: string;
  slug?: {
    current?: string;
  } | null;
}

interface Post {
  title: string;
  slug: { current: string };
  mainImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
  } | null;
  category?: Category | null;
}

// ------------------------------
//  全記事取得
// ------------------------------
async function getAllPosts(): Promise<Post[]> {
  return await client.fetch(`
    *[_type == "post"]
      | order(_createdAt desc) {
        title,
        slug,
        mainImage,
        category->{
          title,
          slug
        }
      }
  `);
}

export default function BlogPageWrapper() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getAllPosts().then((res) => setPosts(res));
  }, []);

  if (!posts) {
    return (
      <main className="min-h-screen px-6 py-20 flex flex-col items-center">
        <p className="text-gray-500">読み込み中...</p>
      </main>
    );
  }

  return <BlogPage posts={posts} />;
}

// ------------------------------
//  表示 UI
// ------------------------------
function BlogPage({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<"all" | "garden" | "robot" | "other">(
    "all"
  );

  // 🚀 category.slug.current を使ってフィルタ！
  const filteredPosts = posts.filter((post) => {
    if (category === "all") return true;
    return post.category?.slug?.current === category;
  });

  return (
    <main className="min-h-screen px-6 py-20 bg-[#f7f6f2] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#4a6b34] mb-8">ブログ一覧</h1>

      {/* カテゴリ切替ボタン */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center">
        <button
          onClick={() => setCategory("all")}
          className={`px-4 py-2 rounded-full border transition ${
            category === "all"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700"
          }`}
        >
          🔄 すべて
        </button>

        <button
          onClick={() => setCategory("garden")}
          className={`px-4 py-2 rounded-full border transition ${
            category === "garden"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700"
          }`}
        >
          🌿 にわ
        </button>

        <button
          onClick={() => setCategory("robot")}
          className={`px-4 py-2 rounded-full border transition ${
            category === "robot"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700"
          }`}
        >
          🤖 LAB
        </button>

        <button
          onClick={() => setCategory("other")}
          className={`px-4 py-2 rounded-full border transition ${
            category === "other"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700"
          }`}
        >
          📁 その他
        </button>
      </div>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
        {filteredPosts.map((post) => (
          <div key={post.slug.current}>
            <Link
              href={`/blog/${post.slug.current}`}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group block"
            >
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(700).height(460).url()}
                  alt={post.title}
                  width={700}
                  height={460}
                  className="w-full h-64 object-cover group-hover:scale-[1.03] transition duration-300"
                />
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#4a6b34] leading-snug">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {post.category?.slug?.current === "robot"
                    ? "🤖 ロボット相撲"
                    : post.category?.slug?.current === "garden"
                    ? "🌿 ガーデニング"
                    : post.category?.slug?.current === "other"
                    ? "📁 その他"
                    : "📄 未分類"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
