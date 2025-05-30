'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Switch } from '@heroui/switch';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

interface AIProvider {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AIProviderManager() {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProvider, setCurrentProvider] = useState<AIProvider | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    baseUrl: '',
  });

  // 加载AI提供商数据
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ai/providers');
        if (!response.ok) {
          throw new Error('获取AI提供商失败');
        }
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // 打开添加模态框
  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      apiKey: '',
      baseUrl: '',
    });
    setIsModalOpen(true);
  };

  // 打开编辑模态框
  const openEditModal = (provider: AIProvider) => {
    setModalMode('edit');
    setCurrentProvider(provider);
    setFormData({
      name: provider.name,
      apiKey: provider.apiKey,
      baseUrl: provider.baseUrl,
    });
    setIsModalOpen(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      if (modalMode === 'add') {
        // 添加新提供商
        const response = await fetch('/api/ai/providers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '添加AI提供商失败');
        }

        const newProvider = await response.json();
        setProviders((prev) => [newProvider, ...prev]);
      } else if (modalMode === 'edit' && currentProvider) {
        // 更新提供商
        const response = await fetch(`/api/ai/providers/${currentProvider.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '更新AI提供商失败');
        }

        const updatedProvider = await response.json();
        setProviders((prev) =>
          prev.map((p) => (p.id === updatedProvider.id ? updatedProvider : p)),
        );
      }

      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  };

  // 删除提供商
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此AI提供商吗？')) return;

    try {
      const response = await fetch(`/api/ai/providers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除AI提供商失败');
      }

      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  };

  // 激活/停用提供商
  const handleToggleActive = async (provider: AIProvider) => {
    try {
      const response = await fetch(`/api/ai/providers/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: provider.id }),
      });

      if (!response.ok) {
        throw new Error('更新AI提供商状态失败');
      }

      // 更新列表，将其他提供商设为非活跃
      const updatedProviders = providers.map((p) => ({
        ...p,
        isActive: p.id === provider.id,
      }));

      setProviders(updatedProviders);
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  };

  if (loading) return <div className="text-center py-4">加载中...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button color="primary" onClick={openAddModal}>
          添加AI提供商
        </Button>
      </div>

      <Table aria-label="AI提供商列表">
        <TableHeader>
          <TableColumn>名称</TableColumn>
          <TableColumn>API密钥</TableColumn>
          <TableColumn>基础URL</TableColumn>
          <TableColumn>状态</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.apiKey.substring(0, 8)}...</TableCell>
              <TableCell>{provider.baseUrl}</TableCell>
              <TableCell>
                <Switch
                  isSelected={provider.isActive}
                  onChange={() => handleToggleActive(provider)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => openEditModal(provider)}>
                    编辑
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => handleDelete(provider.id)}
                    isDisabled={provider.isActive}
                  >
                    删除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 添加/编辑模态框 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>{modalMode === 'add' ? '添加AI提供商' : '编辑AI提供商'}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="名称"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="例如: OpenAI"
              />
              <Input
                label="API密钥"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="API密钥"
              />
              <Input
                label="基础URL"
                name="baseUrl"
                value={formData.baseUrl}
                onChange={handleInputChange}
                placeholder="例如: https://api.openai.com/v1"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={closeModal}>
              取消
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
