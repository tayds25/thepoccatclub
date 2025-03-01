import registerCollage from '../assets/register_collage.png'
import registerTitle from '../assets/register_title.png'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Register() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* Left side */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#FFFDF0] min-h-screen">
                <img
                    src={registerCollage}
                    alt="Cat collage"
                    className="h-auto max-h-screen w-auto max-w-full object-contain"
                />
            </div>

            {/* Right side*/}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-[#FFFDF0]">
                {/* Logo */}
                <div className="mb-6">
                    <img src={logo} alt="POC Cat Club Logo" className="h-16" />
                </div>

                {/* Title */}
                <div className="mb-8">
                    <img src={registerTitle} alt="Register Title" className="max-w-xs" />
                </div>

                {/* Registration Form */}
                <div
                className="form w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-[#A5B68D] r flex flex-col items-center justify-center gap-3 transition-all duration-300"
                >
                    <p
                        className="text-[#566637] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0"
                    >
                        Welcome
                    </p>

                    <div className="capitalize">
                        <p className="text-2xl text-[#4a5730] pb-5">Create Your Account</p>
                        <form action="" className="flex flex-col gap-3">
                            <div className="flex flex-col items-start w-full">
                                <label for="name" className="text-sm text-[#4a5730] font-semibold"
                                >Name</label
                                >
                                <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#56633d] placeholder:text-[#5f6b49] focus:outline-none text-[#4a5730] placeholder:text-xs"
                                />
                            </div>

                            <div className="flex flex-col items-start w-full">
                                <label for="email" className="text-sm text-[#4a5730] font-semibold"
                                >Email</label
                                >
                                <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#56633d] placeholder:text-[#5f6b49] focus:outline-none text-[#4a5730] placeholder:text-xs"
                                />
                            </div>

                            <div className="flex flex-col items-start w-full">
                                <label for="password" className="text-sm text-[#4a5730] font-semibold"
                                >Password</label
                                >
                                <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#56633d] placeholder:text-[#5f6b49] focus:outline-none text-[#4a5730] placeholder:text-xs"
                                />
                        </div>

                            <div className="inline-flex justify-center gap-5 w-full">
                            <Link to="/">
                                <button
                                type="submit"
                                className="w-full px-6 focus:outline-none focus:scale-110 font-semibold text-sm py-3 rounded-lg hover:scale-110 transition-all hover:transiton text-[#FFFDF0] bg-[#687c57] shadow-[#748E63] shadow-lg"
                                >
                                Sign Up
                                </button>
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Register