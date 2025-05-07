import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { platformsInfo } from '@/config/platforms';
import { PlatformEnum } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 转换平台枚举值为平台名称
 * @param platform 平台枚举值
 * @returns 平台名称
 */
export function transformPlatformToLabel(platform?: PlatformEnum) {
  return platformsInfo?.find((item) => item.id === platform)?.name || platform;
}
