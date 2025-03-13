import { useState, useEffect } from "react";

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
        <div className="container mx-auto px-4 py-16">
            <div className="flex min-h-48 justify-between gap-8">
                <div className="flex w-1/2 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-6xl color">About the POC Cat Club</h2><br></br>
                        <p className="text-xl"> Learn More About Us!</p>
                    </div>
                </div>

                <div className="flex w-2/3 h-80 px-8 place-content-center">
                    <img className="flex" src="logo.png" alt="Logo" />
                </div>
            </div>

            <div className="flex flex-col place-content-center mt-24">
                <div className="flex w-full place-content-center mb-10">
                    <div className="flex flex-col w-full place-content-center mb-10 text-center">
                    <h2 className="font-bold text-4xl">The POC Cat Club</h2>
                    <br></br>
                    <ColoredLine color="green" />
                    <br></br>
                    <p className="text-xl mt-2 text-justify">The POC Cat Club began in March 2023 with a simple yet urgent mission — to protect and care for the cats that call the Philippine Orthopedic Center (POC) home. When Dr. Angelique Gelvezon, a newly assigned psychiatrist, first arrived at the hospital, she noticed an old cat trap — a sign that strays had been rounded up before, their fate uncertain. She could not just look away. Instead, she reached out, found like-minded volunteers, and together, they organized the first-ever TNVR (Trap-Neuter-Vaccinate-Return) program at POC.
                        <br></br>
                        <br></br>What started as a small effort quickly became a movement. The hospital cats — once seen as pests or nuisances — were now seen as lives worth protecting. Through tireless rescues, feeding programs, and advocacy, the POC Cat Club has since spayed/neutered 189 cats, including hospital cats, strays from nearby areas, employees’ pets, and community cats from friends. More importantly, as of today, 37 cats have found loving, forever homes through official adoptions.
                    </p>
                </div>
                </div>
            </div>

            <div className="flex flex-col place-content-center mt-24">
                <div className="flex w-full place-content-center mb-10">
                    <div className="flex flex-col w-full place-content-center mb-10 text-center">
                    <h2 className="font-bold text-4xl">Who We Are</h2>
                    <br></br>
                    <ColoredLine color="green" />
                    <br></br>
                    <p className="text-xl mt-2 text-justify color:#748E63">The POC Cat Club is made up of dedicated hospital employees with big hearts. We come from different backgrounds — nurses, nursing attendants, office personnel, doctors, security guards, and more — all united by a shared love for animals. Despite our busy schedules, we make time to care for, rescue, and advocate for the hospital’s cats, ensuring they are safe, healthy, and treated with kindness.</p>
                </div>
                </div>
            </div>

            <div className="flex flex-col place-content-center mt-24">
                <div className="flex w-full place-content-center mb-10">
                    <div className="flex flex-col w-full place-content-center mb-10 text-center">
                    <h2 className="font-bold text-4xl">Our Advocacy</h2>
                    <br></br>
                    <ColoredLine color="green" />
                    <br></br>
                    <p className="text-xl mt-2 text-justify">At our core, we believe that cats are part of the community and that people should learn to coexist peacefully with them — not just in homes, but in institutions, hospitals, and schools, where they have a rightful place alongside us. We hope for a future where hospitals and other institutions recognize cats as part of the environment rather than a problem to be removed. Instead of rounding them up and displacing them, humane solutions like TNVR can create a balanced, healthier, and more compassionate approach to coexistence.                        <br></br>
                        <br></br>We also strongly advocate for spaying and neutering as the most humane and effective way to prevent overpopulation and suffering. Additionally, we encourage people to adopt, not shop, because every stray, abandoned, or overlooked cat deserves a chance at a loving home.
                        <br></br>The POC Cat Club is built on the dedication of volunteers, rescuers, and animal lovers who believe in making a difference — one cat at a time. If you’d like to support our cause, join our TNVR efforts, adopt a cat, or help us spread awareness, we’d love to hear from you. Collectively, we can build a world where cats are seen, valued, and protected.
                    </p>
                </div>
                </div>
            </div>

        </div>
    );
}

export default About;
