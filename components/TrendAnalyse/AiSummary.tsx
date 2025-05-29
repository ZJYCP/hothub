'use client';
import { useCompletion } from '@ai-sdk/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo } from 'react';
import MarkdownRender from '../Markdown';
import prisma from '@/lib/prisma';

interface AiSummaryComProps {
  content?: string | null;
}
export default function AiSummaryCom(props: AiSummaryComProps) {
  const { content } = props;
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const platform = searchParams.get('platform');

  const { completion, input, setInput, handleSubmit } = useCompletion({
    api: '/api/ai/summary',
    body: { platform },
  });

  useEffect(() => {
    setInput(name || '');
  }, []);

  useEffect(() => {
    if (input && !content) {
      console.log('send request', input);
      handleSubmit();
    }
  }, [input]);

  const result = useMemo(() => {
    if (!content && !completion) return 'loading...';
    return content || completion;
  }, [content, completion]);

  return (
    <div className="border my-3 p-4 basis-[2/3] w-[70%]">
      <MarkdownRender content={result} />
    </div>
  );
}
