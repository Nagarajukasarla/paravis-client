/**
 * Get all days of the month for a given date
 * @param date - The date to get the month days for
 * @returns Array of objects with date string and day number
 */
export const getMonthDays = (date: Date): { date: string; day: number }[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: { date: string; day: number }[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateString = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
        days.push({
            date: dateString,
            day: day,
        });
    }

    return days;
};

/**
 * Get attendance data for a date range
 * @param from - Start date string (YYYY-MM-DD)
 * @param to - End date string (YYYY-MM-DD)
 * @returns Array of attendance objects
 */
export const getAttendances = (
    from: string,
    to: string
): { date: string; marked: boolean; inTime?: string; outTime?: string }[] => {
    // This is mock data - in real app, this would come from API
    // Generate some sample attendance data
    const sampleAttendances = [
        { date: "2025-10-01", marked: true, inTime: "09:02 AM", outTime: "05:00 PM" },
        { date: "2025-10-02", marked: true, inTime: "08:09 AM", outTime: "06:00 PM" },
        { date: "2025-10-03", marked: true, inTime: "08:59 AM", outTime: "06:00 PM" },
        { date: "2025-10-04", marked: true, inTime: "09:01 AM", outTime: "06:00 PM" },
        { date: "2025-10-05", marked: true, inTime: "09:01 AM", outTime: "05:30 PM" },
        { date: "2025-10-06", marked: false },
        { date: "2025-10-07", marked: true, inTime: "09:15 AM", outTime: "05:45 PM" },
        { date: "2025-10-26", marked: true, inTime: "09:15 AM", outTime: "05:45 PM" },
        // Add more as needed
    ];

    // Filter by date range
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return sampleAttendances.filter(attendance => {
        const attendanceDate = new Date(attendance.date);
        return attendanceDate >= fromDate && attendanceDate <= toDate;
    });
};

export const formatLocalDate = (d: Date, time: boolean = false) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const currentTime = d.toTimeString().split(" ")[0];
    return time ? `${year}-${month}-${day}T${currentTime}` : `${year}-${month}-${day}`;
};
