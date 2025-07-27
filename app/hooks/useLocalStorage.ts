import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
        if (typeof window === 'undefined') {
            setStoredValue(value);
            return;
        }
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(typeof value === 'function' ? value(storedValue) : value));
    }

    return [storedValue, setValue] as const;
}