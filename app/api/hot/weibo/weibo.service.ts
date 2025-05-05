export async function fetch_data() {
  const response = await fetch("https://weibo.com/ajax/side/hotSearch")
  const data = await response.json()

  // 由于不清楚 item 的具体结构，这里定义一个接口来替代 any 类型
  interface WeiboHotItem {
    note: string
    num: string
    word_scheme: string
  }

  const hotList = data.data.realtime.map(
    (item: WeiboHotItem, index: number) => ({
      id: index.toString(),
      title: item.note,
      source: "微博",
      heat: parseInt(item.num),
      url: `https://s.weibo.com/weibo?q=${encodeURIComponent(
        item.word_scheme
      )}`,
    })
  )
  return hotList
}
