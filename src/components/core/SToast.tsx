import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface ToastMessage {
    title?: string;
    description?: string;
    type: "success" | "error" | "info" | "warning" | "default";
}

/**
 * Toast utility wrapper similar to your SSelect
 */
export const SToast = {
    show: ({ title = "" , description = "", type = "default" }: ToastMessage) => {
        const base = { description };

        switch (type) {
            case "success":
                toast.success(title, {
                    ...base,
                    icon: <CheckCircle className="text-green-500 w-4 h-4" />,
                });
                break;

            case "error":
                toast.error(title, {
                    ...base,
                    icon: <XCircle className="text-red-500 w-4 h-4" />,
                });
                break;

            case "warning":
                toast.warning(title, {
                    ...base,
                    icon: <AlertTriangle className="text-yellow-500 w-4 h-4" />,
                });
                break;

            case "info":
                toast.info(title, {
                    ...base,
                    icon: <Info className="text-blue-500 w-4 h-4" />,
                });
                break;

            default:
                toast(title, {
                    ...base,
                    icon: <Info className="text-gray-600 w-4 h-4" />,
                });
        }
    },
};
