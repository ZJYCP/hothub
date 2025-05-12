// 微博智搜数据

interface IZhiSouData {
  emotion_analysis: {
    name: string;
    val: number;
  }[];
  word_cloud: {
    desc: string;
  };
  typical_viewpoint: {
    detail: {
      content: string;
    }[];
  };
}
export async function ZhisouService(keyword: string) {
  // urlEncode
  keyword = encodeURIComponent(keyword);
  const url = `https://ai.s.weibo.com/api/llm/analysis_tab.json?query=${keyword}&tabindex=0&from=&istag=0&plat=h5`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const origin = await res.json();
  const zhisou = origin.data as IZhiSouData;
  const result = {
    emotion_analysis: origin.emotion_analysis,
    word_cloud: JSON.parse(zhisou.word_cloud.desc).map((item: any) => {
      return {
        name: item.name,
        value: item.value,
        text: item.name,
      };
    }),
    typical_viewpoint: zhisou.typical_viewpoint.detail.map((item) => item.content),
  };
  return result;
}
