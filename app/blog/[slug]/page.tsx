import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// ===============================
// 型定義
// ===============================
interface SanityImage {
  [key: string]: unknown;
}

interface Author {
  name?: string;
  image?: SanityImage | null;
  role?: string;
  bio?: string;
  xUrl?: string;
  youtubeUrl?: string;
}

interface Category {
  title?: string;
  slug?: string;
}

interface Post {
  title: string;
  slug: { current: string };
  mainImage?: SanityImage | null;
  body: PortableTextBlock[];
  publishedAt?: string;
  category?: Category | null;
  author?: Author | null;
}

// ===============================
// PortableText renderer
// ===============================
const portableTextComponents: PortableTextComponents = {
  types: {
    youtube: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null;

      let embedUrl = value.url;
      if (embedUrl.includes("youtu.be")) {
        embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
      }
      if (embedUrl.includes("watch?v=")) {
        embedUrl = embedUrl.replace("watch?v=", "embed/");
      }

      return (
        <div className="my-10 flex justify-center">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            className="rounded-xl shadow-lg max-w-3xl"
            allowFullScreen
          ></iframe>
        </div>
      );
    },

    twitter: ({ value }: { value: { url?: string } }) => {
      if (!value?.url) return null;

      return (
        <div className="my-8">
          <blockquote className="twitter-tweet">
            <a href={value.url}></a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
      );
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed my-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold my-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold my-3">{children}</h4>
    ),
  },
};

// ===============================
// 記事取得
// ===============================
async function getPost(slug: string): Promise<Post | null> {
  return await client.fetch(
    `
      *[_type == "post" && slug.current == $slug][0]{
        title,
        slug,
        mainImage,
        body,
        publishedAt,

        category->{
          title,
          "slug": slug.current
        },

        author->{
          name,
          role,
          bio,
          image,
          xUrl,
          youtubeUrl
        }
      }
    `,
    { slug: slug }
  );
}

// ===============================
// ページ（Next.js 正しい形式）
// ===============================
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;  // ← Promise を await する！！

  console.log("DEBUG slug:", slug);

  const post = await getPost(slug);

  if (!post) {
    return <p className="p-10">記事が見つかりませんでした。</p>;
  }
  
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 leading-relaxed text-gray-800">
      {/* パンくず */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:underline">
          🏡 ホーム
        </Link>
        <span>&gt;</span>

        <Link href="/blog" className="hover:underline">
          📝 ブログ
        </Link>
        <span>&gt;</span>

        {post.category?.slug === "robot" ? (
          <>
            <Link href="/kobitolab" className="hover:underline">
              🤖 ロボット相撲
            </Link>
            <span>&gt;</span>
          </>
        ) : post.category?.slug === "other" ? (
          <>
            <Link href="/blog" className="hover:underline">
              📁 その他
            </Link>
            <span>&gt;</span>
          </>
        ) : (
          <>
            <Link href="/niwa" className="hover:underline">
              🌿 ガーデニング
            </Link>
            <span>&gt;</span>
          </>
        )}

        <span className="text-gray-700 font-medium">{post.title}</span>
      </nav>

      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      {/* 日付 */}
      {post.publishedAt && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
        </p>
      )}

      {/* アイキャッチ */}
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(1000).url()}
          alt={post.title}
          width={1000}
          height={600}
          className="rounded-xl mb-10"
        />
      )}

      {/* 本文 */}
      <article className="prose prose-lg prose-neutral max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </article>

      <hr className="my-12" />

      {/* 著者プロフィール */}
      {post.author && (
        <div className="mt-16 p-6 bg-white rounded-3xl shadow-md max-w-4xl w-full">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* 左：プロフィール */}
            <div className="flex items-start gap-4 md:w-1/2">
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(120).height(120).url()}
                  alt={post.author.name ?? ""}
                  width={80}
                  height={80}
                  className="rounded-full border"
                />
              )}

              <div>
                <h3 className="text-lg font-bold">{post.author.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {post.author.role ?? "KOBITO LAB 運営"}
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {post.author.bio ?? "プロフィールが登録されていません。"}
                </p>
              </div>
            </div>

            {/* 右：SNS */}
            <div className="md:w-1/2 flex flex-col gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:pl-6">
              {post.author.xUrl && (
                <a
                  href={post.author.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-blue-600 font-bold text-xl hover:underline"
                >
                  X（旧Twitter）
                </a>
              )}

              {post.author.youtubeUrl && (
                <a
                  href={post.author.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-red-600 font-bold text-xl hover:underline"
                >
                  YouTube チャンネル
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
