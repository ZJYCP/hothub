'use client';

import useRouter from '@/lib/useRouter';

export default function HeaderCom() {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold mb-8">OpenAPI </h1>
      <span
        className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
        onClick={() => {
          router.push('/openapi/docs');
        }}
      >
        文档
      </span>
    </div>
  );
}
