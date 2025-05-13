export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        {/* 标题区 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            关于 HotHub
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            基于大语言模型的智能分析平台，实时聚合多平台热搜数据并提供深度洞察
          </p>
        </div>

        {/* 功能亮点 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: '多平台聚合', desc: '支持微博/知乎/小红书/Twitter等主流平台' },
            { title: '实时分析', desc: '分钟级更新的热搜榜单与趋势追踪' },
            { title: '智能解读', desc: '基于LLM的热点语义分析与舆情洞察' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 技术栈 */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">技术基石</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Next.js', 'LangChain', 'OpenAI API', 'Vercel AI'].map((tech, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-medium">{tech[0]}</span>
                </div>
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 独立开发者介绍 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">独立开发者</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-2xl transform transition hover:scale-[1.02]">
              <img
                src="https://avatars.githubusercontent.com/u/12345678"
                alt="Developer avatar"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-purple-200"
              />
              <h3 className="text-2xl font-bold mb-4">全栈开发者</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                专注于构建高效可靠的网络应用，负责本平台的全栈开发与产品设计，
                擅长Next.js应用架构与AI集成开发。
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/zjycp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/chnycp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
