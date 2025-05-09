'use client';

import { addToast, Listbox, ListboxItem } from '@heroui/react';

import { createClient } from '@/utils/supabase/client';
import { useActionState } from 'react';
import { useRequest } from '@/lib/useRequest';

export default function Operation() {
  const supabase = createClient();
  const { run, loading, data } = useRequest(() => supabase.auth.signOut(), {
    manual: true,
    onSuccess: (res) => {
      if (res.error) {
        addToast({
          title: '退出失败',
          description: res.error.message,
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
