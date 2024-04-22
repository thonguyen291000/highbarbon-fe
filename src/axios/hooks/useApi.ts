import { useCallback, useMemo, useState } from "react";

type BasicApiParam<U, T> = {
  callFunction: (params?: U) => Promise<any>;
  onComplete?: (data: T) => void;
  onFailed?: (err: any) => void;
};

const useApi = <U, T>({
  callFunction,
  onComplete,
  onFailed,
}: BasicApiParam<U, T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  const triggerApiCall = useCallback(async (params?: U) => {
    setLoading(true);
    try {
      const response: any = await callFunction(params);

      setData(response);
      onComplete?.(response);
    } catch (err) {
      console.error(err);

      onFailed?.(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      data,
      loading,
      triggerApiCall,
    }),
    [data, loading, triggerApiCall]
  );
};

export default useApi;
