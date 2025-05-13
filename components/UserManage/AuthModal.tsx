'use client';
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
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { login, signup } from './actions';
import { useRequest } from '@/lib/useRequest';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const { loading: loginLoading, run: runLogin } = useRequest(login, {
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

  const { loading: registerLoading, run: runRegister } = useRequest(signup, {
    manual: true,
    onSuccess: (data) => {
      if (data.error) {
        addToast({
          color: 'danger',
          title: '注册失败',
          description: data.error,
        });
      } else {
        setIsLogin(true);
        addToast({
          color: 'success',
          title: '注册成功',
          description: '请使用新账号登录',
        });
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
              isLogin
                ? runLogin(new FormData(e.currentTarget))
                : runRegister(new FormData(e.currentTarget));
            }}
          >
            <ModalHeader className="flex flex-col gap-1">{isLogin ? '登录' : '注册'}</ModalHeader>

            <ModalBody>
              {/* {!isLogin && (
                <Input
                  name="username"
                  endContent={<User />}
                  label="用户名"
                  placeholder="输入用户名"
                  variant="bordered"
                />
              )} */}
              <Input
                name="email"
                endContent={<Mail />}
                label="Email"
                placeholder="输入邮箱"
                variant="bordered"
              />
              <Input
                name="password"
                endContent={<Lock />}
                label="密码"
                placeholder="输入密码"
                type="password"
                variant="bordered"
              />
              {!isLogin && (
                <Input
                  name="confirmPassword"
                  endContent={<Lock />}
                  label="确认密码"
                  placeholder="再次输入密码"
                  type="password"
                  variant="bordered"
                />
              )}
              <div className="flex py-2 px-1 justify-between">
                {isLogin ? (
                  <>
                    <Checkbox classNames={{ label: 'text-small' }}>记住我</Checkbox>
                    <Link
                      color="warning"
                      size="sm"
                      className="cursor-pointer"
                      onPress={() => setIsLogin(false)}
                    >
                      没有账号，注册
                    </Link>
                  </>
                ) : (
                  <Link
                    color="warning"
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setIsLogin(true)}
                  >
                    已有账号，登录
                  </Link>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                关闭
              </Button>
              <Button color="primary" type="submit">
                {(loginLoading || registerLoading) && <Spinner color="default" size="sm" />}
                {isLogin ? '登录' : '注册'}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
