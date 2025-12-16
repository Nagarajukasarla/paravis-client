// import React, { useEffect, useRef, useState } from "react";

// interface CameraPreviewProps {
//     capturedImage: string | null;
//     onCapture: (image: string) => void;
//     isMarked: boolean;
// }

// const CameraPreview: React.FC<CameraPreviewProps> = ({
//     capturedImage,
//     onCapture,
//     isMarked,
// }) => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [stream, setStream] = useState<MediaStream | null>(null);

//     // ✅ Start camera whenever capturedImage is cleared (Retake)
//     useEffect(() => {
//         if (isMarked || capturedImage) return; // don’t start if already marked or has image

//         const startCamera = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 setStream(stream);
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             } catch (err) {
//                 setError("Camera access denied or unavailable.");
//                 console.error("Error accessing camera:", err);
//             }
//         };

//         startCamera();

//         return () => {
//             if (stream) {
//                 stream.getTracks().forEach((track) => track.stop());
//             }
//         };
//     }, [capturedImage, isMarked]);

//     // ✅ Take a picture safely only when video has loaded metadata
//     const takePicture = () => {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         if (!video || !canvas) return;

//         if (video.videoWidth === 0 || video.videoHeight === 0) {
//             alert("Camera not ready yet. Please wait a second and try again.");
//             return;
//         }

//         const context = canvas.getContext("2d");
//         if (!context) return;

//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const imageData = canvas.toDataURL("image/jpeg");
//         onCapture(imageData);
//     };

//     return (
//         <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
//             {error ? (
//                 <div className="flex items-center justify-center h-64 text-red-600 font-medium">
//                     {error}
//                 </div>
//             ) : isMarked ? (
//                 <div className="flex flex-col items-center justify-center h-64 bg-green-100 text-green-700 font-semibold">
//                     ✅ Already Marked
//                 </div>
//             ) : capturedImage ? (
//                 <img
//                     src={capturedImage}
//                     alt="Captured"
//                     className="w-full h-64 object-cover"
//                 />
//             ) : (
//                 <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     muted
//                     onLoadedMetadata={() => videoRef.current?.play()}
//                     className="w-full h-64 object-cover"
//                 />
//             )}

//             {!error && !capturedImage && !isMarked && (
//                 <>
//                     {/* Overlay */}
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <div className="w-40 h-40 border-4 border-orange-400 rounded-full flex items-center justify-center">
//                             <div className="w-10 h-10 border-t-4 border-orange-400 rounded-full animate-spin"></div>
//                         </div>
//                     </div>
//                     <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
//                         Align face within the circle
//                     </p>
//                     <button
//                         onClick={takePicture}
//                         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-orange-600 transition"
//                     >
//                         Take Picture
//                     </button>
//                 </>
//             )}

//             <canvas ref={canvasRef} className="hidden" />
//         </div>
//     );
// };

// export default CameraPreview;



// VERSION -2 

// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface CameraPreviewProps {
//   capturedImage: string | null; // object URL or null
//   onCapture: (previewUrl: string, file: File) => void;
//   isMarked: boolean;
// }

// const CameraPreview: React.FC<CameraPreviewProps> = ({
//   capturedImage,
//   onCapture,
//   isMarked,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const activeStreamRef = useRef<MediaStream | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isCameraStarting, setIsCameraStarting] = useState(false);

//   // helper to stop stream
//   const stopActiveStream = () => {
//     const s = activeStreamRef.current;
//     if (s) {
//       s.getTracks().forEach((t) => t.stop());
//       activeStreamRef.current = null;
//     }
//   };

//   // start camera when needed
//   useEffect(() => {
//     let mounted = true;

//     const startCamera = async () => {
//       // If already starting, no-op
//       if (isCameraStarting) return;
//       setError(null);
//       setIsCameraStarting(true);

//       try {
//         // stop old stream (if any) before starting new
//         stopActiveStream();

//         const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
//         if (!mounted) {
//           // component unmounted after permission -> stop immediately
//           stream.getTracks().forEach(t => t.stop());
//           return;
//         }
//         activeStreamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         setError("Camera access denied or unavailable.");
//         console.error("Error accessing camera:", err);
//       } finally {
//         setIsCameraStarting(false);
//       }
//     };

//     // Only start camera when NOT marked and NOT showing captured image
//     if (!isMarked && !capturedImage) {
//       startCamera();
//     } else {
//       // if we have captured image or marked state, stop camera to free it
//       stopActiveStream();
//     }

//     return () => {
//       mounted = false;
//       stopActiveStream();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [capturedImage, isMarked]); // restarts camera when capturedImage becomes null (retake)

//   // take picture -> convert to blob -> create File and preview URL
//   const takePicture = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas) return;

//     // ensure metadata loaded; if not, try a small delay
//     if (video.videoWidth === 0 || video.videoHeight === 0) {
//       // Try waiting a short moment for camera to warm up
//       await new Promise((r) => setTimeout(r, 300));
//       if (video.videoWidth === 0 || video.videoHeight === 0) {
//         alert("Camera not ready yet. Please wait a second and try again.");
//         return;
//       }
//     }

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // toBlob is async
//     canvas.toBlob(
//       (blob) => {
//         if (!blob) {
//           alert("Unable to capture image");
//           return;
//         }

//         const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });
//         const previewUrl = URL.createObjectURL(blob);

//         // stop camera after capture (free device). Parent can call retake to restart
//         stopActiveStream();

//         onCapture(previewUrl, file);
//       },
//       "image/jpeg",
//       0.9
//     );
//   };

//   return (
//     <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
//       {error ? (
//         <div className="flex items-center justify-center h-64 text-red-600 font-medium">
//           {error}
//         </div>
//       ) : (
//         <AnimatePresence mode="wait">
//           {isMarked ? (
//             <motion.div
//               key="marked"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex flex-col items-center justify-center h-64 bg-green-100 text-green-700 font-semibold"
//             >
//               ✅ Already Marked
//             </motion.div>
//           ) : capturedImage ? (
//             <motion.img
//               key="preview"
//               src={capturedImage}
//               alt="Captured"
//               className="w-full h-64 object-cover"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//           ) : (
//             <motion.video
//               key="video"
//               ref={videoRef}
//               autoPlay
//               playsInline
//               muted
//               onLoadedMetadata={() => videoRef.current?.play()}
//               className="w-full h-64 object-cover bg-black/5"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//           )}
//         </AnimatePresence>
//       )}

//       {!error && !capturedImage && !isMarked && (
//         <>
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <div className="w-40 h-40 border-4 border-orange-400 rounded-full flex items-center justify-center">
//               <div className="w-10 h-10 border-t-4 border-orange-400 rounded-full animate-spin" />
//             </div>
//           </div>

//           <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
//             Align face within the circle
//           </p>

//           <button
//             onClick={takePicture}
//             className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-orange-600 transition"
//           >
//             Take Picture
//           </button>
//         </>
//       )}

//       <canvas ref={canvasRef} className="hidden" />
//     </div>
//   );
// };

// export default CameraPreview;



// VERSION - 3
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CameraPreviewProps {
    capturedImage: string | null; // object URL or null
    onCapture: (previewUrl: string, file: File) => void;
    isMarkedInTime: boolean;
    isMarkedOutTime: boolean
}
const CameraPreview: React.FC<CameraPreviewProps> = ({
    capturedImage,
    onCapture,
    isMarkedInTime,
    isMarkedOutTime,
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const activeStreamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCameraStarting, setIsCameraStarting] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    // helper to stop stream
    const stopActiveStream = () => {
        const s = activeStreamRef.current;
        if (s) {
            s.getTracks().forEach((t) => t.stop());
            activeStreamRef.current = null;
        }
    };

    // start camera when needed
    useEffect(() => {
        let mounted = true;

        const startCamera = async () => {
            if (isCameraStarting || activeStreamRef.current) return; // already starting or active
            setError(null);
            setIsCameraStarting(true);

            try {
                stopActiveStream();
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                });
                if (!mounted) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }
                activeStreamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError("Camera access denied or unavailable.");
                console.error("Error accessing camera:", err);
            } finally {
                setIsCameraStarting(false);
            }
        };

        if (!isMarkedInTime && !isMarkedOutTime && !capturedImage && !activeStreamRef.current) {
            startCamera();
        } else {
            stopActiveStream();
        }

        // Stop camera if tab hidden
        const handleVisibilityChange = () => {
            if (document.hidden) stopActiveStream();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            mounted = false;
            stopActiveStream();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [capturedImage, isMarkedInTime, isMarkedOutTime]);

    // take picture -> convert to blob -> create File and preview URL
    const takePicture = async () => {
        if (isCapturing) return;
        setIsCapturing(true);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
            setIsCapturing(false);
            return;
        }

        // wait for metadata if not ready
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            await new Promise((r) => setTimeout(r, 300));
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                alert("Camera not ready yet. Please wait a second and try again.");
                setIsCapturing(false);
                return;
            }
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            setIsCapturing(false);
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    alert("Unable to capture image");
                    setIsCapturing(false);
                    return;
                }

                const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });
                const previewUrl = URL.createObjectURL(blob);

                stopActiveStream();
                onCapture(previewUrl, file);

                // reset throttle flag
                setTimeout(() => setIsCapturing(false), 800);
            },
            "image/jpeg",
            0.9
        );
    };

    return (
        <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
            {error ? (
                <div className="flex items-center justify-center h-64 text-red-600 font-medium">
                    {error}
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {(isMarkedInTime || isMarkedOutTime) ? (
                        <motion.div
                            key="marked"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-64 bg-green-100 text-green-700 font-semibold"
                        >
                            {`✅ Already Marked ${isMarkedOutTime ? 'Out' : 'In'} Time`}
                        </motion.div>
                    ) : capturedImage ? (
                        <motion.img
                            key="preview"
                            src={capturedImage}
                            alt="Captured"
                            className="w-full h-64 object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    ) : (
                        <motion.video
                            key="video"
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            onLoadedMetadata={() => videoRef.current?.play()}
                            className="w-full h-64 object-cover bg-black/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </AnimatePresence>
            )}

            {isCameraStarting && !error && !capturedImage && !isMarkedInTime && !isMarkedOutTime && (
                <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-sm">
                    Starting camera...
                </div>
            )}

            {!error && !capturedImage && !isMarkedInTime && !isMarkedOutTime && !isCameraStarting && (
                <>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 border-t-4 border-orange-400 rounded-full animate-spin" />
                    </div>
                    <button
                        onClick={takePicture}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-orange-600 transition"
                    >
                        Take Picture
                    </button>
                </>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

// Memoized to prevent re-renders from parent
export default React.memo(CameraPreview);
