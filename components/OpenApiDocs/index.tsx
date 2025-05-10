import { CodeBlock } from '../ui/code-block';
export function OpenApiDocs() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">认证方式</h2>
        <p className="mb-4">
          所有API请求需要在Header中添加<code>X-API-KEY</code>字段，值为您的<code>appSecret</code>
        </p>
        <CodeBlock
          filename=""
          code={`curl -X POST 
-H "Content-Type: application/json" 
-H "X-API-KEY: your_app_secret" 
-d '{"prompt":"查询今日热点"}' 
http://artimind.top/api/ai/summary  `}
          language="bash"
        ></CodeBlock>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">API接口</h2>
        <div className="space-y-4">
          <div className="border rounded p-4">
            <h3 className="font-medium">POST /api/ai/summary</h3>
            <p className="text-sm text-gray-500 mb-2">获取热点分析摘要</p>
            <div className="space-y-2">
              <div>
                <span className="font-medium">请求参数:</span>
                <CodeBlock
                  filename=""
                  code={`{
  "prompt": "查询今日热点",
  "platform": "weibo"
}`}
                  language="json"
                >
                  {}
                </CodeBlock>
              </div>
              <div>
                <span className="font-medium">响应示例:</span>
                <CodeBlock
                  code={`{
  "text": "今日微博热点分析结果..."
}`}
                  filename=""
                  language="json"
                >
                  {}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">使用限制</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>每个应用每分钟最多100次请求</li>
          <li>每个应用每天最多1000次请求</li>
          <li>请求体大小不超过1MB</li>
        </ul>
      </section>
    </div>
  );
}
