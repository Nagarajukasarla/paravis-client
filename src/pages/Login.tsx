import React, { useState } from "react";
import CInput from "@/components/core/CInput";
import CButton from "@/components/core/CButton";
import Input from "@/components/ui/Input";
import { authService } from "@/api/authService";
import APIResponse from "@/classes/APIResponse";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/feature/Spinner";

const Login: React.FC = () => {
    const { isAuthorized, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await authService.login(email, password);
            console.log(response);
            if (response.code === APIResponse.SUCCESS) {
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (isAuthorized) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/images/Parvis.png" alt="Logo" className="w-24 h-24 rounded-lg object-cover" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email/Username Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email or Username
                        </label>
                        <CInput
                            value={email}
                            placeholder="Enter your email or username"
                            onChange={e => setEmail(e.target.value)}
                            styles="w-full"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <Input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <CButton
                        type="submit"
                        className="w-full py-3 text-center font-semibold flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div
                                    className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        border: "2px solid #ffffff",
                                        borderTop: "2px solid transparent",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite"
                                    }}
                                />
                                <p className="text-white">Logging in...</p>
                            </>
                        ) : (
                            <p className="text-white">Login</p>
                        )}
                    </CButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
