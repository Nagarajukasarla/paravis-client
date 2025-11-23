import { useEffect, useState } from "react";
import { appState } from "./appState";

export function useAppState<T>(selector: (state: any) => T): T {
    const [slice, setSlice] = useState(() => selector(appState.getState()));

    useEffect(() => {
        return appState.subscribe(state => {
            const selected = selector(state);
            setSlice(selected); // triggers re-render
        });
    }, [selector]);

    return slice;
}