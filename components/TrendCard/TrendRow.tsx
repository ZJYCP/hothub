'use client';
import React from 'react';
import { useRouter } from 'nextjs-toploader/app';

import { TrendItem } from '@/types';

interface TrendRowProps {
  data: TrendItem;
}
export default function TrendRow(props: TrendRowProps & { platform?: string }) {
  const router = useRouter();
  const { data } = props;
  const heatPercentage = Math.min(100, (data.heat / 1000000) * 100);

  return (
    <div
      role="presentation"
      className="group flex items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
      onClick={() => {
        router.push(
          `/analyse?name=${encodeURIComponent(data.title)}&platform=${encodeURIComponent(data.source)}`,
        );
      }}
    >
      {data.rank !== undefined && (
        <span className="text-gray-500 font-medium w-6 text-center">{data.rank + 1}</span>
      )}
      <div className="flex-1 ml-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
            {data.title}
          </span>
          <span className="text-sm text-gray-500">{data.heat.toLocaleString()}</span>
        </div>
        <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
            style={{ width: `${heatPercentage}%` }}
          />
        </div>

        <div>详情</div>
      </div>
    </div>
  );
}
