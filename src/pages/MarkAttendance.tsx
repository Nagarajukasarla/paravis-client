import { attendance } from "@/api/attendance";
import { useUserData } from "../hooks/useUserData";
import { usePreferencesData } from "../hooks/usePreferencesData";
import CameraPreview from "@/components/feature/CameraPreview";
import Spinner from "@/components/feature/Spinner";
import UserProfileCard from "@/components/feature/UserProfileCard";
import React, { useState, useEffect } from "react";
import APIResponse from "@/classes/APIResponse";

const MarkAttendance: React.FC = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [capturedFile, setCapturedFile] = useState<File | null>(null);
    const [isMarkedInTime, setIsMarkedInTime] = useState(false);
    const [isMarkedOutTime, setIsMarkedOutTime] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMarkedStatus, setLoadingMarkedStatus] = useState(false);

    const { user, loading: loadingUser } = useUserData();
    const { loading: loadingPreferences } = usePreferencesData();

    const handleCapture = (previewUrl: string, file: File) => {
        if (capturedImage) {
            URL.revokeObjectURL(capturedImage);
        }
        setCapturedImage(previewUrl);
        setCapturedFile(file);
    };

    const resetImage = () => {
        if (capturedImage) {
            URL.revokeObjectURL(capturedImage);
        }
        setCapturedImage(null);
        setCapturedFile(null);
    };

    useEffect(() => {
        return () => {
            if (capturedImage) URL.revokeObjectURL(capturedImage);
        };
    }, [capturedImage]);

    const handleMarkIn = async () => {
        if (!capturedFile) {
            alert("Please take a picture first!");
            return;
        }

        const formData = new FormData();
        formData.append("inTime", new Date().toISOString());
        formData.append("image", capturedFile);

        try {
            setLoading(true);
            const response = await attendance.mark(formData);
            if (response.code === APIResponse.SUCCESS) {
                setIsMarkedInTime(true);
            } else {
                alert("Failed to mark In time!");
            }
        } catch (err) {
            console.error("Error marking attendance:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkOut = async () => {
        const formData = new FormData();
        formData.append("outTime", new Date().toISOString());

        try {
            setLoading(true);
            const response = await attendance.mark(formData);
            if (response.code === APIResponse.SUCCESS) {
                setIsMarkedOutTime(true);
            } else {
                alert("Failed to mark out time!");
            }
        } catch (err) {
            console.error("Error marking attendance:", err);
        } finally {
            setLoading(false);
        }
    }

    const hasAlreadyMarkedInTime = () => {
        const today = new Date().toISOString().split("T")[0];
        console.log("today: ", today);
        return user?.attended.some((attendance: any) => {
            const attendanceDate = attendance.inTime?.split("T")[0];
            return attendanceDate === today;
        });
    }

    const hasAlreadyMarkedOutTime = () => {
        const today = new Date().toISOString().split("T")[0];
        console.log("today: ", today);
        return user?.attended.some((attendance: any) => {
            const attendanceDate = attendance.outTime?.split("T")[0];
            return attendanceDate === today;
        });
    }

    useEffect(() => {
        setLoadingMarkedStatus(true);
        setIsMarkedInTime(hasAlreadyMarkedInTime());
        setIsMarkedOutTime(hasAlreadyMarkedOutTime());
        setLoadingMarkedStatus(false);
    }, [user]);

    if (loadingUser) {
        return <Spinner />;
    }

    if (loadingPreferences) {
        return <Spinner />;
    }

    if (loadingMarkedStatus) {
        return <Spinner />;
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6">
                <CameraPreview
                    capturedImage={capturedImage}
                    onCapture={handleCapture}
                    isMarkedInTime={isMarkedInTime}
                    isMarkedOutTime={isMarkedOutTime}
                />

                <UserProfileCard name={user?.name} employeeId={user?.empId} />

                {!isMarkedInTime && (
                    <>
                        {capturedImage ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={resetImage}
                                    className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg transition hover:bg-gray-500"
                                >
                                    RETAKE
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={handleMarkIn}
                                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition hover:bg-primary/90"
                                >
                                    {loading ? "MARKING..." : "MARK IN"}
                                </button>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-sm">
                                Tap “Take Picture” below the camera view to capture your image.
                            </p>
                        )}
                    </>
                )}

                {(isMarkedInTime) && (
                    <div className="text-center text-green-600 font-semibold">
                        {!isMarkedOutTime ? (
                            <button
                                onClick={handleMarkOut}
                                className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition hover:bg-primary/90"
                            >
                                {loading ? "MARKING..." : "MARK OUT"}
                            </button>
                        ): (
                            <p className="text-center text-green-600 font-semibold">
                                ✅ Already marked Out Time
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendance;
