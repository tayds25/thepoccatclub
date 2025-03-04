function Support() {

    return (
        <div className="container mx-auto px-4 py-16">

            {/* CONTENT HERE */}

            <div className="flex flex-col items-center text-center">
                <h2 className="font-bold text-3xl mb-4">Support POC Cat Club</h2>
                <p className="text-lg mb-8">Your donations help us care for and rehome cats in need. Choose a way to contribute below.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
                {/* GCash QR Code */}
                <div className="flex flex-col items-center w-1/3">
                    <h3 className="font-semibold text-xl">Donate via GCash</h3>
                    <img src="uploads\gcashqr.jpg" alt="GCash QR Code" className="w-64 h-64 mt-2" />
                </div>

                {/* Bank Transfer QR Code */}
                <div className="flex flex-col items-center w-1/3">
                    <h3 className="font-semibold text-xl">Donate via Bank Transfer</h3>
                    <img src="uploads\banktransfer.jpg" alt="Bank Transfer QR Code" className="w-64 h-64 mt-2" />
                </div>
                
                {/* Shopee Link */}
                <div className="flex flex-col items-center w-1/3">
                    <h3 className="font-semibold text-xl">Support Us on Shopee</h3>
                    <a href="https://shopee.ph/anngelvezon?uls_trackid=524s6is901qa&utm_content=32HvsaaVcdY3zuxTeFJ2no4marnb" target="_blank" rel="noopener noreferrer">
                        <img src="uploads\shopee.png" alt="Shop on Shopee" className="w-32 h-32 mt-2 hover:scale-105 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Support