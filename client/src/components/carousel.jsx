import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const cards = [
    {id: 1, content: 'card1', link: '/cat6.png'},
    {id: 2, content: 'card2', link: '/cat1.png'},
    {id: 3, content: 'card3', link: '/cat2.png'},
    {id: 4, content: 'card4', link: '/cat3.png'},
    {id: 5, content: 'card5', link: '/cat4.png'},
    {id: 6, content: 'card6', link: '/cat5.png'},
];

const Carousel = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardShow = 3;

    const handlePrevious = () => {
        if (startIndex > 0 && !isAnimating) {
            setIsAnimating(true);
            setStartIndex((prev) => Math.max(0, prev - 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const handleNext = () => {
        if (startIndex < cards.length - cardShow && !isAnimating) {
            setIsAnimating(true);
            setStartIndex((prev) => Math.min(cards.length - cardShow, prev + 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const translateValue = `translateX(-${startIndex * (100 / cardShow)}%)`;

    return (
        <div className="w-full py-8">

            <div className="flex items-center justify-center space-x-4 max-w-6xl mx-auto">
                {/* Left Arrow - Outside */}
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
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 w-1/3 px-4 transition-all duration-500 ease-in-out transform hover:scale-105"
                            >
                                <div className="text-white h-[300px] flex flex-col justify-center items-center rounded-lg overflow-hidden shadow-lg mx-auto relative">
                                    <img
                                        src={card.link}
                                        alt={card.content}
                                        className="object-cover h-[300px] btransition-opacity duration-300 ease-in-out"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow - Outside */}
                <button
                    onClick={handleNext}
                    disabled={startIndex >= cards.length - cardShow}
                    className={`flex-shrink-0 transition-all duration-300 ease-in-out ${startIndex >= cards.length - cardShow ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                    <IoIosArrowForward className="text-5xl" />
                </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: cards.length - cardShow + 1 }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                            index === startIndex ? 'w-6 bg-[#748E63]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setStartIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;