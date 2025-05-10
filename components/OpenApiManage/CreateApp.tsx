'use client';
import { useRequest } from '@/lib/useRequest';
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@heroui/react';
interface AppCreateDTO {
  name: string;
  remark?: string;
}

interface CreateAppComProps {
  onCreated: () => void;
}
export default function CreateAppCom(props: CreateAppComProps) {
  const { onCreated } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loading, run, data } = useRequest(
    async (appInfo) => {
      const res = await fetch('/api/openapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appInfo),
      });
      return res;
    },
    {
      manual: true,
      onSuccess: async (res) => {
        const data = await res.json();
        if (res.ok) {
          onOpenChange();
          addToast({
            title: '应用创建成功',
            description: `应用名称: ${data.name}`,
          });
          onCreated();
        } else {
          addToast({
            title: '创建应用失败',
            description: data.error || '未知错误',
          });
        }
      },
    },
  );

  const createApp = async (appInfo: AppCreateDTO) => {
    if (!appInfo.name.trim()) {
      addToast({
        title: '请输入应用名称',
        description: '应用名称不能为空',
      });
      return;
    }

    try {
      run(appInfo);
    } catch (error) {
      addToast({
        title: '创建应用失败',
        description: '请检查网络连接或稍后重试',
      });
    }
  };

  return (
    <div>
      <Button onPress={onOpen}>创建应用</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form
              className="items-stretch"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                createApp({
                  name: formData.get('name') as string,
                  remark: formData.get('remark') as string,
                });
              }}
            >
              <ModalHeader className="flex flex-col gap-1">创建应用</ModalHeader>

              <ModalBody>
                <Input name="name" label="应用名称" placeholder="输入应用名称" variant="bordered" />
                <Textarea name="remark" label="备注" placeholder=""></Textarea>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  关闭
                </Button>
                <Button color="primary" type="submit">
                  创建
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
