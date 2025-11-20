import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// 全記事を取得（カテゴリ参照展開）
async function getAllPosts() {
  return await client.fetch(`
    *[_type == "post"]
      | order(_createdAt desc) {
        title,
        slug,
        mainImage,
        category->{
          title,
          "slug": slug.current
        }
      }
  `);
}


// カテゴリー表示用関数
function getCategoryLabel(category: any) {
  const slug = category?.slug?.current || category?.slug;

  switch (slug) {
    case "robot":
      return "🤖 ロボット相撲";
    case "other":
      return "📁 その他";
    case "garden":
    default:
      return "🌿 ガーデニング";
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen px-6 py-20 bg-[#f7f6f2] flex flex-col items-center">

      <h1 className="text-3xl font-bold text-[#4a6b34] mb-10">
        ブログ一覧
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">

        {posts.map((post: any) => (
          <div key={post.slug.current}>
            {/* DEBUG */}
    {(() => {
      console.log("DEBUG CATEGORY:", post.title, post.category);
      return null;
    })()}

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

                {/* カテゴリー表示 */}
                <p className="text-sm text-gray-500 mt-2">
                  {getCategoryLabel(post.category)}
                </p>
              </div>
            </Link>
          </div>
        ))}

      </div>

    </main>
  );
}
