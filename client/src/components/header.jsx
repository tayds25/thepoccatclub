import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="bg-[#FFFDF0] shadow-lg">
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
                            <span className="text-xl font-semibold text-gray-800">
                                POC Cat Club
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center">
                        <div className="hidden md:flex space-x-8">

                            {/* Admin Dropdown*/}
                            <div className="relative group">
                                <button className="text-gray-600 hover:text-gray-900 pb-2">
                                    Admin
                                </button>
                                <div className="absolute hidden group-hover:block left-0 mt-0 pt-2">
                                    <div className="bg-white p-4 rounded-lg border-2 border-gray-300 shadow-lg">
                                        <Link
                                            to="/adoptme"
                                            className="block px-2 py-2 text-gray-500 hover:text-gray-900 whitespace-nowrap"
                                        >
                                            Add Adoption Cat
                                        </Link>
                                        <Link
                                            to="/catrecord"
                                            className="block px-2 py-2 text-gray-500 hover:text-gray-900 whitespace-nowrap"
                                        >
                                            Edit Cat records
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link to="/" className="text-gray-600 hover:text-gray-900">
                                Home
                            </Link>
                            <Link to="/adopt" className="text-gray-600 hover:text-gray-900">
                                Adopt
                            </Link>
                            <Link to="/support" className="text-gray-600 hover:text-gray-900">
                                Support
                            </Link>
                            <Link to="/latest" className="text-gray-600 hover:text-gray-900">
                                Latest
                            </Link>
                            <Link to="/about" className="text-gray-600 hover:text-gray-900">
                                About
                            </Link>
                            <Link to="/account" className="text-gray-600 hover:text-gray-900">
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