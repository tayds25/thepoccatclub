import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const adoptCards = [
    {id: 1, content: 'Adoption 1', link: './src/assets/adopt1.jpg'},
    {id: 2, content: 'Adoption 2', link: './src/assets/adopt2.jpg'},
    {id: 3, content: 'Adoption 3', link: './src/assets/adopt3.jpg'},
    {id: 4, content: 'Adoption 4', link: './src/assets/adopt4.jpg'},
    {id: 5, content: 'Adoption 5', link: './src/assets/adopt5.jpg'},
    {id: 6, content: 'Adoption 6', link: './src/assets/adopt6.jpg'},
];

const AdoptCarousel = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardShow = 2; // Changed from 3 to 2

    const handlePrevious = () => {
        if (startIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setStartIndex((prev) => Math.max(0, prev - 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const handleNext = () => {
        if (startIndex < adoptCards.length - cardShow && !isAnimating) {
            setIsAnimating(true);
            setStartIndex((prev) => Math.min(adoptCards.length - cardShow, prev + 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const translateValue = `translateX(-${startIndex * (100 / cardShow)}%)`;

    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-center space-x-4 max-w-6xl mx-auto">
                {/* Left Arrow */}
                <button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    className={`flex-shrink-0 transition-all duration-300 ease-in-out ${startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <IoIosArrowBack className="text-5xl" />
                </button>

                {/* Carousel */}
                <div className="relative flex-grow overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: translateValue,
                        }}
                    >
                        {adoptCards.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 w-1/2 px-4 transition-all duration-500 ease-in-out transform hover:scale-105"
                            >
                                <div className="h-[300px] flex flex-col justify-center items-center rounded-lg overflow-hidden shadow-lg mx-auto relative">
                                    <img
                                        src={card.link}
                                        alt={card.content}
                                        className="object-cover h-[300px] w-full transition-opacity duration-300 ease-in-out"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    disabled={startIndex >= adoptCards.length - cardShow}
                    className={`flex-shrink-0 transition-all duration-300 ease-in-out ${startIndex >= adoptCards.length - cardShow ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <IoIosArrowForward className="text-5xl" />
                </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: adoptCards.length - cardShow + 1 }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                            index === startIndex ? 'w-6 bg-[#a57458]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setStartIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default AdoptCarousel;