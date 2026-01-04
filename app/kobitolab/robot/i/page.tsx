"use client";

import Link from "next/link";

export default function RobotDetail() {
  return (
    <main className="flex flex-col items-center bg-[#f4f4f4] min-h-screen p-8">

      {/* パンくず */}
      <nav className="text-sm text-gray-500 mb-6 self-start">
        <Link href="/" className="hover:underline">🏡 ホーム</Link>
        <span className="mx-1">&gt;</span>
        <Link href="/kobitolab" className="hover:underline">🤖 KOBITO LAB</Link>
        <span className="mx-1">&gt;</span>
        <span className="text-[#4a6b34] font-medium">ロボット i</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#4a6b34] mb-6">
        しこ名「 i（アイ）」詳細データ
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <table className="w-full text-left border-collapse text-[#333] leading-relaxed">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold w-1/3 text-[#4a6b34]">NAME / 名</th>
              <td className="py-2 px-3 font-medium">i（アイ）</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">CATEGORY / 部門</th>
              <td className="py-2 px-3 font-medium">500g自立型</td>
            </tr>
            <tr className="border-b border-gray-200 align-top">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">DESCRIPTION / 詳細</th>
              <td className="py-2 px-3">
                Ikedo Mini Sumo Robot V2をベースに、3Dプリンターで各パーツを改良。<br />
                OLED搭載により、立ち合いパターンとバッテリー残量を可視化。<br />
                前方に着脱可能な「突っ張り棒」を装着し、押し勝つ仕様にも対応。
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Motors / モーター</th>
              <td className="py-2 px-3">NovaMax 400rpm ×2</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Opponent Sensors / 敵センサー</th>
              <td className="py-2 px-3">MAKER-OBJECT ×3（前・左斜め・右斜め）</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Line Sensors / ラインセンサー</th>
              <td className="py-2 px-3">MAKER-REFLECT ×2</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Main Board / メイン基板</th>
              <td className="py-2 px-3">MAKER-MSUMO</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Start Stop Module</th>
              <td className="py-2 px-3">IR Sumo Module</td>
            </tr>
            <tr>
              <th className="py-2 px-3 font-bold text-[#4a6b34]">Battery</th>
              <td className="py-2 px-3">Tattu 2S 550mAh 95C</td>
            </tr>
          </tbody>
        </table>
      </div>
           {/* 紹介動画 */}
      <section className="w-full max-w-2xl mt-12">
        <h2 className="text-xl font-bold text-[#4a6b34] mb-4">
          🎥 動画で見る「i」
        </h2>

        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-black">
          <div className="pt-[56.25%]" />
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://youtu.be/1IkFBIiDPOo"
            title="ロボット i 紹介動画"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
