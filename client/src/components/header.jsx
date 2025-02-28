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