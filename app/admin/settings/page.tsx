'use client';

import React from 'react';
import SystemSettingsManager from '@/components/admin/SystemSettingsManager';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">系统设置管理</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <SystemSettingsManager />
      </div>
    </div>
  );
}
