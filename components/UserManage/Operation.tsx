'use client';

import { addToast, Listbox, ListboxItem } from '@heroui/react';

import { useActionState } from 'react';
import { useRequest } from '@/lib/useRequest';
import { logout } from './actions';

export default function Operation() {
  const { run, loading, data } = useRequest(logout, {
    manual: true,
    onSuccess: (res) => {
      if (res.error) {
        addToast({
          title: '退出失败',
          description: res.error,
          color: 'danger',
        });
      } else {
        window.location.reload();
      }
    },
  });

  const clickHandler = async (key: string | number) => {
    if (key === 'signout') {
      run();
    }
  };
  return (
    <Listbox aria-label="Actions" onAction={clickHandler}>
      <ListboxItem key="signout">退出</ListboxItem>
    </Listbox>
  );
}
