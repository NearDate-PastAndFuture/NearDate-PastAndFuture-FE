import Link from "next/link";
import { useEffect, useState } from "react";
import { NFTModel, NFTSaleModel } from "types";
import Image from 'next/image';
import { get_ipfs_link_image } from "utils/ipfs";
import { utils } from "near-api-js";

interface NFTItemCardProps {
    nft: NFTSaleModel;
}

export default function NFTSaleCard({ nft }: NFTItemCardProps) {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link href={`/nft/${nft.token_id}`} passHref>
                <a className="block relative rounded overflow-hidden h-full cursor-pointer aspect-square">
                    {
                        nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src={get_ipfs_link_image(nft.token_id)} layout='fill' />
                    }
                    {
                        !nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src="https://dummyimage.com/421x261" layout='fill' />
                    }
                    <div className="absolute left-1 bottom-2 border-green-900/10 bg-green-50 rounded-sm px-2 py-1 font-semibold text-green-700">
                        {utils.format.formatNearAmount(nft.sale_conditions)} NEAR
                        <span className="animate-ping w-2.5 h-2.5 bg-green-600/75 rounded-full absolute -top-1 -left-1"></span>
                        <span className="w-2.5 h-2.5 bg-green-600 rounded-full absolute -top-1 -left-1"></span>
                    </div>
                </a>
            </Link>
        </div>
    );
}