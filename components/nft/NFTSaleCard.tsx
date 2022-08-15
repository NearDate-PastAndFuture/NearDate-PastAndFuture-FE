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
        <Link href={`/nft/${nft.token_id}`} passHref>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                <a className="block relative rounded overflow-hidden h-64">
                    {
                        nft.token_id && <Image alt="neardate" className="object-cover object-center w-full h-full block" src={get_ipfs_link_image(nft.token_id)} layout='fill'/>
                    }
                    {
                        !nft.token_id && <Image alt="neardate" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" layout='fill'/>
                    }
                </a>
                <div className="mt-2">
                    <span className="text-gray-900 title-font text-lg font-medium text-center">{utils.format.formatNearAmount(nft.sale_conditions)} NEAR</span>
                </div>
            </div>
        </Link>
    );
}