import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1>{children}</h1>,
    img: (props) => (
      <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />
    ),
    ...components,
  };
}
