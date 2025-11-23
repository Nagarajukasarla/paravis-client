import { useCallback, useEffect, useState } from "react";
import { useAppState } from "@/state/useAppState";
import { appState } from "@/state/appState";
import { userService } from "@/api/userService";
import type { User } from "@/types/api";
import APIResponse from "@/classes/APIResponse";

export function useUserData() {
    const user = useAppState<User>((state: any) => state.user);
    const [loading, setLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await userService.getProfile();
            if (response.code === APIResponse.SUCCESS) {
                const data = response.data?.data;
                appState.patch({
                    user: {
                        empId: data?.empId ?? "",
                        name: data?.name ?? "",
                        shiftTimings: data?.shiftTimings ?? { start: "", end: "" },
                        totalDays: data?.totalDays ?? 0,
                        attended: data?.attended ?? [],
                        leaves: data?.leaves ?? [],
                        imageUrl: data?.imageUrl ?? "",
                    },
                });
            }
        } catch (error) {
            console.error("Error fetching user: " + error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    return { user, loading, refetch: fetchUser };
}
