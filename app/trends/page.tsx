import { fetch_hot_data } from '../api/hot/hot.service';
import TrendsCom from './main';

export default async function TrendsPage() {
  try {
    const data = await fetch_hot_data();
    return (
      <main className="">
        <TrendsCom hotData={data}></TrendsCom>
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch hot list:', error);

    return (
      <main className="min-h-screen">
        <h1 className="text-3xl font-bold mb-8">全网热搜聚合平台</h1>
      </main>
    );
  }
}
