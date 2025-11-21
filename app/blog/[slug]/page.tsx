import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface Post {
  title: string;
  slug: { current: string };
  mainImage?: any;
  body: any;
  publishedAt?: string;
  author?: {
    name?: string;
    image?: any;
    role?: string;
    bio?: string;
    xUrl?: string;
    youtubeUrl?: string;
  };
}

// -----------------------------------
// 🔥 YouTube ＆ Twitter 対応 PortableText Renderer
// -----------------------------------
const portableTextComponents = {
  types: {
    // YouTube embed
    youtube: ({ value }: any) => {
      const url = value?.url;
      if (!url) return null;

      let embedUrl = url;

      if (url.includes("youtu.be")) {
        embedUrl = url.replace("youtu.be/", "www.youtube.com/embed/");
      }
      if (url.includes("watch?v=")) {
        embedUrl = url.replace("watch?v=", "embed/");
      }

      return (
        <div className="my-10 flex justify-center">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            className="rounded-xl shadow-lg max-w-3xl"
            allowFullScreen
          />
        </div>
      );
    },

    // Twitter embed 🔥
    twitter: ({ value }: any) => {
      const url = value?.url;
      if (!url) return null;

      return (
        <div className="my-8">
          <blockquote className="twitter-tweet">
            <a href={url}></a>
          </blockquote>

          {/* Twitter公式ウィジェット読み込み */}
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
      );
    },
  },

  block: {
    normal: ({ children }: any) => (
      <p className="text-base leading-relaxed my-4">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold my-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold my-3">{children}</h4>
    ),
  },
};

// -----------------------------------
// 記事取得
// -----------------------------------
async function getPost(slug: string) {
  if (!slug) return null;

  return await client.fetch(
    `
      *[_type == "post" && slug.current == $slug][0]{
        title,
        slug,
        mainImage,
        body,
        publishedAt,
        
        // 🔥 参照展開（これが超重要）
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
    { slug }
  );
}


// -----------------------------------
// ページ本体
// -----------------------------------
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return <p>記事が見つかりませんでした。</p>;

  const post = await getPost(slug);
  if (!post) return <p>記事が見つかりませんでした。</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 leading-relaxed text-gray-800">
     {/* パンくずリスト */}
<nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1">
  <a href="/" className="hover:underline">🏡 ホーム</a>
  <span>&gt;</span>

  <a href="/blog" className="hover:underline">📝 ブログ</a>
  <span>&gt;</span>

  {post.category?.slug === "robot" ? (
  <>
    <a href="/kobitolab" className="hover:underline">🤖 ロボット相撲</a>
    <span>&gt;</span>
  </>
) : post.category?.slug === "other" ? (
  <>
    <a href="/blog" className="hover:underline">📁 その他</a>
    <span>&gt;</span>
  </>
) : (
  <>
    <a href="/niwa" className="hover:underline">🌿 ガーデニング</a>
    <span>&gt;</span>
  </>
)}


  {/* 現在ページ */}
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

      {/* 本文（YouTube対応） */}
      <article className="prose prose-lg prose-neutral max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </article>

      {/* 区切り */}
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
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full border"
                />
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {post.author.name}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {post.author.role || "KOBITO LAB 運営"}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.author.bio || "プロフィールが登録されていません。"}
                </p>
              </div>
            </div>

            {/* 右：SNS */}
<div className="md:w-1/2 flex flex-col gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:pl-6">

  {post.author?.xUrl && (
    <a
      href={post.author.xUrl}
      target="_blank"
      className="flex items-center gap-3 text-blue-600 font-bold text-xl hover:underline"
    >
      {/* Xアイコン */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.146 2H21.5l-7.42 8.49L23 22h-6.94l-5.39-7.23L3.9 22H.5l7.99-9.16L1 2h7l4.73 6.29L18.146 2z" />
      </svg>

      X（旧Twitter）
    </a>
  )}

  {post.author?.youtubeUrl && (
    <a
      href={post.author.youtubeUrl}
      target="_blank"
      className="flex items-center gap-3 text-red-600 font-bold text-xl hover:underline"
    >
      {/* YouTubeアイコン */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7L15.5 12l-5.75 3.5z"/>
      </svg>

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
