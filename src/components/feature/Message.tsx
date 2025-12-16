import React, { useEffect } from "react";

export type MessageType = "success" | "error" | "warning";

interface MessageProps {
    type: MessageType;
    content: string;
    visible: boolean;
    duration?: number; // ms
    onClose?: () => void;
}

const typeStyles: Record<MessageType, string> = {
    success:
        "bg-green-700 text-white border-green-600",
    error:
        "bg-red-700 text-white border-red-600",
    warning:
        "bg-yellow-500 text-black border-yellow-400",
};

const Message: React.FC<MessageProps> = ({ type, content, visible, duration = 1000, onClose }) => {
    useEffect(() => {
        if (!visible) return;
        if (!onClose) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [visible, duration, onClose]);

    if (!visible) return null;

    return (
        <div
            className={`fixed top-6 left-1/2 z-[9999] -translate-x-1/2 px-5 py-2 min-w-[220px] max-w-[90vw] rounded-lg shadow-lg border flex items-center gap-2 transition-all duration-200 ${typeStyles[type]}`}
            style={{ pointerEvents: "none" }}
            role="alert"
        >
            {type === "success" && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
            {type === "error" && (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            {type === "warning" && (
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z" />
                </svg>
            )}
            <span className="text-base font-medium">{content}</span>
        </div>
    );
};

export default Message;
