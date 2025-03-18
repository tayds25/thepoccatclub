import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
        }}
    />
);

function About() {
    return (
        <div className="container mx-auto px-6 py-16 text-gray-800">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8"
            >
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-5xl font-extrabold text-green-600">About the POC Cat Club</h2>
                    <p className="text-xl mt-4">Learn More About Us!</p>
                </div>
                <div className="ml-auto">
                <a href="https://www.instagram.com/thepoccatclub/" target="_blank" rel="noopener noreferrer" >
                <motion.img 
                    src="logo.png" 
                    alt="Logo" 
                    className="w-64 md:w-80 drop-shadow-lg ml-auto"
                    whileHover={{ scale: 1.05 }}
                />
                </a>
                </div>
            </motion.div>

            {/** Section Component **/}
            {[
                { 
                    title: "The POC Cat Club", 
                    content: [
                        "The POC Cat Club began in March 2023 with a simple yet urgent mission — to protect and care for the cats that call the Philippine Orthopedic Center (POC) home. When Dr. Angelique Gelvezon, a newly assigned psychiatrist, first arrived at the hospital, she noticed an old cat trap — a sign that strays had been rounded up before, their fate uncertain. She could not just look away. Instead, she reached out, found like-minded volunteers, and together, they organized the first-ever TNVR (Trap-Neuter-Vaccinate-Return) program at POC.",
                        "What started as a small effort quickly became a movement. The hospital cats — once seen as pests or nuisances — were now seen as lives worth protecting. Through tireless rescues, feeding programs, and advocacy, the POC Cat Club has since spayed/neutered 189 cats, including hospital cats, strays from nearby areas, employees’ pets, and community cats from friends. More importantly, as of today, 37 cats have found loving, forever homes through official adoptions."
                    ], 
                    delay: 0.4 
                },
                { 
                    title: "Who We Are", 
                    content: [
                        "The POC Cat Club is made up of dedicated hospital employees with big hearts. We come from different backgrounds — nurses, nursing attendants, office personnel, doctors, security guards, and more — all united by a shared love for animals. Despite our busy schedules, we make time to care for, rescue, and advocate for the hospital’s cats, ensuring they are safe, healthy, and treated with kindness."
                    ], 
                    delay: 0.8 
                },
                { 
                    title: "Our Advocacy", 
                    content: [
                        "At our core, we believe that cats are part of the community and that people should learn to coexist peacefully with them — not just in homes, but in institutions, hospitals, and schools, where they have a rightful place alongside us. We hope for a future where hospitals and other institutions recognize cats as part of the environment rather than a problem to be removed. Instead of rounding them up and displacing them, humane solutions like TNVR can create a balanced, healthier, and more compassionate approach to coexistence.",
                        "We also strongly advocate for spaying and neutering as the most humane and effective way to prevent overpopulation and suffering. Additionally, we encourage people to adopt, not shop, because every stray, abandoned, or overlooked cat deserves a chance at a loving home. The POC Cat Club is built on the dedication of volunteers, rescuers, and animal lovers who believe in making a difference — one cat at a time. If you’d like to support our cause, join our TNVR efforts, adopt a cat, or help us spread awareness, we’d love to hear from you. Collectively, we can build a world where cats are seen, valued, and protected."
                    ], 
                    delay: 1.2 
                }
            ].map((section, index) => (
                <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: section.delay }}
                    className="text-center mt-16"
                >
                    <h2 className="text-4xl font-bold text-green-700">{section.title}</h2>
                    <ColoredLine color="green-500" />
                    {Array.isArray(section.content) 
                        ? section.content.map((para, i) => <p key={i} className="text-lg md:w-3/4 mx-auto mt-4 leading-relaxed">{para}</p>) 
                        : <p className="text-lg md:w-3/4 mx-auto mt-4 leading-relaxed">{section.content}</p>}
                </motion.div>
            ))}

        </div>
    );
}

export default About;
