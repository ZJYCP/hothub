import { fetch_data as fetch_weibo } from "../api/hot/weibo/weibo.service";
import { fetch_data as fetch_zhihu } from "../api/hot/zhihu/zhihu.service";

import { HotList } from "@/components/HotList";

export default async function TrendsPage() {
  try {
    const weiboResult = await fetch_weibo();
    const zhhuResult = await fetch_zhihu();

    const initialData = [...weiboResult, ...zhhuResult];

    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">全网热搜聚合平台</h1>
        <HotList initialData={initialData} />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch hot list:", error);
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">全网热搜聚合平台</h1>
        <HotList initialData={[]} />
      </main>
    );
  }
}
