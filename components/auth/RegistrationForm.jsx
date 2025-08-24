'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/store';

const RegistrationForm = () => {
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);
    
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault();
        setFormError("");
        setSuccess(false);
        
        try {
            const formData = new FormData(event.currentTarget);
            const userData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone'),
                bio: formData.get('bio')
            };

            const result = await dispatch(registerUser(userData)).unwrap();

            // If we reach here, registration was successful
            if (result && result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                setFormError("Registration failed");
            }
        } catch (err) {
            // Handle Redux toolkit errors
            setFormError(err.message || "Registration failed. Please try again.");
        }
    }

    const displayError = formError || error;

    if (success) {
        return (
            <div className="text-center p-4">
                <div className="text-green-600 font-semibold mb-2">
                    Registration successful!
                </div>
                <div className="text-sm text-gray-600">
                    Redirecting to login page...
                </div>
            </div>
        );
    }

    return (
        <>
            {displayError && (
                <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded-md text-red-400">
                    <strong>Registration Error:</strong> {displayError}
                </div>
            )}
            <form className="login-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        required
                        minLength="6"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        placeholder="e.g., +1234567890 or 01712345678"
                        disabled={loading}
                    />
                    <small className="text-gray-500 text-xs mt-1 block">
                        Enter 10-15 digits (with optional country code, spaces, or dashes)
                    </small>
                </div>

                <div>
                    <label htmlFor="bio">Bio (Optional)</label>
                    <input 
                        className="min-h-16" 
                        type="text" 
                        name="bio" 
                        id="bio" 
                        placeholder="Tell us about yourself..."
                        maxLength="500"
                        disabled={loading}
                    />
                    <small className="text-gray-500 text-xs mt-1 block">
                        Maximum 500 characters
                    </small>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </>
    );
};

export default RegistrationForm;