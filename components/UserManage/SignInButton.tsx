'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react';
import LoginInModal from './LoginInModal';

export default function SignInButtonCom() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <span className="cursor-pointer" onClick={onOpen}>
        登录
      </span>
      {isOpen && <LoginInModal isOpen={isOpen} onOpenChange={onOpenChange}></LoginInModal>}
    </>
  );
}
