import React,{useState} from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

{/* pic placeholder */}
const cards=[
    {id:1, content: 'card1', link: '/logo.png'},  
    {id:2, content: 'card2', link: '/logo.png'},
    {id:3, content: 'card3', link: '/logo.png'},
    {id:4, content: 'card4', link: '/logo.png'},
    {id:5, content: 'card5', link: '/logo.png'},
    {id:6, content: 'card6', link: '/logo.png'},
]

const Carousel= () => {
    const [StartIndex, SetStartIndex] = useState(0);
    const cardShow = 3;

    const handlePrevious = () => {
        SetStartIndex ((prev) => Math.max (0, prev - 1))
    }

    const handleNext = () => {
        SetStartIndex ((prev) => Math.min (cards.length - cardShow, prev + 1))
    }

    const visibleCards = cards.slice(StartIndex, StartIndex + cardShow)

    return (
        <div class="flex relative">
            <div class="flex flex-row w-full justify-center overflow-hidden gap-8">
                {visibleCards.map ((card) => (
                    <div key={card.id} class="flex justify-center place-content-center content-center w-[400px] h-[200px] border bg-black text-white">  {/* bg-black for reference only */}
                        {card.content}  {/* reference to see if next/previous is working*/}
                        <img src={card.link}></img>
                    </div>
                ))
                }
            </div>
            <div class="flex w-full justify-between absolute mt-14">
                <button onClick={handlePrevious} disabled={StartIndex === 0} class="text-6xl hover:scale-150 delay-150 duration-300 ease-in-out">
                    <IoIosArrowBack />
                </button>
                <button onClick={handleNext} disabled={StartIndex >= cards.length - cardShow} class="text-6xl hover:scale-150 delay-150 duration-300 ease-in-out">
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}

export default Carousel