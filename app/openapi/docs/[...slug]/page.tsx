export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { default: MdxCom } = await import(`@/docs/openapi/${slug.join('/')}.mdx`);

  return <MdxCom></MdxCom>;
}
