import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-gray-600">
      <hr className="border-gray-300 mb-6" />

      {/* サイト内リンクボタン一覧 */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-6 px-4">
        <Link
          href="/"
          className="bg-[#d9e8d2] text-[#3f5f35] py-2 px-5 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          🏡 ホーム
        </Link>

        <Link
          href="/niwa"
          className="bg-[#d9e8d2] text-[#3f5f35] py-2 px-5 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          🌿 こびとのにわ
        </Link>

        <Link
          href="/kobitolab"
          className="bg-[#d9e8d2] text-[#3f5f35] py-2 px-5 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          🤖 KOBITO LAB
        </Link>

        <Link
          href="/blog"
          className="bg-[#d9e8d2] text-[#3f5f35] py-2 px-5 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          📝 ブログ一覧
        </Link>

        <Link
          href="/privacy-policy"
          className="bg-[#d9e8d2] text-[#3f5f35] py-2 px-5 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          🔒 プライバシーポリシー
        </Link>
      </div>

      
      <p className="text-sm text-gray-600">
        © 2025 KOBITO BASE / こびとのにわ & KOBITO LAB
      </p>
    </footer>
  );
}
