import React, { useState } from "react";
import Modal from "@/components/layout/Modal";
import CSelect from "@/components/core/CSelect";
import { userService } from "@/api/userService";
import type { Leave, LeaveType } from "@/types/api";
import APIResponse from "@/classes/APIResponse";
import { SToast } from "@/components/core/SToast";
import { Toaster } from "sonner";

const leaveTypeOptions = [
    { key: "EMERGENCY", label: "Emergency Leave", value: "EMERGENCY" },
    { key: "CASUAL", label: "Casual Leave", value: "CASUAL" },
    { key: "SICK", label: "Sick Leave", value: "SICK" },
];

const initialLeave = {
    type: "CASUAL" as LeaveType,
    date: "",
};

const ApplyLeave: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    const [leave, setLeave] = useState<Leave>(initialLeave);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    // Update form validity when leave state changes
    React.useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day

        const selectedDate = leave.date ? new Date(leave.date) : null;
        const isDateValid = selectedDate && selectedDate >= today;
        const isFormComplete = leave.type && isDateValid;

        setIsFormValid(!!isFormComplete);
    }, [leave]);

    const leaveHandler = async () => {
        SToast.show({ title: "Success applying leave", type: "success" });

        try {
            const response = await userService.applyLeave(leave);
            if (response.code === APIResponse.SUCCESS) {
                // show success message (replace with your preferred toast/message)
                // setSuccess(true);
                SToast.show({ title: "Success applying leave", type: "success" });
                onClose();
            } else {
                // show error message (replace with your preferred toast/message)
                SToast.show({ title: "Error applying leave", type: "error" });
            }
        } catch (err) {
            // show error message (replace with your preferred toast/message)
            alert("Error applying leave");
            console.error("Error marking attendance:", err);
        }
    };

    if (!visible) return null;

    return (
        <Modal onClose={onClose} onConfirm={leaveHandler} disabled={!isFormValid}>
            <div className="p-4 min-w-[250px] w-full">
                <Toaster
                    position="top-center"
                    richColors
                    toastOptions={{
                        className: "flex items-center justify-center text-center h-9",
                        style: {
                            width: "250px",      // fixed width WORKS here
                            padding: "10px",     // adjust padding
                            margin: "4px auto",  // centers the toast container
                        },
                    }}
                />
                <h2 className="mb-4 font-semibold text-lg text-gray-900">Apply for Leave</h2>
                <div className="mb-4">
                    <label className="block font-medium mb-1 text-gray-700">Leave Type</label>
                    <CSelect
                        options={leaveTypeOptions}
                        value={leaveTypeOptions.find(opt => opt.key === leave.type) || leaveTypeOptions[0]}
                        onValueChange={opt => setLeave(l => ({ ...l, type: opt.key as LeaveType }))}
                        placeholder="Select leave type"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium mb-1 text-gray-700">Date</label>
                    <input
                        type="date"
                        value={leave.date}
                        onChange={e => setLeave(l => ({ ...l, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <p className="text-xs text-gray-500">Note: Leave can only be applied for today and future dates</p>
            </div>
        </Modal>
    );
};

export default ApplyLeave;
