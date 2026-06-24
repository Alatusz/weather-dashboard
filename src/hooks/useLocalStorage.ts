import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (!saved) return initialValue;
    try {
      const parsed = JSON.parse(saved);
      // specific check for arrays if initialValue is an array
      if (
        Array.isArray(initialValue) &&
        Array.isArray(parsed) &&
        parsed.length === 0
      ) {
        return initialValue;
      }
      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
