import { unstable_cache } from 'next/cache';

import { TrendItem } from '@/types';

export abstract class HotService {
  public cachedAt: string = '';
  private static instance: HotService;

  /**
   * 子类必须实现的属性，用于指定 API 地址
   */
  protected abstract apiUrl: string;

  /**
   * 子类必须实现的方法，用于转换数据为 TrendItem 数组
   * @param data 从 API 获取的数据
   * @returns Promise<TrendItem[]> 转换后的 TrendItem 数组
   */
  protected abstract transformData(data: any): Promise<TrendItem[]>;

  static getInstance<T extends HotService>(this: new () => T): T {
    // @ts-ignore
    if (!this.instance) {
      // @ts-ignore
      this.instance = new this();
    }
    // @ts-ignore
    return this.instance as T;
  }

  async getCachedData() {
    return unstable_cache(
      async () => {
        const res = await fetch(this.apiUrl);
        const data = await res.json();

        return { data, cachedAt: new Date().toISOString() };
      },
      [`${this.constructor.name.toLowerCase()}-data`],
      { revalidate: 300 },
    )();
  }

  async fetchHotList(): Promise<{ hotList: TrendItem[]; cachedAt: string }> {
    const { data, cachedAt } = await this.getCachedData();

    this.cachedAt = cachedAt;
    const hotList = await this.transformData(data);

    return { hotList, cachedAt: this.cachedAt };
  }
}
