import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
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

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  });

  return debouncedValue;
};
