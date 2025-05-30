import { unstable_cache } from 'next/cache';

import { PlatformEnum, TrendItem } from '@/types';
import * as lodash from 'lodash';
import prisma from '@/lib/prisma';
import { HotTrend } from '@prisma/client';

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
            taskName: this.platform,
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

  /**
   * 同步热门趋势数据
   * 优化版本：使用Map数据结构和批量操作API
   */
  async syncHotTrends() {
    try {
      // 1. 获取新数据
      const data = await this.fetchData();
      const newHotList = await this.transformData(data);

      // 2. 获取现有数据
      const existingItems = await prisma.hotTrend.findMany({
        where: { source: this.platform },
      });

      // 3. 使用Map优化数据查找
      const newItemsMap = new Map<string, TrendItem>();
      newHotList.forEach((item) => {
        newItemsMap.set(item.title, item);
      });

      const existingItemsMap = new Map<string, HotTrend>();
      existingItems.forEach((item) => {
        existingItemsMap.set(item.title, item);
      });

      // 4. 计算需要更新、创建和删除的数据
      const toUpdate: Array<{ title: string; item: any }> = [];
      const toCreate: Array<any> = [];
      const toDelete: string[] = [];

      // 找出需要更新或创建的项目
      newItemsMap.forEach((item, title) => {
        if (existingItemsMap.has(title)) {
          toUpdate.push({
            title,
            item: lodash.omit(item, ['id']),
          });
        } else {
          toCreate.push(lodash.omit(item, ['id']));
        }
      });

      // 找出需要删除的项目
      existingItemsMap.forEach((_, title) => {
        if (!newItemsMap.has(title)) {
          toDelete.push(title);
        }
      });

      // 5. 执行数据库操作，使用较小的批次
      const batchSize = 20;
      let successCount = 0;
      let errorCount = 0;

      // 处理更新操作
      for (let i = 0; i < toUpdate.length; i += batchSize) {
        try {
          const batch = toUpdate.slice(i, i + batchSize);
          await prisma.$transaction(
            batch.map(({ title, item }) =>
              prisma.hotTrend.update({
                where: { title_source: { title, source: this.platform } },
                data: item,
              }),
            ),
          );
          successCount += batch.length;
        } catch (error) {
          console.error(`更新批次 ${i / batchSize + 1} 失败:`, error);
          errorCount += Math.min(batchSize, toUpdate.length - i);
        }
      }

      // 处理创建操作 - 使用createMany批量API
      if (toCreate.length > 0) {
        for (let i = 0; i < toCreate.length; i += batchSize) {
          try {
            const createBatch = toCreate.slice(i, i + batchSize);
            await prisma.hotTrend.createMany({
              data: createBatch,
              skipDuplicates: true, // 跳过重复项
            });
            successCount += createBatch.length;
          } catch (error) {
            console.error(`创建批次 ${i / batchSize + 1} 失败:`, error);
            // 如果批量创建失败，尝试逐个创建
            for (const item of toCreate.slice(i, i + batchSize)) {
              try {
                await prisma.hotTrend.create({ data: item });
                successCount++;
              } catch (innerError) {
                console.error(`创建单项失败:`, innerError);
                errorCount++;
              }
            }
          }
        }
      }

      // 处理删除操作
      for (let i = 0; i < toDelete.length; i += batchSize) {
        try {
          const batch = toDelete.slice(i, i + batchSize);
          await prisma.$transaction(
            batch.map((title) =>
              prisma.hotTrend.delete({
                where: { title_source: { title, source: this.platform } },
              }),
            ),
          );
          successCount += batch.length;
        } catch (error) {
          console.error(`删除批次 ${i / batchSize + 1} 失败:`, error);
          errorCount += Math.min(batchSize, toDelete.length - i);
        }
      }

      // 6. 更新同步时间
      await prisma.syncTaskRecord.upsert({
        where: { taskName: this.platform },
        update: { lastSyncAt: new Date() },
        create: { taskName: this.platform, lastSyncAt: new Date() },
      });

      console.log(`同步完成: ${this.platform}, 成功: ${successCount}, 失败: ${errorCount}`);

      return {
        hotList: newHotList,
        cachedAt: new Date().toISOString(),
        stats: {
          updated: toUpdate.length,
          created: toCreate.length,
          deleted: toDelete.length,
          success: successCount,
          error: errorCount,
        },
      };
    } catch (error) {
      console.error(`同步失败: ${this.platform}`, error);
      return { hotList: [], cachedAt: new Date().toISOString() };
    }
  }
}
