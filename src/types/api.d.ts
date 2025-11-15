interface PartialUser {
    id: string,
    name: string,
}

interface User extends PartialUser {
    shiftTimings: string[];
    presentDays: string[]; // Dates
    holidays: string[];  // Dates
    leaves: string[]; // Dates
}

interface MarkAttendanceRequest extends PartialUser {
    image: File | string;
    dateTime: string;
    
    // location: string; // co-ordinates in future
}