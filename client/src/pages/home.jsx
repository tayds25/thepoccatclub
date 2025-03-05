import Carousel from "../components/carousel";


function Home() {

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex min-h-48 gap-8">
                <div className="flex w-1/2 h-80 px-8 place-content-center bg-amber-900 ml-20 ">
                    placeholder
                </div>
                <div className="flex w-1/3 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-2xl">Find your new cat companion!</h2>
                        <p class="text-justify text-xl">POC Cat Club or the Philippine Orthopedic Center Cat Club is a dedicated non-profit organization based in Metro Manila, committed to rescuing, nurturing, and finding loving homes for cats in need.</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col place-content-center mt-24">
                <div className="flex w-full place-content-center mb-10">
                    <h2 className="font-bold text-4xl mb-2">Meet our Cats!</h2>
                </div>
                <Carousel />
            </div>

            <div className="flex min-h-48 gap-8 py-16 mt-12">
                <div className="flex w-1/2 h-80 px-8 place-content-center bg-amber-900 ml-20 ">
                    placeholder
                </div>
                
                <div className="flex w-1/3 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-4xl text-center">Announcements</h2>
                        <h2 class="text-2xl text-gray-800">Date:</h2>
                        <h2 className="font-bold text-2xl">Announcement Title</h2>
                        <p class="text-justify text-xl">Text Caption...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home