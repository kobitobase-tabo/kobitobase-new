import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import LabVideoSlider from "../components/LabVideoSlider";

export const revalidate = 60;

// ---------- 型定義 ----------

interface SanityImage {
  [key: string]: unknown;
}

interface Category {
  title?: string;
  slug?: string;
}

interface Post {
  title: string;
  slug: { current: string };
  mainImage?: SanityImage | null;
  category?: Category;
}

// ---------- データ取得 ----------

async function getRobotPosts(): Promise<Post[]> {
  return await client.fetch(
    `
    *[_type == "post" && category->slug.current == "robot"]
      | order(_createdAt desc) {
        title,
        slug,
        mainImage,
        category->{
          title,
          "slug": slug.current
        }
      }
  `
  );
}

// ---------- ページ本体 ----------

export default async function KobitoLabPage() {
  const posts = await getRobotPosts();

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center bg-[#f7f6f2]">

      {/* ロゴ */}
      <Image
        src="/kobitolab_logo.png"
        alt="KOBITO LAB ロゴ"
        width={400}
        height={400}
        className="mb-8 opacity-95"
        priority
      />

      {/* キャッチコピー */}
      <p className="text-center text-gray-700 text-xl md:text-2xl leading-relaxed font-light mb-10">
        ロボット相撲の制作と、挑戦の記録。
      </p>

      {/* 説明文 */}
      <p className="text-gray-600 text-center max-w-2xl text-base md:text-lg leading-relaxed mb-20">
        ロボット相撲の制作過程、技術的な工夫、大会レポートなどをまとめています。<br />
        KOBITO LAB の活動ログをお楽しみください。
      </p>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">

        {posts.map((post) => (
          <Link
            key={post.slug.current}
            href={`/blog/${post.slug.current}`}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group"
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
              <h4 className="text-xl font-semibold text-[#4a6b34] leading-snug">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}

      </div>

      {/* 動画スライダー */}
      <LabVideoSlider />

      {/* ロボット紹介セクション */}
      <section className="w-full max-w-5xl mt-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#4a6b34] mb-10">
          🤖 ロボット紹介
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ロボット i */}
          <Link
            href="/kobitolab/robot/i"
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition block overflow-hidden"
          >
            <img
              src="/robots/i.jpg"
              alt="ロボット i"
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#4a6b34] mb-3">
                しこ名：i（アイ）
              </h3>

              <p className="text-gray-600 leading-relaxed">
                KOBITO LABの初号機（2025年）。<br />
                Ikedo Mini Sumo Robot V2をベースに、3Dプリンターで各パーツを改良。
                タイヤはシリコーンゴムで自作。<br />
              </p>
            </div>
          </Link>

        </div>
      </section>

    </main>
  );
}
