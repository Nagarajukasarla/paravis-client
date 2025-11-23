import SSelect from "@/components/core/CSelect";
import AttendanceEntry from "@/components/feature/AttendanceEntry";
import Spinner from "@/components/feature/Spinner";
import { usePreferencesData } from "@/hooks/usePreferencesData";
import { useUserData } from "@/hooks/useUserData";
import type { BasicPageProps, DaySpecification, Option } from "@/types/component";
import { formatLocalDate } from "@/utils/dateUtils";
import { useEffect, useMemo, useState, type FC } from "react";

interface AttendanceHistoryProps extends BasicPageProps { }

const AttendanceHistory: FC<AttendanceHistoryProps> = ({ title }) => {
    const [filter, setFilter] = useState<Option>({ key: "month", label: "This Month", value: "month" });
    const [loading, setLoading] = useState<boolean>(true);

    const filterOptions: Option[] = [
        { key: "week", label: "This Week", value: "week" },
        { key: "month", label: "This Month", value: "month" },
        { key: "prevMonth", label: "Previous Month", value: "prevMonth" },
    ];

    // Calculate date range based on filter
    const { from, to } = useMemo(() => {
        const now = new Date();
        let fromDate: Date;
        let toDate: Date;

        switch (filter.value) {
            case "week": {
                const dayOfWeek = now.getDay();
                fromDate = new Date(now);
                fromDate.setDate(now.getDate() - dayOfWeek);
                toDate = new Date(fromDate);
                toDate.setDate(fromDate.getDate() + 6);
                break;
            }
            case "prevMonth": {
                fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                toDate = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            }
            case "month": {
                fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
                toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            }
            default: {
                fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
                toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            }
        }

        return {
            from: formatLocalDate(fromDate),
            to: formatLocalDate(toDate),
        };
    }, [filter]);

    // Get days for the selected period and attendance data
    const periodDays = useMemo(() => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const days: { date: string; day: number }[] = [];

        for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
            days.push({
                date: d.toISOString().split("T")[0],
                day: d.getDate(),
            });
        }

        return days;
    }, [from, to]);


    useEffect(() => {
        // Simulate brief loading for data processing
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    const { user, loading: loadingUser } = useUserData();
    const { preferences } = usePreferencesData();

    const getDaySpecification = (date: string): DaySpecification => {
        const getDayName = new Date(date).toLocaleDateString("en", { weekday: "long" });
        console.log("getDayName: ", getDayName);

        if (preferences?.weekends.find((val: string) => val === getDayName)) {
            return { type: "weekend", date: date, description: "Weekend" };
        }

        const holiday:any = preferences?.holidays.find((holiday: any) => {
            // holiday object format : {2025-11-22: "Holiday description"}
            if (Object.keys(holiday)[0] === date) {
                return holiday;
            }
        });

        if (holiday) {
            return { type: "holiday", date: date, description: holiday[date] };
        }

        const attendance:any = user?.attended.find((attendance: any) => {
            const attendanceDate = attendance.inTime?.split("T")[0];
            return attendanceDate === date;
        });

        if (attendance) {
            return { type: "attended", date: date, description: "Attended", inTime: attendance.inTime, outTime: attendance.outTime };
        }

        const leave = user?.leaves.find((leave: any) => {
            const leaveDate = leave.date;
            return leaveDate === date;
        });

        if (leave) {
            return { type: "leave", date: date, description: "Leave" };
        }

        return { type: "unattended", date: date, description: "Unattended" };
    };

    if (loading) {
        return <Spinner />;
    }

    if (loadingUser) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-4 pt-2">
            <div className="w-full max-w-md">
                {/* Filter Dropdown */}
                <div className="flex justify-between mb-6">
                    <h1 className="font-semibold">{title}</h1>
                    <SSelect
                        options={filterOptions}
                        value={filter}
                        placeholder="Select Filter"
                        onValueChange={setFilter}
                    />
                </div>

                {/* Attendance Records */}
                <div className="space-y-3">
                    {periodDays.map(record => {
                        const daySpecification = getDaySpecification(record.date);
                        const inTime = daySpecification?.inTime ? new Date(daySpecification.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--- ---";
                        const outTime = daySpecification?.outTime ? new Date(daySpecification.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--- ---";
                        const recordColor = daySpecification?.type === "attended" ? "blue"
                            : daySpecification?.type === "unattended" ? "gray"
                                : "red"
                        return (
                            <AttendanceEntry
                                key={record.date}
                                index={record.day}
                                inTime={inTime}
                                outTime={outTime}
                                markColor={recordColor} // blue | red | gray
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
