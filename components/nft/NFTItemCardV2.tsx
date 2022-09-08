import Link from "next/link";
import { useEffect, useState } from "react";
import { NFTModel, NFTMessageModel } from "types";
import Image from 'next/image';
import { get_ipfs_link_image } from "utils/ipfs";
import { truncate } from "utils/format";

interface NFTItemCardV2Props {
    nft: NFTModel;
}

export default function NFTItemCardV2({ nft }: NFTItemCardV2Props) {

    const [message, setMessage] = useState<NFTMessageModel>();
    const [date, setDate] = useState<number>();

    useEffect(() => {
        if (!nft.message) return;
        fetch(nft.message)
            .then(data => data.json())
            .then((e: NFTMessageModel) => {
                setMessage(e);
                setDate(e.token_created_date);
            })
            .catch(err => console.log(err))
    }, [nft]);

    return (
        <div className="w-60 bg-backgroundLight px-5 py-5 rounded-md drop-shadow-xl border-b-2 hover:border-2 transition-all duration-100">
            <div className="flex flex-col items-center">
                <Link href={`/nft/${nft.token_id}`} passHref>
                    <a className="block relative rounded-md w-44 cursor-pointer aspect-square">
                        <div className="absolute w-44 rounded-md aspect-square border-2 border-imageLight bg-black blur-sm"></div>
                        <Image alt="neardate" className="object-contain object-center rounded-md p-1" src={get_ipfs_link_image(nft.token_id)} layout='fill' />
                    </a>
                </Link>
            </div>
            <p className="font-semibold text-md text-primary mt-4 line-clamp-2">
                {message?.message}
            </p>
            <div className="flex gap-2 items-center mt-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6667 12.25V11.0833C11.6667 10.4645 11.4208 9.871 10.9832 9.43342C10.5457 8.99583 9.95217 8.75 9.33333 8.75H4.66666C4.04782 8.75 3.45433 8.99583 3.01675 9.43342C2.57916 9.871 2.33333 10.4645 2.33333 11.0833V12.25" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.00001 6.41667C8.28867 6.41667 9.33334 5.372 9.33334 4.08333C9.33334 2.79467 8.28867 1.75 7.00001 1.75C5.71134 1.75 4.66667 2.79467 4.66667 4.08333C4.66667 5.372 5.71134 6.41667 7.00001 6.41667Z" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-primary">
                    {truncate(nft.owner_id, 20)}
                </span>
            </div>
            <div className="flex gap-2 items-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_5_264)">
                        <path d="M11.0833 2.33333H2.91667C2.27233 2.33333 1.75 2.85566 1.75 3.49999V11.6667C1.75 12.311 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.311 12.25 11.6667V3.49999C12.25 2.85566 11.7277 2.33333 11.0833 2.33333Z" stroke="#E4B9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.33333 1.16667V3.50001" stroke="#E4B9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.66667 1.16667V3.50001" stroke="#E4B9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.75 5.83333H12.25" stroke="#E4B9F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_5_264">
                            <rect width="14" height="14" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <span className="text-secondary text-sm">
                    {`${new Date(date || Date.now()).toLocaleString("en-US")}`}
                </span>
            </div>
        </div>
    );
}