'use client';
import { platformsInfo } from '@/config/platforms';
import { PlatformEnum } from '@/types';
import React from 'react';

interface PlatformSelectorProps {
  value: PlatformEnum;
  onChange?: (value: PlatformEnum) => void;
}
export default function PlatformSelector(props: PlatformSelectorProps) {
  const { value, onChange } = props;

  return (
    <div className="flex flex-col gap-2">
      {platformsInfo.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onChange?.(platform.id)}
          className={`
            px-4 py-2 rounded-md transition-all duration-300
            ${
              value === platform.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }
          `}
        >
          {platform.name}
        </button>
      ))}
    </div>
  );
}
