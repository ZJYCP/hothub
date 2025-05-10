import { OpenApiDocs } from '@/components/OpenApiDocs';

export default function OpenApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">OpenAPI 文档</h1>
      <OpenApiDocs />
    </div>
  );
}
