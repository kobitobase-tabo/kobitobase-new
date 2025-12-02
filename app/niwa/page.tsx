import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import GardenVideoSlider from "../components/GardenVideoSlider";

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
async function getGardenPosts(): Promise<Post[]> {
  return await client.fetch(
    `
    *[_type == "post" && category->slug.current == "garden"]
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
export default async function NiwaPage() {
  const posts = await getGardenPosts();

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center bg-[#f7f6f2]">

      {/* ロゴ */}
      <Image
        src="/kobitononiwa_logo.png"
        alt="こびとのにわ ロゴ"
        width={400}
        height={400}
        className="mb-6 opacity-95"
        priority
      />

      {/* キャッチコピー */}
      <p className="text-center text-gray-700 text-xl md:text-2xl leading-relaxed font-light mb-8">
        小さな庭を、もっと楽しく。
      </p>

      {/* 説明文 */}
      <p className="text-gray-600 text-center max-w-2xl leading-relaxed mb-16">
        こびとのにわでは、植物との暮らしを中心に、<br />
        日々のちょっとした工夫や気づきを発信しています。<br />
        初心者でも楽しめるガーデニングのコツや、季節ごとの庭の変化など、<br />
        ゆっくり楽しんでいただける内容をお届けします。
      </p>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {posts.map((post) => (
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
                className="w-full h-60 object-cover group-hover:scale-[1.03] transition duration-300"
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

      {/* 動画スライダー */}
      <GardenVideoSlider />
    </main>
  );
}
