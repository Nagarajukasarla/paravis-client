/**
 * Option for select component
 */
export type Option = {
    /**
     * Key of the option
     */
    key: string;
    /**
     * Label of the option
     */
    label: string;
    /**
     * Value of the option
     */
    value: string;
    /**
     * Complete object associated with the option
     */
    object?: any;
}

export type BasicContainerProps = {
    className?: string;
}

export interface BasicPageProps {
    title: string;
    description?: string;
}

export type DaySpecificationType = "holiday" | "weekend" | "attended" | "halfday" | "leave" | "unattended" | "overtime" | "extra";

export interface DaySpecification {
    type: DaySpecificationType;
    date: string;
    inTime?: string;
    outTime?: string;
    description?: string;
}