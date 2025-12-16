import { useCallback, useEffect, useState } from "react";
import { useAppState } from "../state/useAppState";
import { appState } from "../state/appState";
import { userService } from "../api/userService";
import APIResponse from "../classes/APIResponse";
import type { Preferences } from "../types/api";

export function usePreferencesData() {
    const preferences = useAppState<Preferences>((state: any) => state.preferences);
    const [loading, setLoading] = useState(false);

    const fetchPreferences = useCallback(async () => {
        setLoading(true);
        try {
            const response = await userService.getPreferences();
            if (response.code === APIResponse.SUCCESS) {
                console.log("Preferences fetched successfully: ", response.data?.data);
                appState.patch({ preferences: response.data?.data });
            }
        } catch (error) {
            console.error("Error fetching preferences: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!preferences) {
            fetchPreferences();
        }
    }, [preferences, fetchPreferences]);

    return { preferences, loading, refetch: fetchPreferences };
}
