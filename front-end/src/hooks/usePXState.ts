import { useEffect, useState } from "react";
import { useEvent } from "sz-react-support"
import lf from "localforage"
export function usePXState<S>(key: string, defaultValue: S): [S,
    (newState: S) => void] {
    const trigger = useEvent<S>(`__px_state_update_value:${key}`)
    const [value, setValue] = useState(defaultValue)
    useEffect(() => {
        (async () => {
            const value = await lf.getItem<S>(key)
            if (value) {
                setValue(value)
            }
        })()
    }, [key, defaultValue])
    return [value, (state: S) => {
        setValue(state)
        trigger(state)
    }]
}