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
    const [isMarked, setIsMarked] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleMarkAttendance = async () => {
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
                setIsMarked(true);
            } else {
                alert("Failed to mark attendance!");
            }
        } catch (err) {
            console.error("Error marking attendance:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loadingUser) {
        return <Spinner />;
    }

    if (loadingPreferences) {
        return <Spinner />;
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6">
                <CameraPreview
                    capturedImage={capturedImage}
                    onCapture={handleCapture}
                    isMarked={isMarked}
                />

                <UserProfileCard name={user?.name} employeeId={user?.empId} />

                {!isMarked && (
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
                                    onClick={handleMarkAttendance}
                                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition hover:bg-primary/90"
                                >
                                    {loading ? "MARKING..." : "MARK"}
                                </button>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-sm">
                                Tap “Take Picture” below the camera view to capture your image.
                            </p>
                        )}
                    </>
                )}

                {isMarked && (
                    <div className="text-center text-green-600 font-semibold">
                        ✅ Attendance already marked
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendance;
