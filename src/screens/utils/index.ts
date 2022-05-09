import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 解决 {checked: false} 的问题
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO: 依赖项里加上callback会造成无限循环, 这个和useCallback以及useMemo有关系。
    // eslint-disable-next-line
  }, []);
};

// export const useDebounce = (value, delay) => {
//   const [debounceValue, setDebounceValue] = useState(value)
//   let timer = undefined
//   useEffect(() => {
//     timer = setTimeout(() => {
//       setDebounceValue(value)
//     }, delay)
//
//     return () => {
//       if (timer) {
//         clearTimeout(timer)
//       }
//     }
//   }, [value])
//   return debounceValue;
// }

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  });

  return debouncedValue;
};
