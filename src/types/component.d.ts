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

interface BasicPageProps {
    title: string;
    description?: string;
}