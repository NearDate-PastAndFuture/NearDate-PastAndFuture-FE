import { useState } from "react";
import Image from "next/image";

export default function MintIntroduction() {
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <section className="text-gray-600 body-font">
            <div className="container pt-12 mx-auto">
                <div className="flex flex-row justify-start items-center">
                    <label className="relative inline-block h-8 w-16">
                        <input type="checkbox" className="peer sr-only" onChange={(e) => setIsShow(e.target.checked)} />
                        <span className="absolute inset-0 cursor-pointer rounded-full bg-backgroundLight transition duration-200 before:absolute before:bottom-1 before:left-1 before:h-6 before:w-6 before:rounded-full before:bg-white before:transition before:duration-200 before:shadow-sm peer-checked:bg-imageLight peer-checked:before:translate-x-8 peer-focus:ring" />
                    </label>
                    <span className="ml-2 text-primary">Close Introduction</span>
                </div>

                <div className={`flex-wrap transition-all ease-in-out delay-150 duration-1000 ${isShow ? "hidden" : "flex"}`}>
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-secondary mb-1 tracking-wider">SELECT</h2>
                                    <p className="leading-relaxed text-primary">Select the DATE you want to mint. We have every date from 5/6/1933 - when <a href="https://www.history.com/this-day-in-history/fdr-takes-united-states-off-gold-standard">Franklin D. Roosevelt takes United States off gold standard</a>, to 1/1/2140 - when the last bitcoin will be minted (estimate)</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-secondary mb-1 tracking-wider">MESSAGE</h2>
                                    <p className="leading-relaxed text-primary">Type a message, this message will be sticked to your NFT and can be editted later. You can send the message to future date or just write down your memory on this date. </p>
                                </div>
                            </div>
                            <div className="flex relative">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-secondary mb-1 tracking-wider">PAYMENT</h2>
                                    <p className="leading-relaxed text-primary">The first 5,452 NFTs will be minted FREE. After that you have to pay 1 Near for mintting new NFT</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-3/5 md:w-1/2 rounded-lg md:mt-0 mt-12 block overflow-hidden h-full">
                            <a className="block relative rounded overflow-hidden h-full cursor-pointer">
                                <Image className="object-cover object-center block w-full" src="/logo.png" alt="step" width="1200" height="500" layout="intrinsic" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}