import { PortableText, PortableTextComponents, PortableTextComponentProps } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// ---------- PortableText カスタムレンダラー ----------
const components: PortableTextComponents = {
  block: {
    normal: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-base leading-relaxed my-3">{props.children}</p>
    ),

    h1: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-6">{props.children}</h1>
    ),

    h2: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-semibold my-5">{props.children}</h2>
    ),

    h3: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-semibold my-4">{props.children}</h3>
    ),

    h4: (props: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="text-xl font-semibold my-3">{props.children}</h4>
    ),
  },
};

// ---------- コンポーネント本体 ----------
export default function MyPortableText({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}
