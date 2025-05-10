import { get_apps_list } from '../api/openapi/actions';

import { OpenApiManage } from '@/components/OpenApiManage';
import { createClient } from '@/utils/supabase/server';
import HeaderCom from '@/components/OpenApiManage/Header';

export default async function OpenApiPage() {
  const supabase = createClient();
  const userId = (await (await supabase).auth.getUser()).data.user?.id;

  const appsList = userId ? await get_apps_list(userId) : [];
  return (
    <div className="container mx-auto px-4 py-2">
      <HeaderCom></HeaderCom>
      <OpenApiManage apps={appsList}></OpenApiManage>
    </div>
  );
}
