const Footer = () => {
    return (
        <footer className="bg-[#748E63] text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-between items-start gap-6">

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
                        <p>Just a group of healthcare workers trying to do more.</p>
                    </div>

                    {/* Instagram Section (Center) */}
                    <div className="flex flex-col items-center text-center mt-3">
                        <h3 className="text-lg font-semibold mb-2">Follow Us!</h3>
                        <a
                            href="https://www.instagram.com/thepoccatclub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-200 transition-colors flex flex-col items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" className="mb-2 hover:scale-110 transition-transform">
                                <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/>
                            </svg>
                            <span className="text-sm">@thepoccatclub</span>
                        </a>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col items-end">
                        <h3 className="text-lg font-semibold mb-2">
                            Contact Us
                        </h3>
                        <p>MARIE ANGELIQUE T. GELVEZON, RND, MD, MBA</p>
                        <p>General Psychiatry</p>
                        <p>Clinic Coordinator (Francine) - 09178212537</p>
                        <p>angelique.gelvezon@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer