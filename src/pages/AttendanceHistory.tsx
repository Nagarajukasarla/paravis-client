import SSelect from "@/components/core/CSelect";
import AttendanceEntry from "@/components/feature/AttendanceEntry";
import { useState, useMemo, useEffect, type FC } from "react";
import { formatLocalDate, getAttendances } from "@/utils/dateUtils";
import Spinner from "@/components/feature/Spinner";

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

    const attendances = useMemo(() => getAttendances(from, to), [from, to]);

    useEffect(() => {
        // Simulate brief loading for data processing
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    console.log("attendances: ", attendances);
    console.log("periodDays: ", periodDays);

    if (loading) {
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
                        const item = attendances.find(a => a.date === record.date);
                        const isMarked = item ? item.marked : false;
                        const inTime = item?.inTime || "--- ---";
                        const outTime = item?.outTime || "--- ---";

                        return (
                            <AttendanceEntry
                                key={record.date}
                                index={record.day}
                                inTime={inTime}
                                outTime={outTime}
                                isMarked={isMarked}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
