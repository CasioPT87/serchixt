import React, { useEffect, useState } from 'react';

type ComponentType<T> = React.FC & {
  preloadFn?: () => Promise<T>;
};
type PreloadDataProp<T> = T | null;

export default function usePreloadData<T>({
  component,
  preloadDataProp = null,
}: {
  component: ComponentType<T>;
  preloadDataProp?: PreloadDataProp<T>;
}): T | null {
  const [data, setData] = useState(preloadDataProp);

  useEffect(() => {
    async function getData() {
      const { preloadFn } = component;
      if (!preloadFn || preloadDataProp) return null;

      const data = await preloadFn();
      setData(data);
    }
    getData();
  }, [component, preloadDataProp]);

  return data;
}
