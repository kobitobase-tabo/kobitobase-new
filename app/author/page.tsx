import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// GROQ：slugに一致する著者を1件取得
async function getAuthor(slug: string) {
  return client.fetch(
    `
    *[_type == "author" && slug.current == $slug][0]{
      name,
      bio,
      image,
      "posts": *[_type == "post" && author._ref == ^._id]{
        title,
        slug,
        mainImage
      }
    }
  `,
    { slug }
  );
}

export default async function AuthorPage({
  params,
}: {
  params: { slug: string };
}) {
  const author = await getAuthor(params.slug);

  if (!author) {
    return <p>著者が見つかりません。</p>;
  }

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center bg-[#f7f6f2]">
      {/* プロフィール画像 */}
      {author.image && (
        <Image
          src={urlFor(author.image).width(200).height(200).url()}
          alt={author.name}
          width={200}
          height={200}
          className="rounded-full shadow mb-6"
        />
      )}

      {/* 名前 */}
      <h1 className="text-3xl font-bold text-[#4a6b34] mb-4">
        {author.name}
      </h1>

      {/* bio */}
      {author.bio && (
        <p className="text-gray-700 max-w-xl text-center leading-relaxed mb-10">
          {author.bio}
        </p>
      )}

      {/* 著者の記事一覧 */}
      <h2 className="text-2xl font-semibold text-[#4a6b34] mb-6">
        {author.name} の記事一覧
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        {author.posts.map((post: any) => (
          <Link
            key={post.slug.current}
            href={`/blog/${post.slug.current}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).width(600).height(400).url()}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="text-lg font-semibold text-[#4a6b34]">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
