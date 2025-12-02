import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// ---------- 型定義 ----------
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

// ---------- コンポーネント ----------
export default function AuthorProfile({ author }: { author?: Author }) {
  if (!author) return null;

  return (
    <div className="mt-16 p-6 bg-white rounded-3xl shadow-md max-w-4xl w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-start gap-6">

        {/* 左：プロフィール */}
        <div className="flex items-start gap-4 md:w-1/2">
          {author.image && (
            <Image
              src={urlFor(author.image).width(120).height(120).url()}
              alt={author.name ?? "author"}
              width={80}
              height={80}
              className="rounded-full border"
            />
          )}

          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {author.name}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              {author.role || "KOBITO BASE 運営"}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {author.bio || "プロフィールが登録されていません。"}
            </p>
          </div>
        </div>

        {/* 右：SNS */}
        <div className="md:w-1/2 flex flex-col gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:pl-6">

          {author.xUrl && (
            <a
              href={author.xUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-blue-600 font-bold text-xl hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.146 2H21.5l-7.42 8.49L23 22h-6.94l-5.39-7.23L3.9 22H.5l7.99-9.16L1 2h7l4.73 6.29L18.146 2z" />
              </svg>
              X（旧Twitter）
            </a>
          )}

          {author.youtubeUrl && (
            <a
              href={author.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-red-600 font-bold text-xl hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7L15.5 12l-5.75 3.5z" />
              </svg>
              YouTube チャンネル
            </a>
          )}

        </div>
      </div>
    </div>
  );
}
