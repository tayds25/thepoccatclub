import { useState, useEffect } from "react";

function Adopt() {
    const [cats, setCats] = useState([]);

    // Fetch the list of cats from the backend
    useEffect(() => {
        async function fetchCats() {
            try {
                const response = await fetch("http://localhost:5050/adopt/");
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
            <div className="flex min-h-48 justify-between gap-8">
                <div className="flex w-1/3 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl">Find your new cat companion!</h2>
                        <p class="text-xl">Discover our lovely cats looking for a forever home.</p>
                    </div>

                    <div className="flex space-x-4">
                        <button type="button" className="bg-gray-900 px-3 text-white rounded w-1/2 py-2 hover:scale-105 delay-150 duration-300 ease-in-out">
                            ADOPT NOW
                        </button>
                        <button type="button" className="bg-gray-900 px-3 text-white rounded w-1/2 py-2 hover:scale-105 delay-150 duration-300 ease-in-out">
                            FAQ
                        </button>
                    </div>
                </div>

                <div className="flex w-2/3 h-80 px-8 place-content-center">
                    <img className="flex" src="logo.png" alt="Logo" />
                </div>
            </div>

            <div className="flex flex-col place-content-center mt-24">
                <div className="flex w-full place-content-center mb-10">
                    <h2 className="font-bold text-4xl">Take a look at our Cats!</h2>
                </div>

                {/* Grid of adoptable cats */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row gap-4">
                    {cats.length > 0 ? (
                        cats.map((cat) => {
                            const imageUrl = cat.image ? `http://localhost:5050/uploads/${encodeURIComponent(cat.image)}` : "/placeholder.jpg"; // Fetching image from /images/:filename

                            return (
                                <div key={cat._id} className="flex flex-col bg-amber-900 p-4 rounded-lg text-white shadow-lg">
                                    {/* Cat Image */}
                                    <img 
                                        src={imageUrl} 
                                        alt={cat.name} 
                                        className="w-full h-48 object-cover rounded-md"
                                        onError={(e) => { e.target.src = "/placeholder.jpg"; }} // Fallback if image not found
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
                                        {cat.trained && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Trained</span>}
                                        {cat.neutered && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Neutered</span>}
                                        {cat.dewormed && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Dewormed</span>}
                                        {cat.vaccinated && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Vaccinated</span>}
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