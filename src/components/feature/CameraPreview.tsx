import React, { useEffect, useRef, useState } from "react";

const CameraPreview: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError("Camera access denied or unavailable.");
                console.error("Error accessing camera:", err);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            {error ? (
                <div className="flex items-center justify-center h-64 text-red-600 font-medium">{error}</div>
            ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover bg-gray-100" />
            )}

            {/* Overlay circle and guide text */}
            {!error && (
                <>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 border-4 border-orange-400 rounded-full flex items-center justify-center">
                            <div className="w-10 h-10 border-t-4 border-orange-400 rounded-full animate-spin"></div>
                        </div>
                    </div>
                    <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        Align face within the circle
                    </p>
                </>
            )}
        </div>
    );
};

export default CameraPreview;
