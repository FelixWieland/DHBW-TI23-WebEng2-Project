import { useCallback, useState } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
    const storedValue = localStorage.getItem(key)
    const [state, setState] = useState(storedValue === null ? defaultValue : JSON.parse(storedValue))

    const setStateWithLocalStorage = useCallback((value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
        setState(value)
    }, [])

    return [state, setStateWithLocalStorage] as const
}