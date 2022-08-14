import Link from "next/link";
import { useEffect, useState } from "react";
import { NFTModel, NFTMessageModel } from "types";
import Image from 'next/image';
import { get_ipfs_link_image } from "utils/ipfs";

interface NFTItemCardProps {
    nft: NFTModel;
}

export default function NFTItemCard({ nft }: NFTItemCardProps) {

    const [message, setMessage] = useState<NFTMessageModel>();

    useEffect(() => {
        if (!nft.message) return;
        fetch(nft.message)
        .then(data => data.json())
        .then( (e: NFTMessageModel) => {
            setMessage(e);
        })
        .catch(err => console.log(err))
    }, [nft]);

    return (
        <Link href={`/nft/${message?.id}`} passHref>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                <a className="block relative rounded overflow-hidden h-64">
                    {
                        nft.token_id && <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src={get_ipfs_link_image(nft.token_id)} layout='fill'/>
                    }
                    {
                        !nft.token_id && <Image alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" layout='fill'/>
                    }
                </a>
                <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium text-center truncate">{message?.message || "NFT Unaivalbale now"}</h2>
                </div>
            </div>
        </Link>
    );
}