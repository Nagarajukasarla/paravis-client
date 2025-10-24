import React, { useState } from "react";
import CInput from "@/components/core/CInput";
import CButton from "@/components/core/CButton";
import Input from "@/components/ui/Input";
import { authService } from "@/api/authService";
import APIResponse from "@/classes/APIResponse";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        authService.login(email, password).then(response => {
            console.log(response);
            if (response.code === APIResponse.SUCCESS) {
                navigate("/");
            }
        });
    };

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
                    <CButton type="submit" className="w-full py-3 text-center font-semibold">
                        <p className="text-white">Login</p>
                    </CButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
