import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "./components/Footer";

export const revalidate = 60;

// 型定義
interface Post {
  title: string;
  slug: { current: string };
  mainImage?: any;
}

// 最新3件取得
async function getLatestPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(_createdAt desc)[0...3]{
      title,
      slug,
      mainImage
    }
  `);
}

export default async function Home() {
  const posts: Post[] = await getLatestPosts();

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center bg-[#f7f6f2]">

      {/* ロゴ（大きめ） */}
      <Image
        src="/kobitobase_logo.png"
        alt="KOBITO BASE ロゴ"
        width={480}
        height={480}
        className="mb-8 opacity-95"
        priority
      />

      {/* キャッチコピー（大きめ） */}
      <p className="text-center text-gray-700 text-2xl md:text-3xl leading-relaxed font-light mb-20">
        小さな庭と、小さなロボットで。<br />
        日々をちょっと、おもしろく。
      </p>

      {/* 2つの入り口（サイズ大きめ） */}
      <div className="flex flex-col md:flex-row gap-12 mb-24">

        {/* こびとのにわ */}
        <Link
          href="/niwa"
          className="group block bg-white border border-[#dfe8db] rounded-3xl shadow-md p-10 w-80 hover:shadow-xl transition flex flex-col items-center"
        >
          <Image
            src="/kobitononiwa_logo.png"
            alt="こびとのにわ"
            width={240}
            height={240}
            className="mb-6 group-hover:scale-105 transition duration-300"
          />
          <p className="text-base text-gray-600 text-center leading-relaxed">
            ガーデニングと暮らしの<br />
            ちいさなアイデア。
          </p>
        </Link>

        {/* KOBITO LAB */}
        <Link
          href="/kobitolab"
          className="group block bg-white border border-[#dfe8db] rounded-3xl shadow-md p-10 w-80 hover:shadow-xl transition flex flex-col items-center"
        >
          <Image
            src="/kobitolab_logo.png"
            alt="KOBITO LAB"
            width={240}
            height={240}
            className="mb-6 group-hover:scale-105 transition duration-300"
          />
          <p className="text-base text-gray-600 text-center leading-relaxed">
            ロボット相撲の制作と<br />
            ゆるい活動記録。
          </p>
        </Link>

      </div>

      {/* 最近のブログ */}
      <h3 className="text-2xl font-bold text-[#4a6b34] mb-8">最近のブログ</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full px-4">

        {posts.map((post: Post) => (
          <Link
            key={post.slug.current}
            href={`/blog/${post.slug.current}`}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover group-hover:scale-[1.03] transition duration-300"
              />
            )}
            <div className="p-5">
              <h4 className="text-lg font-semibold text-[#4a6b34] leading-snug">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
