import TrendsCom from './main';

import { HotList } from '@/components/HotList';

export default async function TrendsPage() {
  try {
    return (
      <main className="min-h-screen">
        <TrendsCom />
      </main>
    );
  } catch (error) {
    // console.error('Failed to fetch hot list:', error);

    return (
      <main className="min-h-screen">
        <h1 className="text-3xl font-bold mb-8">全网热搜聚合平台</h1>
        <HotList initialData={[]} />
      </main>
    );
  }
}
