import ApplyLeave from "@/components/feature/ApplyLeave";
import AttendanceCalendar from "@/components/feature/AttendanceCalender";
import AttendanceSummary from "@/components/feature/AttendanceSummary";
import Spinner from "@/components/feature/Spinner";
import { usePreferencesData } from "@/hooks/usePreferencesData";
import { useUserData } from "@/hooks/useUserData";
import type { AttendedDay } from "@/types/api";
import type { BasicPageProps } from "@/types/component";
import { CalendarOff } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface AttendanceHistoryProps extends BasicPageProps { }

const AttendanceHistory: FC<AttendanceHistoryProps> = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showLeaveModel, setShowLeaveModel] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    const { user, loading: loadingUser } = useUserData();
    const { preferences } = usePreferencesData();

    if (loading || loadingUser) return <Spinner />;

    // Correct props for Calendar
    const attendedDays: AttendedDay[] = user?.attended ?? [];
    const holidays = preferences?.holidays ?? [];    // array of objects
    const weekends = preferences?.weekends ?? [];    // ["Sunday"]
    const leaves = user?.leaves ?? [];               // ["2025-11-10"]

    const totalDays = attendedDays.filter((d) => d.inTime).length;

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-md">
                <AttendanceSummary
                    totalDays={totalDays}
                />

                <AttendanceCalendar
                    attendedDays={attendedDays}
                    holidays={holidays}
                    weekends={weekends}
                    leaves={leaves}
                />
                <div className="flex px-6 mt-6">
                    <button
                        onClick={() => setShowLeaveModel(true)}
                        className="flex flex-1 items-center justify-center 
                            bg-primary-active hover:bg-primary-hover 
                            text-white py-2 px-4 rounded-xl 
                            shadow-sm transition
                        "
                    >
                        <CalendarOff size={18} className="mr-5" /> Apply Leave
                    </button>
                </div>
            </div>

            {/* Call the ApplyLeave.tsx component here */}
            <ApplyLeave visible={showLeaveModel} onClose={() => setShowLeaveModel(false)} />
        </div>
    );
};

export default AttendanceHistory;
