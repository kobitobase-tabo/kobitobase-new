import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "KOBITO BASE",
  description: "小さな庭と小さなロボットで日々をちょっと、おもしろく。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="google-site-verification"
          content="JUuBdnvnp-WSBd-6UIhXabISme9wkliyjoLvKNYigiw"
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
