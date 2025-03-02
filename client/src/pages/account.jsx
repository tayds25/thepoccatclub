import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import accountImg from '../assets/account_img.png';

function Account() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const url = isLoginMode
                ? 'http://localhost:5050/user/login'
                : 'http://localhost:5050/user/register';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || (isLoginMode ? "Login failed" : "Registration failed"));
            }

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(isLoginMode ? data.user : {
                _id: data.userId,
                name: data.name,
                email: data.email
            }));

            setIsLoggedIn(true);
            setUserData(isLoginMode ? data.user : {
                _id: data.userId,
                name: data.name,
                email: data.email
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: ''
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
    };

    // If user is logged in, show account details
    if (isLoggedIn && userData) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-[#A5B68D] p-6">
                        <h1 className="text-2xl font-bold text-white">My Account</h1>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                            <div className="border-b pb-2 mb-2">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium ml-2">{userData.name}</span>
                            </div>
                            <div className="border-b pb-2 mb-2">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium ml-2">{userData.email}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 bg-[#687c57] hover:bg-[#566637] text-white rounded-md transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If not logged in, show login/register form
    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
            {/* Left side - Image */}
            <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{backgroundImage: `url(${accountImg})`}}>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-[#FFFDF0]">
                <div className="w-full max-w-md">
                    {/* Form Header with Toggle */}
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-3xl font-bold text-[#687c57] mb-4">
                            {isLoginMode ? "Welcome Back" : "Create an Account"}
                        </h2>
                        <div className="bg-white rounded-full p-1 flex w-full max-w-xs shadow-md">
                            <button
                                onClick={() => setIsLoginMode(true)}
                                className={`w-1/2 py-2 rounded-full transition-colors ${isLoginMode ? 'bg-[#A5B68D] text-white' : 'text-gray-600'}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsLoginMode(false)}
                                className={`w-1/2 py-2 rounded-full transition-colors ${!isLoginMode ? 'bg-[#A5B68D] text-white' : 'text-gray-600'}`}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden border border-[#A5B68D]">
                        <div className="px-8 py-6">
                            {/* Name field - only show in register mode */}
                            {!isLoginMode && (
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                        required={!isLoginMode}
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                    required
                                    minLength={!isLoginMode ? 6 : undefined}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-[#687c57] hover:bg-[#566637] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5B68D] disabled:opacity-70"
                            >
                                {isLoading ? "Processing..." : (isLoginMode ? "Sign In" : "Create Account")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Account;