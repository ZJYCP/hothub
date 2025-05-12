'use client';
import React from 'react';

import { platformsInfo } from '@/config/platforms';
import { PlatformEnum } from '@/types';

interface PlatformSelectorProps {
  value: PlatformEnum;
  onChange?: (value: PlatformEnum) => void;
}
export default function PlatformSelector(props: PlatformSelectorProps) {
  const { value, onChange } = props;

  return (
    <div className="flex flex-col gap-2">
      {platformsInfo
        .filter((item) => item.enabled)
        .map((platform) => (
          <button
            key={platform.id}
            className={`
            px-4 py-2 rounded-md transition-all duration-300
            ${
              value === platform.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
            onClick={() => onChange?.(platform.id)}
          >
            {platform.name}
          </button>
        ))}
    </div>
  );
}
