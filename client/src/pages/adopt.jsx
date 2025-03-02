function Adopt() {

    return (
        <div className="container mx-auto px-4 py-16">

            
                <div class="flex min-h-48 justify-between gap-8">
                    <div class="flex w-1/3 flex-col px-5 justify-between">
                        <div class="flex-col">
                            <h2 class="font-bold text-2xl">Find your new cat companion!</h2>
                            <p>Text caption...</p>
                        </div>

                        <div class="flex space-x-4">
                            <button type="button" class="bg-gray-900 px-3 text-white rounded w-1/2 py-2 hover:scale-105 delay-150 duration-300 ease-in-out">ADOPT NOW</button>
                            <button type="button" class="bg-gray-900 px-3 text-white rounded w-1/2 py-2 hover:scale-105 delay-150 duration-300 ease-in-out">FAQ</button>
                        </div>

                    </div>

                    <div class="flex w-2/3 h-80 px-8 place-content-center">
                        <img class="flex" src="logo.png"></img>
                    </div>
                </div>

                <div class="flex flex-col place-content-center mt-24">
                    <div class="flex w-100 place-content-center mb-10">
                        <h2 class="font-bold text-4xl">Take a look at our Cats!</h2>
                    </div>
                    <div class="grid lg:grid-cols-3 mb:grid-cols-2 grid-flow-row gap-4"> {/*placeholder*/}
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                        <div class="flex bg-gray-900 h-80">
                            placeholder

                        </div>
                       
                        
                        


                    </div>


                </div>
            

        </div>
    )
}

export default Adopt