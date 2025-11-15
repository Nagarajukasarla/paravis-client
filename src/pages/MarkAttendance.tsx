// import { attendance } from "@/api/attendance";
// import CameraPreview from "@/components/feature/CameraPreview";
// import UserProfileCard from "@/components/feature/UserProfileCard";
// import { formatLocalDate } from "@/utils/dateUtils";
// import { getUser } from "@/utils/user";
// import React, { useState } from "react";

// const MarkAttendance: React.FC = () => {
//     const [capturedImage, setCapturedImage] = useState<string | null>(null);
//     const [isMarked, setIsMarked] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const resetImage = () => {
//         setCapturedImage(null);
//     };

//     const handleMarkAttendance = async () => {
//         if (!capturedImage) {
//             alert("Please take a picture first!");
//             return;
//         }

//         const currentUser = getUser();
//         const attendanceRequest: MarkAttendanceRequest = {
//             ...currentUser,
//             dateTime: formatLocalDate(new Date()),
//             image: capturedImage,
//         };

//         try {
//             setLoading(true);
//             const response = await attendance.mark(attendanceRequest);
//             if (response.type === "Success") {
//                 alert("Attendance marked successfully!");
//                 setIsMarked(true);
//             } else {
//                 alert("Failed to mark attendance!");
//             }
//         } catch (err) {
//             console.error("Error marking attendance:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-full flex items-center justify-center">
//             <div className="w-full max-w-md p-6 space-y-6">
//                 {/* Camera View */}
//                 <CameraPreview
//                     capturedImage={capturedImage}
//                     onCapture={setCapturedImage}
//                     isMarked={isMarked}
//                 />

//                 {/* User Info */}
//                 <UserProfileCard name="Jane Doe" employeeId="E12345" />

//                 {/* Buttons */}
//                 {!isMarked && (
//                     <>
//                         {capturedImage ? (
//                             <div className="flex gap-4">
//                                 <button
//                                     onClick={resetImage}
//                                     className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg transition hover:bg-gray-500"
//                                 >
//                                     RETAKE
//                                 </button>
//                                 <button
//                                     disabled={loading}
//                                     onClick={handleMarkAttendance}
//                                     className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition hover:bg-primary/90"
//                                 >
//                                     {loading ? "MARKING..." : "MARK"}
//                                 </button>
//                             </div>
//                         ) : (
//                             <p className="text-center text-gray-500 text-sm">
//                                 Tap “Take Picture” below the camera view to capture your image.
//                             </p>
//                         )}
//                     </>
//                 )}

//                 {isMarked && (
//                     <div className="text-center text-green-600 font-semibold">
//                         ✅ Attendance already marked
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MarkAttendance;


// // VERSION - 2

// import { attendance } from "@/api/attendance";
// import CameraPreview from "@/components/feature/CameraPreview";
// import UserProfileCard from "@/components/feature/UserProfileCard";
// import { formatLocalDate } from "@/utils/dateUtils";
// import { getUser } from "@/utils/user";
// import React, { useState, useEffect } from "react";

// const MarkAttendance: React.FC = () => {
//   const [capturedImage, setCapturedImage] = useState<string | null>(null); // object URL
//   const [capturedFile, setCapturedFile] = useState<File | null>(null);
//   const [isMarked, setIsMarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // onCapture from CameraPreview
//   const handleCapture = (previewUrl: string, file: File) => {
//     // Revoke previous object URL if present
//     if (capturedImage) {
//       URL.revokeObjectURL(capturedImage);
//     }
//     setCapturedImage(previewUrl);
//     setCapturedFile(file);
//   };

//   // reset -> revoke preview url and clear file -> CameraPreview will restart camera
//   const resetImage = () => {
//     if (capturedImage) {
//       URL.revokeObjectURL(capturedImage);
//     }
//     setCapturedImage(null);
//     setCapturedFile(null);
//   };

//   // cleanup on unmount: revoke any URL
//   useEffect(() => {
//     return () => {
//       if (capturedImage) URL.revokeObjectURL(capturedImage);
//     };
//   }, [capturedImage]);

//   const handleMarkAttendance = async () => {
//     if (!capturedFile) {
//       alert("Please take a picture first!");
//       return;
//     }

//     const currentUser = getUser();
//     const formData = new FormData();
//     formData.append("userId", currentUser.id || "");
//     formData.append("name", currentUser.name || "");
//     formData.append("dateTime", formatLocalDate(new Date()));
//     formData.append("image", capturedFile);

//     try {
//       setLoading(true);
//       const response = await attendance.mark(formData); // your api should accept FormData
//       if (response.type === "Success") {
//         setIsMarked(true);
//         // keep preview or revoke if you want
//         // URL.revokeObjectURL(capturedImage || "");
//       } else {
//         alert("Failed to mark attendance!");
//       }
//     } catch (err) {
//       console.error("Error marking attendance:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-full flex items-center justify-center">
//       <div className="w-full max-w-md p-6 space-y-6">
//         <CameraPreview
//           capturedImage={capturedImage}
//           onCapture={handleCapture}
//           isMarked={isMarked}
//         />

//         <UserProfileCard name="Jane Doe" employeeId="E12345" />

//         {!isMarked && (
//           <>
//             {capturedImage ? (
//               <div className="flex gap-4">
//                 <button
//                   onClick={resetImage}
//                   className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg transition hover:bg-gray-500"
//                 >
//                   RETAKE
//                 </button>
//                 <button
//                   disabled={loading}
//                   onClick={handleMarkAttendance}
//                   className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition hover:bg-primary/90"
//                 >
//                   {loading ? "MARKING..." : "MARK"}
//                 </button>
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 text-sm">
//                 Tap “Take Picture” below the camera view to capture your image.
//               </p>
//             )}
//           </>
//         )}

//         {isMarked && (
//           <div className="text-center text-green-600 font-semibold">
//             ✅ Attendance already marked
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;


import { attendance } from "@/api/attendance";
import CameraPreview from "@/components/feature/CameraPreview";
import UserProfileCard from "@/components/feature/UserProfileCard";
import { formatLocalDate } from "@/utils/dateUtils";
import { getUser } from "@/utils/user";
import React, { useState, useEffect } from "react";
import Spinner from "@/components/feature/Spinner";
import Cookies from "js-cookie";

const MarkAttendance: React.FC = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [capturedFile, setCapturedFile] = useState<File | null>(null);
    const [isMarked, setIsMarked] = useState(false);
    const [loading, setLoading] = useState(false);

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
        console.log(Cookies.get("user"));
        return () => {
            if (capturedImage) URL.revokeObjectURL(capturedImage);
        };
    }, [capturedImage]);

    const handleMarkAttendance = async () => {
        if (!capturedFile) {
            alert("Please take a picture first!");
            return;
        }

        const currentUser = getUser();
        const formData = new FormData();
        formData.append("userId", currentUser.id || "");
        formData.append("name", currentUser.name || "");
        formData.append("dateTime", new Date().toISOString());
        formData.append("image", capturedFile);

        try {
            setLoading(true);
            const response = await attendance.mark(formData);
            if (response.type === "Success") {
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

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6">
                <CameraPreview
                    capturedImage={capturedImage}
                    onCapture={handleCapture}
                    isMarked={isMarked}
                />

                <UserProfileCard name="Jane Doe" employeeId="E12345" />

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
