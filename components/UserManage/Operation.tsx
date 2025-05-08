'use client';

import { Listbox, ListboxItem } from '@heroui/react';

import { createClient } from '@/utils/supabase/client';

export default function Operation() {
  const supabase = createClient();

  const clickHandler = async (key: string | number) => {
    if (key === 'signout') {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };
  return (
    <Listbox aria-label="Actions" onAction={clickHandler}>
      <ListboxItem key="signout">退出</ListboxItem>
    </Listbox>
  );
}
