'use client';
import AppTableCom from './AppTable';
import CreateAppCom from './CreateApp';

import { OpenApiVO } from '@/types/openApi';

interface OpenApiMangeProps {
  apps: OpenApiVO[];
}

export function OpenApiManage(props: OpenApiMangeProps) {
  const { apps } = props;

  return (
    <div className="space-y-4">
      <CreateAppCom
        onCreated={() => {
          // 刷新页面
          window.location.reload();
        }}
      ></CreateAppCom>
      <AppTableCom apps={apps}></AppTableCom>
    </div>
  );
}
