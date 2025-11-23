import { createState } from "./state";
import type { AppState } from "@/types/state";

export const appState = createState<AppState>({
    user: null,
    preferences: null,
    // add more here
});