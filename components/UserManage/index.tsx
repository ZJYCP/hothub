import React from 'react';
import { Tooltip } from '@heroui/react';

import Operation from './Operation';
import SignInButtonCom from './SignInButton';

import { createClient } from '@/utils/supabase/server';

export default async function UserManagerCom() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    return <SignInButtonCom></SignInButtonCom>;
  } else {
    return (
      <Tooltip content={<Operation></Operation>}>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400 text-white text-3xl font-bold cursor-pointer">
          {user.email?.charAt(0)}
        </div>
      </Tooltip>
    );
  }
}
