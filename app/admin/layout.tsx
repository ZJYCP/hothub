import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: '系统管理 - HotTrends',
  description: '管理AI提供商和系统设置',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 dark:bg-gray-900 shadow-sm">
        <AdminSidebar />
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-6">{children}</div>
      </main>
    </div>
  );
}
