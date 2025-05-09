'use client';
import { Bar } from '@ant-design/plots';

interface EmotionAnalyseProps {
  data: {
    val: number;
    name: string;
  }[];
}
export default function EmotionAnalyse(props: EmotionAnalyseProps) {
  const { data } = props;
  const config = {
    data,
    xField: 'name',
    yField: 'val',
    colorField: 'name',
    color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A'],
    height: 300,
    barWidthRatio: 0.5,
    sort: {
      reverse: true,
    },
    label: {
      text: 'val',
      formatter: (val: number) => `${val}%`,
    },
    axis: {
      y: {
        labelFormatter: (val: number) => `${val}%`,
      },
    },
  };
  return <Bar {...config} />;
}
