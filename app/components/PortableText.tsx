import {PortableText, PortableTextComponents} from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="text-base leading-relaxed my-3">{children}</p>
    ),

    h1: ({children}) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),

    h2: ({children}) => (
      <h2 className="text-3xl font-semibold my-5">{children}</h2>
    ),

    h3: ({children}) => (
      <h3 className="text-2xl font-semibold my-4">{children}</h3>
    ),

    h4: ({children}) => (
      <h4 className="text-xl font-semibold my-3">{children}</h4>
    ),
  },
};

export default function MyPortableText({value}: {value: any}) {
  return <PortableText value={value} components={components} />;
}
