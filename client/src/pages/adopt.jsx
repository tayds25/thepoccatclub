import { useState, useEffect } from "react";
import AdoptCarousel from "../components/adoptCarousel";

function Adopt() {
    const [cats, setCats] = useState([]);

    // Fetch the list of cats from the backend
    useEffect(() => {
        async function fetchCats() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/adopt/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCats(data);
            } catch (error) {
                console.error("Error fetching cats:", error);
            }
        }

        fetchCats();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row min-h-48 justify-between gap-8">
                <div className="flex w-full md:w-1/2 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl">Find your new cat companion!</h2>
                        <p className="text-xl">Each cat below is looking for their forever home.
                        Browse our selection of adorable felines - from playful kittens to dignified seniors,
                        all deserving of loving families. We can even help you find your perfect match!</p>
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSf33gDkXnoSZm4XXmFWPjqmWdhw5u_6wOsFDtm6q9brpjarrQ/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 px-3 text-white rounded w-1/2 py-2 hover:scale-105 delay-150 duration-300 ease-in-out text-center"
                        >
                            ADOPT NOW
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <AdoptCarousel />
                </div>
            </div>

            {/* Available Cats Section */}
            <div className="flex flex-col place-content-center mt-24">
                <div className="flex flex-col w-full place-content-center mb-10 text-center">
                    <h2 className="font-bold text-4xl">Take a look at our Cats!</h2>
                </div>

                {/* Grid of adoptable cats - unchanged */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row gap-4">
                    {cats.length > 0 ? (
                        cats.map((cat) => {
                            const imageUrl = cat.image ? `${import.meta.env.VITE_API_URL}/uploads/${encodeURIComponent(cat.image)}` : "/placeholder.jpg";

                            return (
                                <div key={cat._id} className="flex flex-col bg-[#a57458] p-4 rounded-lg text-white shadow-lg">
                                    {/* Cat Image */}
                                    <img
                                        src={imageUrl}
                                        alt={cat.name}
                                        className="w-full h-48 object-cover rounded-md"
                                        onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                                    />

                                    {/* Cat Details */}
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold">{cat.name}</h3>
                                        <p className="text-sm">Age: {cat.age} months</p>
                                        <p className="text-sm">Gender: {cat.gender}</p>
                                        <p className="text-sm">Trait: {cat.trait}</p>
                                    </div>

                                    {/* Health Badges */}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {cat.trained && <span className="bg-[#FFFDF0] text-black text-xs px-2 py-1 rounded">Trained</span>}
                                        {cat.neutered && <span className="bg-[#FFFDF0] text-black text-xs px-2 py-1 rounded">Neutered</span>}
                                        {cat.dewormed && <span className="bg-[#FFFDF0] text-black text-xs px-2 py-1 rounded">Dewormed</span>}
                                        {cat.vaccinated && <span className="bg-[#FFFDF0] text-black text-xs px-2 py-1 rounded">Vaccinated</span>}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center col-span-3 text-gray-500">No cats available for adoption at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Adopt;