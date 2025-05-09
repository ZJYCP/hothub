'use client';
import { Button } from '@heroui/react';
interface OperationsComProps {
  url?: string | null;
}
export default function OperationsCom(props: OperationsComProps) {
  const { url } = props;
  return (
    <div className="flex gap-4">
      <Button
        className="bg-gradient-to-tr from-cyan-500 to-teal-500 text-white shadow-lg"
        radius="full"
      >
        AI 创作
      </Button>
      <Button
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        radius="full"
        onPress={() => {
          if (url) {
            window.open(url, '_blank');
          }
        }}
      >
        访问源站
      </Button>
    </div>
  );
}
