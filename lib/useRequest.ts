// useCustomRequest.ts
import { useRequest as useAhooksRequest } from 'ahooks';
import type { Options, Service } from 'ahooks/es/useRequest/src/types';
import { useTopLoader } from 'nextjs-toploader';

type ExtraOptions = {
  showProgressBar?: boolean;
};

export function useRequest<R, P extends any[] = any[]>(
  service: Service<R, P>,
  options?: Options<R, P> & ExtraOptions,
) {
  const { showProgressBar = true, onBefore, onFinally, ...restOptions } = options || {};
  const loader = useTopLoader();

  return useAhooksRequest(service, {
    ...restOptions,
    onBefore: (...args) => {
      if (showProgressBar) {
        loader.start();
      }
      onBefore?.(...args);
    },
    onFinally: (...args) => {
      if (showProgressBar) {
        loader.done();
      }
      onFinally?.(...args);
    },
  });
}
