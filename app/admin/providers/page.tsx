'use client';

import React from 'react';
import AIProviderManager from '@/components/admin/AIProviderManager';

export default function ProvidersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">AI提供商管理</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <AIProviderManager />
      </div>
    </div>
  );
}
