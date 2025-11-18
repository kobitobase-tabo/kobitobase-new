import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// 型定義
interface Post {
  title: string;
  slug: { current: string };
  mainImage?: any;
  category?: string;
}

// othersカテゴリの記事を取得
async function getOtherPosts() {
  return await client.fetch(`
    *[_type == "post" && category == "others"] | order(_createdAt desc) {
      title,
      slug,
      mainImage,
      category
    }
  `);
}

export default async function OthersPage() {
  const posts: Post[] = await getOtherPosts();

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center bg-[#f7f6f2]">

      {/* ロゴ or アイコン（仮） */}
      <div className="w-40 h-40 mb-6 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
        🌱
      </div>

      {/* タイトル */}
      <h1 className="text-center text-gray-800 text-3xl font-bold mb-4">
        その他の記事
      </h1>

      {/* 説明文 */}
      <p className="text-gray-600 text-center max-w-2xl leading-relaxed mb-16">
        どのカテゴリーにも当てはまらない、気ままな雑記をまとめています。<br />
        日常の気づき、趣味の話題など、自由な記事の置き場所です。
      </p>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">

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

    </main>
  );
}
