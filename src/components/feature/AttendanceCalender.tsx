import type { AttendedDay } from "@/types/api";
import type { DaySpecificationType } from "@/types/component";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    getDaysInMonth,
    startOfMonth,
    subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

interface AttendanceProps {
    attendedDays: AttendedDay[];
    holidays: Record<string, string>[]; // [{ "2025-11-05": "Guru Nanak’s Birthday" }]
    weekends: string[]; // ["Sunday"]
    leaves: string[]; // ["2025-11-10"]
}

const statusColors: Record<DaySpecificationType, string> = {
    attended: "bg-blue-500 text-white",
    halfday: "border border-blue-500 text-blue-500 bg-transparent",
    leave: "bg-yellow-400 text-white",
    weekend: "bg-blue-300 text-white",
    holiday: "bg-red-400 text-white",
    unattended: "bg-gray-200 text-gray-700",
    overtime: "bg-purple-500 text-white",
    extra: "bg-green-500 text-white",
};

export default function AttendanceCalendar({
    attendedDays,
    holidays,
    weekends,
    leaves,
}: AttendanceProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Convert attendedDays → fast lookup
    const attendedMap = useMemo(() => {
        const map: Record<string, AttendedDay> = {};
        attendedDays.forEach((d) => {
            const date = d.inTime.split("T")[0];
            map[date] = d;
        });
        return map;
    }, [attendedDays]);

    // Convert holiday array → single map
    const holidayMap = useMemo(() => {
        const clean = holidays.filter((h) => h && typeof h === "object");
        return Object.assign({}, ...clean);
    }, [holidays]);

    // Sets
    const leaveSet = useMemo(() => new Set(leaves), [leaves]);
    const weekendSet = useMemo(
        () => new Set(weekends.map((w) => w.toLowerCase())),
        [weekends]
    );

    // Build month grid
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start, end });

    const startWeek = getDay(start);
    const prevMonth = subMonths(currentMonth, 1);
    const prevCount = getDaysInMonth(prevMonth);

    const prevCells = Array.from({ length: startWeek }).map((_, i) => ({
        date: new Date(
            prevMonth.getFullYear(),
            prevMonth.getMonth(),
            prevCount - startWeek + i + 1
        ),
        isCurrentMonth: false,
    }));

    const currCells = monthDays.map((date) => ({
        date,
        isCurrentMonth: true,
    }));

    const totalCells = 42;
    const nextMonth = addMonths(currentMonth, 1);
    const remaining = totalCells - (prevCells.length + currCells.length);

    const nextCells = Array.from({ length: remaining }).map((_, i) => ({
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
        isCurrentMonth: false,
    }));

    const calendarCells = [...prevCells, ...currCells, ...nextCells];

    // ----- Status Engine -----
    function determineStatus(dateObj: Date): DaySpecificationType {
        const date = format(dateObj, "yyyy-MM-dd");

        const attended = attendedMap[date];
        const isHoliday = Boolean(holidayMap[date]);
        const isLeave = leaveSet.has(date);

        const dayName = format(dateObj, "EEEE").toLowerCase();
        const isWeekend = weekendSet.has(dayName);

        if (isHoliday && attended) return "extra";
        if (isWeekend && attended) return "overtime";
        if (isLeave) return "leave";
        if (attended && !attended.outTime) return "halfday";
        if (attended) return "attended";

        return "unattended";
    }

    return (
        <div className="w-full max-w-sm mx-auto bg-white shadow-sm px-5 py-3 select-none flex flex-col gap-4 h-[520px]">

            {/* Header */}
            <div className="flex items-center justify-between">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>

                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Week Labels */}
            <div className="grid grid-cols-7 gap-3 text-gray-500 font-medium text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={d + i} className="w-9 flex justify-center font-bold">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3 flex-grow overflow-visible h-[260px]">
                {calendarCells.map(({ date, isCurrentMonth }, idx) => {
                    const status = determineStatus(date);
                    const dim = isCurrentMonth ? "" : "opacity-40";

                    return (
                        <div
                            key={idx}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shadow-sm ${statusColors[status]} ${dim}`}
                        >
                            {format(date, "d")}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-around border-t pt-2 text-xs font-medium">
                <Legend color="border border-blue-500" label="Half Day" />
                <Legend color="bg-blue-500" label="Present" />
                <Legend color="bg-yellow-400" label="Leave" />
            </div>
            <div className="flex justify-around text-xs font-medium">
                <Legend color="bg-red-400" label="Holiday" />
                <Legend color="bg-purple-500" label="Overtime" />
                <Legend color="bg-green-500" label="Extra" />
            </div>
        </div>
    );
}

function Legend({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span>{label}</span>
        </div>
    );
}
