import { motion } from "framer-motion";

function Support() {

    return (
        <motion.div 
            className="container mx-auto px-4 py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="font-bold text-3xl mb-4">Support POC Cat Club</h2>
                <p className="text-lg mb-8">Your donations help us care for and rehome cats in need. Choose a way to contribute below.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
                {[
                    { title: "Donate via GCash", src: "uploads/gcashqr.jpg", delay: 0.4 },
                    { title: "Donate via Bank Transfer", src: "uploads/banktransfer.jpg", delay: 0.4 },
                    { title: "Support Us on Shopee", src: "uploads/shopee.png", delay: 0.8, link: "https://shopee.ph/anngelvezon?uls_trackid=524s6is901qa&utm_content=32HvsaaVcdY3zuxTeFJ2no4marnb" }
                ].map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="flex flex-col items-center w-1/3"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: item.delay }}
                    >
                        <h3 className="font-semibold text-xl">{item.title}</h3>
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <motion.img 
                                    src={item.src} 
                                    alt={item.title} 
                                    className="w-32 h-32 mt-2 hover:scale-105 transition-transform"
                                    whileHover={{ scale: 1.1 }}
                                />
                            </a>
                        ) : (
                            <motion.img 
                                src={item.src} 
                                alt={item.title} 
                                className="w-64 h-64 mt-2"
                                whileHover={{ scale: 1.05 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default Support