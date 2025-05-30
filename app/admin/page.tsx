'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import Link from 'next/link';
import { Button } from '@heroui/button';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">系统管理概览</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">AI提供商管理</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              管理系统中的AI提供商，包括添加、编辑、删除和激活AI提供商。
            </p>
            <Link href="/admin/providers">
              <Button color="primary">前往管理</Button>
            </Link>
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">系统设置管理</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              管理系统设置，包括AI模型选择和其他全局配置。
            </p>
            <Link href="/admin/settings">
              <Button color="primary">前往管理</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
