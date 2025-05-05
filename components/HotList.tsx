"use client";
import { useState } from "react";

type HotItem = {
  id: string;
  title: string;
  source: string;
  heat: number;
  url: string;
};

interface HotListProps {
  initialData: HotItem[];
}

export function HotList({ initialData }: HotListProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredList =
    activeTab === "all"
      ? initialData
      : initialData.filter((item) => item.source === activeTab);

  return (
    <div className="space-y-4">
      <div className="grid gap-4"></div>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "all"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          全部
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "微博"
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("微博")}
        >
          微博
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "知乎"
              ? "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("知乎")}
        >
          知乎
        </button>
      </div>

      <div className="space-y-2">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex justify-between mt-2 text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {item.source}
                </span>
                <span className="text-gray-600">
                  🔥 {item.heat.toLocaleString()} 热度
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
