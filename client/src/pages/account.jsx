import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import accountImg from '../assets/account_img.png';
import { postData } from '../utils/api';

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
            const endpoint = isLoginMode ? '/user/login' : '/user/register';
            const data = await postData(endpoint, formData);

            if (isLoginMode) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsLoggedIn(true);
                setUserData(data.user);
            } else {
                const userData = {
                    _id: data.userId,
                    name: data.name,
                    email: data.email,
                    isAdmin: false
                };
                localStorage.setItem('user', JSON.stringify(userData));
                setIsLoggedIn(true);
                setUserData(userData);
            }

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: ''
            });

        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
    };

    // Animation variants
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: {
            scale: 1.05,
            backgroundColor: "#566637",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    // If user is logged in, show account details
    if (isLoggedIn && userData) {
        return (
            <motion.div
                className="container mx-auto px-4 py-16"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <motion.div
                    className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="bg-[#A5B68D] p-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <h1 className="text-2xl font-bold text-white">My Account</h1>
                    </motion.div>

                    <div className="p-6">
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                            <motion.div
                                className="border-b pb-2 mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium ml-2">{userData.name}</span>
                            </motion.div>
                            <motion.div
                                className="border-b pb-2 mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                            >
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium ml-2">{userData.email}</span>
                            </motion.div>
                            {userData.isAdmin && (
                                <motion.div
                                    className="border-b pb-2 mb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7, duration: 0.4 }}
                                >
                                    <span className="text-gray-600">Role:</span>
                                    <span className="font-medium ml-2 text-green-600">Administrator</span>
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 bg-[#687c57] hover:bg-[#566637] text-white rounded-md transition-colors"
                            variants={buttonVariants}
                            initial="idle"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Sign Out
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // If not logged in, show login/register form
    return (
        <motion.div
            className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            {/* Left side - Image */}
            <motion.div
                className="hidden md:block md:w-1/2 bg-cover bg-center"
                style={{backgroundImage: `url(${accountImg})`}}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
            </motion.div>

            {/* Right side - Form */}
            <motion.div
                className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-[#FFFDF0]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full max-w-md">
                    {/* Form Header with Toggle */}
                    <motion.div
                        className="flex flex-col items-center mb-6"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-3xl font-bold text-[#687c57] mb-4"
                            layout
                        >
                            {isLoginMode ? "Welcome Back" : "Create an Account"}
                        </motion.h2>
                        <div className="bg-white rounded-full p-1 flex w-full max-w-xs shadow-md">
                            <motion.button
                                onClick={() => setIsLoginMode(true)}
                                className={`w-1/2 py-2 rounded-full transition-colors ${isLoginMode ? 'bg-[#A5B68D] text-white' : 'text-gray-600'}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign In
                            </motion.button>
                            <motion.button
                                onClick={() => setIsLoginMode(false)}
                                className={`w-1/2 py-2 rounded-full transition-colors ${!isLoginMode ? 'bg-[#A5B68D] text-white' : 'text-gray-600'}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                Register
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Error Display */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="block sm:inline">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-xl rounded-lg overflow-hidden border border-[#A5B68D]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.div
                            className="px-8 py-6"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Name field - only show in register mode */}
                            <AnimatePresence>
                                {!isLoginMode && (
                                    <motion.div
                                        className="mb-4"
                                        variants={inputVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <motion.input
                                            id="name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                            required={!isLoginMode}
                                            whileFocus={{ scale: 1.01 }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                className="mb-4"
                                variants={inputVariants}
                            >
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <motion.input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                    required
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.div
                                className="mb-6"
                                variants={inputVariants}
                            >
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <motion.input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md border-gray-300 focus:border-[#687c57] focus:outline-none focus:ring-1 focus:ring-[#687c57]"
                                    required
                                    minLength={!isLoginMode ? 6 : undefined}
                                    whileFocus={{ scale: 1.01 }}
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-[#687c57] hover:bg-[#566637] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5B68D] disabled:opacity-70"
                                variants={buttonVariants}
                                initial="idle"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {isLoading ? "Processing..." : (isLoginMode ? "Sign In" : "Create Account")}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Account;