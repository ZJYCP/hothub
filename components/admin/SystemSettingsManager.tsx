'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function SystemSettingsManager() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<SystemSetting | null>(null);

  const [formData, setFormData] = useState({
    value: '',
    description: '',
  });

  // 加载系统设置数据
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ai/settings');
        if (!response.ok) {
          throw new Error('获取系统设置失败');
        }
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 打开编辑模态框
  const openEditModal = (setting: SystemSetting) => {
    setCurrentSetting(setting);
    setFormData({
      value: setting.value,
      description: setting.description || '',
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
    if (!currentSetting) return;

    try {
      const response = await fetch('/api/ai/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: currentSetting.key,
          value: formData.value,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新系统设置失败');
      }

      const updatedSetting = await response.json();
      setSettings((prev) => prev.map((s) => (s.id === updatedSetting.id ? updatedSetting : s)));

      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  };

  if (loading) return <div className="text-center py-4">加载中...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div>
      <Table aria-label="系统设置列表">
        <TableHeader>
          <TableColumn>键名</TableColumn>
          <TableColumn>值</TableColumn>
          <TableColumn>描述</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {settings.map((setting) => (
            <TableRow key={setting.id}>
              <TableCell>{setting.key}</TableCell>
              <TableCell>{setting.value}</TableCell>
              <TableCell>{setting.description}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => openEditModal(setting)}>
                  编辑
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 编辑模态框 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>编辑系统设置</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="text-sm">
                <span className="font-bold">键名: </span>
                <span>{currentSetting?.key}</span>
              </div>
              <Input
                label="值"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="设置值"
              />
              <Input
                label="描述"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="设置描述"
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
