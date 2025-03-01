import accountImg from "../assets/account_img.jpg";
import { Link } from "react-router-dom";

function Account() {

    return (
        <div className="container mx-auto px-4 py-16">

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                {/* Image */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={accountImg}
                        alt="Account Image"
                        className="rounded-xl shadow-lg max-w-md w-full object-cover"
                    />
                </div>

                {/* Form */}
                <div className="w-full lg:w-1/2">
                    <form
                    class="bg-[#C1CFA1] shadow-2xl rounded-2xl overflow-hidden border-4 border-[#626F47]"
                    >
                        <div class="px-8 py-10 md:px-10">
                            <h2
                            class="text-4xl font-extrabold text-center"
                            >
                            Welcome!
                            </h2>
                            <p class="text-center mt-3">
                            Create an account and find your new cat companion.
                            </p>
                            <div class="mt-10">
                                <div class="relative">
                                    <label
                                    class="block mb-3 text-sm font-medium"
                                    for="name"
                                    >Name</label
                                    >
                                    <input
                                    placeholder="Full Name"
                                    class="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg focus:border-[#99B080] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-[#99B080]"
                                    name="name"
                                    id="name"
                                    type="name"
                                    />
                                </div>
                                <div class="relative mt-6">
                                    <label
                                    class="block mb-3 text-sm font-medium"
                                    for="email"
                                    >Email</label
                                    >
                                    <input
                                    placeholder="example@email.com"
                                    class="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg focus:border-[#99B080] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-[#99B080]"
                                    name="email"
                                    id="email"
                                    type="email"
                                    />
                                </div>
                                <div class="mt-6">
                                    <label
                                    class="block mb-3 text-sm font-medium"
                                    for="password"
                                    >Password</label
                                    >
                                    <input
                                    placeholder="••••••••"
                                    class="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg focus:border-[#99B080] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-[#99B080]"
                                    name="password"
                                    id="password"
                                    type="password"
                                    />
                                </div>
                                <div class="mt-10">
                                    <button
                                    class="w-full px-4 py-3 tracking-wide font-semibold text-white transition-colors duration-200 transform bg-[#7f926b] hover:bg-[#677755] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#99B080]"
                                    type="submit"
                                    >
                                    Let's Go
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="px-8 pb-4 bg-[#C1CFA1]">
                            <div class="text-sm text-[#626F47] text-center">
                            Don't have an account?
                                <Link to={"/register"} class="font-medium underline pl-1">Sign up</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Account