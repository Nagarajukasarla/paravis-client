
export type Listener<T> = (state: T) => void;
export type Updater<T> = (state: T) => T;

export function createState<T>(initialState: T) {
    let state = initialState;
    const listeners = new Set<Listener<T>>();

    return {
        getState(): T {
            return state;
        },

        setState(updater: T | Updater<T>): void {
            const newState = updater instanceof Function ? updater(state) : updater;
            if (newState !== state) {
                state = newState;
                listeners.forEach(fn => fn(state));
            }
        },

        patch(partial: Partial<T>): void {
            this.setState((prev: T) => ({ ...prev, ...partial }));
        },

        subscribe(fn: Listener<T>): () => void {
            listeners.add(fn);
            fn(state);
            return () => listeners.delete(fn);
        }
    }
}