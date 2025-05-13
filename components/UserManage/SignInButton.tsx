'use client';

import { useDisclosure } from '@heroui/react';
import AuthModal from './AuthModal';

export default function SignInButtonCom() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <span className="cursor-pointer" onClick={onOpen}>
        登录
      </span>
      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange}></AuthModal>
    </>
  );
}
