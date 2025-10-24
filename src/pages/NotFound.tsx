import React from "react";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            {/* Illustration */}
            <div className="relative mb-8">
                <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
                    {/* Background circle */}
                    <circle cx="150" cy="100" r="90" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />

                    {/* Person */}
                    <g transform="translate(120, 60)">
                        {/* Head */}
                        <circle cx="10" cy="10" r="15" fill="#FDBCB4" />
                        {/* Hair */}
                        <path d="M0 5 Q10 0 20 5" fill="#8B4513" />
                        {/* Body */}
                        <rect x="0" y="25" width="20" height="30" fill="#FFFFFF" rx="5" />
                        {/* Arms */}
                        <line x1="5" y1="30" x2="0" y2="45" stroke="#FDBCB4" strokeWidth="3" />
                        <line x1="15" y1="30" x2="25" y2="40" stroke="#FDBCB4" strokeWidth="3" />
                        {/* Hand on head */}
                        <circle cx="25" cy="35" r="3" fill="#FDBCB4" />
                        {/* Legs */}
                        <line x1="5" y1="55" x2="5" y2="75" stroke="#4A90E2" strokeWidth="4" />
                        <line x1="15" y1="55" x2="15" y2="75" stroke="#4A90E2" strokeWidth="4" />
                    </g>

                    {/* Question mark bubble */}
                    <circle cx="200" cy="50" r="20" fill="#0EA5E9" />
                    <text x="200" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                        ?
                    </text>

                    {/* Clouds */}
                    <circle cx="80" cy="40" r="10" fill="white" opacity="0.8" />
                    <circle cx="90" cy="35" r="12" fill="white" opacity="0.8" />
                    <circle cx="100" cy="40" r="8" fill="white" opacity="0.8" />

                    <circle cx="220" cy="120" r="8" fill="white" opacity="0.8" />
                    <circle cx="230" cy="115" r="10" fill="white" opacity="0.8" />

                    {/* Cactus */}
                    <rect x="60" y="140" width="15" height="30" fill="#4CAF50" rx="2" />
                    <circle cx="67.5" cy="135" r="5" fill="#4CAF50" />
                    <circle cx="67.5" cy="145" r="4" fill="#4CAF50" />

                    {/* Abstract shapes */}
                    <polygon points="250,80 260,90 250,100 240,90" fill="#FFD54F" opacity="0.7" />
                    <circle cx="40" cy="120" r="5" fill="#FF7043" opacity="0.7" />
                </svg>
            </div>

            {/* 404 Text */}
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
                Sorry, the page you visited does not exist.
            </p>

            {/* Back Home Button */}
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                onClick={() => window.history.back()}
            >
                Back Home
            </button>
        </div>
    );
};

export default NotFound;
