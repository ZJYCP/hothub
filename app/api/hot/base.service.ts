import { unstable_cache } from 'next/cache';

import { PlatformEnum, TrendItem } from '@/types';
import * as lodash from 'lodash';
import prisma from '@/lib/prisma';
/**
 * 抽象类 HotService
 * 用于定义获取热门数据的通用方法
 */
export abstract class HotService {
  public cachedAt: string = '';
  private static instance: HotService;

  /**
   * 子类必须实现的属性，用于指定 API 地址
   */
  protected abstract apiUrl: string;

  protected abstract platform: PlatformEnum;

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
        const lastSyncAt = await prisma.syncTaskRecord.findUnique({
          where: {
            taskName: 'hotTrends',
          },
        });
        const data = await prisma.hotTrend.findMany({
          where: {
            source: this.platform,
          },
          orderBy: {
            rank: 'asc',
          },
        });
        const hotList = data.map((item, index) => {
          return {
            ...item,
            source: item.source as PlatformEnum,
            id: `${item.source}-${index.toString()}`,
          };
        });
        return { hotList, cachedAt: (lastSyncAt?.lastSyncAt ?? new Date()).toISOString() };
      },
      [`${this.constructor.name.toLowerCase()}-data`],
      { revalidate: 300 },
    )();
  }

  async fetchHotList(): Promise<{ hotList: TrendItem[]; cachedAt: string }> {
    const { hotList, cachedAt } = await this.getCachedData();

    this.cachedAt = cachedAt;

    return { hotList, cachedAt: this.cachedAt };
  }

  /**
   * 获取各个平台的数据，默认为url fetch， 可自定义覆写
   * @returns
   */
  protected async fetchData() {
    const res = await fetch(this.apiUrl);
    const data = await res.json();
    return data;
  }

  async syncHotTrends() {
    const data = await this.fetchData();
    const hotList = await this.transformData(data);

    try {
      const dataExist = await prisma.hotTrend.findMany({
        where: {
          source: this.platform,
        },
      });

      const newTitleList = hotList.map((item) => item.title);
      const existTitleList = dataExist.map((item) => item.title);
      // title 存在的话，就更新； 不存在的话，就创建； 没有了的就删除
      const updateTitleList = lodash.intersection(newTitleList, existTitleList);
      const createTitleList = lodash.difference(newTitleList, existTitleList);
      const deleteTitleList = lodash.difference(existTitleList, newTitleList);
      // 批量更新操作
      await prisma.$transaction([
        ...updateTitleList.map((title) => {
          const item = hotList.find((item) => item.title === title);
          return item
            ? prisma.hotTrend.update({
                where: { title_source: { title, source: this.platform } },
                data: lodash.omit(item, ['id']),
              })
            : prisma.hotTrend.findUnique({
                where: { title_source: { title, source: this.platform } },
              });
        }),
        // 批量创建操作
        ...createTitleList.map((title) => {
          const item = hotList.find((item) => item.title === title);
          return item
            ? prisma.hotTrend.create({
                data: lodash.omit(item, ['id']),
              })
            : prisma.hotTrend.findUnique({
                where: { title_source: { title, source: this.platform } },
              });
        }),
        // 批量删除操作
        ...deleteTitleList.map((title) =>
          prisma.hotTrend.delete({
            where: { title_source: { title, source: this.platform } },
          }),
        ),
      ]);
    } catch (error) {
      console.log('error', error);
    } finally {
      return { hotList, cachedAt: new Date().toISOString() };
    }
  }
}
