import {
  addToast,
  Button,
  Checkbox,
  Form,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@heroui/react';
import React from 'react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { login } from './actions';
import { useRequest } from '@/lib/useRequest';

interface LoginInModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function LoginInModal({ isOpen, onOpenChange }: LoginInModalProps) {
  const { loading, run } = useRequest(login, {
    manual: true,
    onSuccess: (data) => {
      if (data.error) {
        addToast({
          color: 'danger',
          title: '登录失败',
          description: data.error,
        });
      } else {
        onOpenChange(false);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <Form
            className="items-stretch"
            onSubmit={async (e) => {
              e.preventDefault();
              run(new FormData(e.currentTarget));
            }}
          >
            <ModalHeader className="flex flex-col gap-1">登录</ModalHeader>

            <ModalBody>
              <Input
                name="email"
                endContent={<Mail></Mail>}
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
              />
              <Input
                name="password"
                endContent={<Lock></Lock>}
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: 'text-small',
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                关闭
              </Button>
              <Button color="primary" type="submit">
                {loading && <Spinner color="default" size="sm" />} 登录
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
