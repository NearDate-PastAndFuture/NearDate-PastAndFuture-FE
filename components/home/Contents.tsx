export default function Contents() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">What can you do with NearDate NFT</h1>
                    {/* <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p> */}
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Your meaningful date NFT </h2>
                            <p className="leading-relaxed text-base">Send your message to the future date or just tell everyone your son birthday</p>
                        </div>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                    <circle cx={6} cy={6} r={3} />
                                    <circle cx={6} cy={18} r={3} />
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">NFT message slot</h2>
                            <p className="leading-relaxed text-base">Someone want can make a bid to rent your NFT message slot in specific time. </p>
                        </div>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Use your NFT to get more benefit</h2>
                            <p className="leading-relaxed text-base">If you own an NFT with special day, you can get some discount coupon from our partner.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}