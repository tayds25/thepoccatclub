const Footer = () => {
    return (
        <footer className="bg-[#748E63] text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start">

                {/* Logo and Club Name */}
                <div className="flex flex-col items-start">
                <img
                    src="logo.png"
                    alt="POC Cat Club Logo"
                    className="h-12 w-12 mb-2"
                />
                <span className="text-lg font-semibold">
                    POC Cat Club
                </span>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col items-end">
                <h3 className="text-lg font-semibold mb-2">
                    Contact Us
                </h3>
                <p>Telephone: 1234-5678</p>
                </div>
            </div>
            </div>
        </footer>
        )
    }

export default Footer