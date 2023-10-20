import { useState, useEffect } from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(result);
    setLoading(false);
  }, [result]);

  return { data, loading } as const;
};

export default useStore;
