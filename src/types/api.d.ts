export interface PartialUser {
    empId: string,
    name: string,
}

// Generic response interface backed by backend
export interface AppResponse<T> {
    success: boolean;
    data: T;
    errorDetails: any;
}

export interface Shift {
    start: string;
    end: string;
}

export interface User extends PartialUser {
    imageUrl: string;
    shiftTimings: Shift;
    attended: AttendedDay[]; // Dates
    leaves: string[]; // Dates
    totalDays: number;
}

export interface MarkAttendanceRequest extends PartialUser {
    image: File | string;
    dateTime: string;
    
    // location: string; // co-ordinates in future
}

export interface Preferences {
    holidays: Record<string, string>[];
    weekends: string[];
}

export type LeaveType = "SICK" | "CASUAL" | "EMERGENCY"

export interface Leave {
    type: LeaveType;
    date: string;
}

export interface AttendedDay {
    inTime: string;
    outTime: string;
}