"use client";

import { useState, useCallback } from "react";

function readStorage<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return initialValue;
    const parsed = JSON.parse(item) as T;
    if (Array.isArray(parsed)) {
      const seen = new Set<string>();
      return (parsed as Array<{ id?: string }>).filter((item) => {
        if (item.id === undefined) return true;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) as unknown as T;
    }
    return parsed;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => readStorage(key, initialValue));

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value: React.SetStateAction<T>) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore quota errors */
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
