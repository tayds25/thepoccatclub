import Carousel from "../components/carousel";
import totebagImg from "../assets/totebag.png";
import announcementImg from "../assets/announce.png";

function Home() {

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex min-h-48 gap-8">
                <div className="flex w-1/2 h-80 px-8 place-content-center ml-20">
                    <img className="rounded-md w-full object-cover" src={totebagImg}></img>
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
                <div className="flex w-1/2 h-full px-8 place-content-center ml-20 ">
                    <img className="rounded-md w-full object-cover" src={announcementImg}></img>
                </div>

                <div className="flex w-1/3 flex-col px-5 justify-between">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold text-4xl text-center">Announcements</h2>
                        <h2 class="text-2xl text-gray-800">Date: March 15, 2025</h2>
                        <h2 className="font-bold text-2xl">PAW-TY</h2>
                        <p class="text-justify text-xl">We’re kicking off our 7th TNVR on March 15, 2025, at 8 AM, continuing our mission to keep community cats healthy and safe through spaying, neutering, and vaccination. Every TNVR brings us closer to a future where cats are valued and peacefully coexist with the people around them (especially in our hospital 😅)

This wouldn’t be possible without the support of our amazing volunteers and donors. If you’d like to help, donations of any amount are most welcome!

Help us make this TNVR another success 💛.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home