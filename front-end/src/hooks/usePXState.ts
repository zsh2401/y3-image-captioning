import { useCallback, useEffect, useState } from "react";
import { useEvent } from "sz-react-support"
import lf from "localforage"
export function usePXState<S>(key: string, defaultValue: S): [S,
    (newState: S) => void] {
        
    const [value, setValue] = useState(defaultValue)

    const valueUpdate = useCallback((value: S) => {
        setValue(value)
    }, [setValue])

    const trigger = useEvent<S>(`__px_state_update_value:${key}`,valueUpdate)


    useEffect(() => {
        (async () => {
            const value = await lf.getItem<S>(key)
            if (value) {
                setValue(value)
            }
        })()
    }, [key, defaultValue])

    return [value, (state: S) => {
        setValue(state);
        (async () => {
            await lf.setItem(key, state)
            trigger(state)
        })()
    }]
}