"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f9fff7] flex flex-col items-center px-4 py-12 text-left">
      <div className="max-w-3xl w-full bg-white shadow p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-[#4a6b34] mb-6 text-center">
          プライバシーポリシー
        </h1>

        <p className="mb-6 text-gray-700 leading-relaxed">
          KOBITO BASE（以下、「当サイト」）では、お客様の個人情報を適切に保護し、
          安心してご利用いただくために、以下の通りプライバシーポリシーを定めます。
        </p>

        <h2 className="text-xl font-semibold text-[#4a6b34] mt-6 mb-3">
          個人情報の利用目的
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトでは、お問い合わせやコメント時にお名前・メールアドレス等の情報を
          お預かりする場合があります。取得した情報は、返答や必要な連絡のみに使用し、
          その他の目的には利用しません。
        </p>

        <h2 className="text-xl font-semibold text-[#4a6b34] mt-6 mb-3">
          アクセス解析ツールについて
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトでは Google によるアクセス解析ツール「Google Analytics」を使用しています。
          Google Analytics はデータ収集のために Cookie を使用し、匿名でトラフィックデータを収集します。
          このデータは個人を特定するものではありません。
        </p>

        <h2 className="text-xl font-semibold text-[#4a6b34] mt-6 mb-3">
          広告について（Google AdSense）
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトでは第三者配信の広告サービス「Google AdSense」を利用しています。
          広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。
        </p>

        <h2 className="text-xl font-semibold text-[#4a6b34] mt-6 mb-3">
          アフィリエイトリンクについて
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトは A8.net、Amazonアソシエイト、楽天アフィリエイトなどの
          アフィリエイトプログラムに参加しています。
          当サイトのリンクから商品を購入された場合、紹介料が発生する場合があります。
          追加の費用は発生しません。
        </p>

        <h2 className="text-xl font-semibold text-[#4a6b34] mt-6 mb-3">
          免責事項
        </h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトに掲載している情報は、可能な限り正確で最新の内容を提供するよう努めていますが、
          その正確性・安全性・有効性を保証するものではありません。
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          特に、植物の栽培やガーデニング・技術記事の内容については、地域の気候や環境、
          個々の管理方法等によって結果が大きく異なります。
          当サイトの内容を参考にして生じた損害（植物の枯死・機材の破損・トラブル等）について、
          当サイト運営者は一切の責任を負いかねます。
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          また、ロボット制作や技術的作業に関する記事の内容を参考にした結果発生した
          トラブル・怪我・機材の故障などについても、当サイト運営者は責任を負いません。
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          当サイトの情報は予告なく変更・削除される場合があります。
        </p>

        <p className="mt-10 text-sm text-gray-600 text-center">
          制定：2025年11月
        </p>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block bg-[#8b7355] text-white py-2 px-6 rounded-lg shadow hover:opacity-90 transition"
      >
        ← KOBITO BASEに戻る
      </Link>
    </div>
  );
}
