// HackerNews
import { HotService } from '../base.service';
import * as cheerio from 'cheerio';

import { PlatformEnum, TrendItem } from '@/types';

interface Res {
  data: {}[];
}

class HackernewsService extends HotService {
  protected apiUrl: string = `https://news.ycombinator.com`;

  protected platform: PlatformEnum = PlatformEnum.Hackernews;

  protected async fetchData() {
    try {
      const html: any = await (await fetch(this.apiUrl)).text();
      const $ = cheerio.load(html);
      const $main = $('.athing');
      const news: TrendItem[] = [];
      $main.each((index, el) => {
        const a = $(el).find('.titleline a').first();
        // const url = a.attr("href")
        const title = a.text();
        const id = $(el).attr('id');
        const score = $(`#score_${id}`).text();
        const url = `${this.apiUrl}/item?id=${id}`;
        if (url && id && title) {
          news.push({
            id: this.platform + '_' + index.toString(),
            title,
            url,
            heat: score ? parseInt(score.split('points')[0]) : -1,
            rank: index,
            source: this.platform,
          });
        }
      });
      return news;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  protected async transformData(data: TrendItem[]): Promise<TrendItem[]> {
    return data;
  }
}

export const hackernewsServiceInstance = HackernewsService.getInstance<HackernewsService>();
