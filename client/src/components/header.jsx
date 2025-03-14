import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    // Get current location to determine active page
    const location = useLocation();
    const currentPath = location.pathname;

    // Function to determine if a link is active
    const isActive = (path) => {
        return currentPath === path ? "text-white font-bold" : "text-gray-200 hover:text-white";
    };

    return (
        <nav className="bg-[#748E63] shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src="logo.png"
                                alt="POC Cat Club Logo"
                                className="h-8 w-8 mr-2"
                            />
                            <span className="text-xl font-semibold text-gray-200 transition duration-300 ease-in-out hover:text-white">
                                POC Cat Club
                            </span>
                        </Link>
                    </div>
                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div className="hidden md:flex space-x-8">
                            {/* Admin Dropdown*/}
                            <div className="relative group">
                                <button className={`transition duration-300 ease-in-out pb-2 ${currentPath.includes('/admin') ? 'text-white font-semibold' : 'text-gray-200 hover:text-white'}`}>
                                    Admin
                                </button>
                                <div className="absolute hidden group-hover:block left-0 mt-0 pt-2">
                                    <div className="bg-white p-4 rounded-lg border-2 shadow-lg">
                                        <Link
                                            to="/adoptme"
                                            className={`block px-2 py-2 transition duration-300 ease-in-out whitespace-nowrap ${currentPath === '/adoptme' ? 'bg-[#b3c4b5] text-gray-900 font-semibold' : 'text-gray-500 hover:bg-[#b3c4b5] hover:text-gray-900'}`}
                                        >
                                            Add Adoption Cat
                                        </Link>
                                        <Link
                                            to="/catrecord"
                                            className={`block px-2 py-2 transition duration-300 ease-in-out whitespace-nowrap ${currentPath === '/catrecord' ? 'bg-[#b3c4b5] text-gray-900 font-semibold' : 'text-gray-500 hover:bg-[#b3c4b5] hover:text-gray-900'}`}
                                        >
                                            Edit Cat records
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link to="/" className={`transition duration-300 ease-in-out ${isActive('/')}`}>
                                Home
                            </Link>
                            <Link to="/adopt" className={`transition duration-300 ease-in-out ${isActive('/adopt')}`}>
                                Adopt
                            </Link>
                            <Link to="/support" className={`transition duration-300 ease-in-out ${isActive('/support')}`}>
                                Support
                            </Link>
                            <Link to="/latest" className={`transition duration-300 ease-in-out ${isActive('/latest')}`}>
                                Latest
                            </Link>
                            <Link to="/about" className={`transition duration-300 ease-in-out ${isActive('/about')}`}>
                                About
                            </Link>
                            <Link to="/account" className={`transition duration-300 ease-in-out ${isActive('/account')}`}>
                                Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header