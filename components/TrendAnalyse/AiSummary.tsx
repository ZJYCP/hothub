'use client';

import { useCompletion } from '@ai-sdk/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import MarkdownRender from '../Markdown';

export default function AiSummaryCom() {
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
    if (input) {
      handleSubmit();
    }
  }, [input]);

  return <MarkdownRender content={completion} />;
}
