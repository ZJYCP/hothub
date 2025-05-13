import { get_apps_list } from '../api/openapi/actions';
import { OpenApiManage } from '@/components/OpenApiManage';
import { createClient } from '@/utils/supabase/server';
import HeaderCom from '@/components/OpenApiManage/Header';

export default async function OpenApiPage() {
  const supabase = createClient();
  const session = await (await supabase).auth.getSession();
  if (!session.data.session) {
    return <div className="flex justify-center items-center">请使用账号登录</div>;
  }
  const userId = session.data.session.user.id;

  const appsList = userId ? await get_apps_list(userId) : [];
  return (
    <div className="container mx-auto px-4 py-2">
      <HeaderCom></HeaderCom>
      <OpenApiManage apps={appsList}></OpenApiManage>
    </div>
  );
}
