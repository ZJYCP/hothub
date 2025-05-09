'use client';
import { WordCloud } from '@ant-design/plots';

interface WordCloudProps {
  data: {
    value: number;
    text?: string;
    name: string;
  }[];
}
export default function WordCloudCom(props: WordCloudProps) {
  const { data } = props;
  const config = {
    paddingTop: 40,
    data,
    layout: { spiral: 'rectangular' },
    colorField: 'text',
  };
  return <WordCloud {...config} />;
}
