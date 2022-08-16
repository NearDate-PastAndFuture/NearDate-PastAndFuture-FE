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
            .then((e: NFTMessageModel) => {
                setMessage(e);
            })
            .catch(err => console.log(err))
    }, [nft]);

    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full p-7">
            <Link href={`/nft/${nft.token_id}`} passHref>
                <a className="block relative rounded overflow-hidden h-full cursor-pointer aspect-square">
                    {
                        nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src={get_ipfs_link_image(nft.token_id)} layout='fill' />
                    }
                    {
                        !nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src="https://dummyimage.com/421x261" layout='fill' />
                    }
                </a>

            </Link>
            <p className={`font-semibold text-md "}`}>
                {message?.message}
            </p>
        </div>
    );
}