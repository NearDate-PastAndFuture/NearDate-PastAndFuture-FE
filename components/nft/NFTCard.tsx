import Link from "next/link";
import { useEffect, useState } from "react";
import { NFTModel, NFTMessageModel, NFTRentSlotModel, NFTSlotModel } from "types";
import Image from 'next/image';
import { get_ipfs_link_image } from "utils/ipfs";
import { utils } from "near-api-js";
import { useAppContext } from "context/state";

export enum CardSize {
    Small,
    Large,
}

interface NFTCardProps {
    nft: NFTModel;
    size: CardSize;
}

export default function NFTCard({ nft, size }: NFTCardProps) {
    const { account, contractMarketplace } = useAppContext();

    const [message, setMessage] = useState<NFTMessageModel>();
    const [listRent, setListRent] = useState<Array<NFTSlotModel>>([]);

    useEffect(() => {

        async function getData() {
            if (!nft.message) return;

            let message_resp = await fetch(nft.message)
            let message_json: NFTMessageModel = await message_resp.json();
            setMessage(message_json);

            let rent_message_list: NFTRentSlotModel = await contractMarketplace.get_rent_by_token_id({
                "token_id": nft.token_id
            });

            if (rent_message_list != null) {
                let rented = rent_message_list.rented_slots;
                let slot = await Promise.all(
                    rented.map(ele =>
                        fetch(ele.rent_message)
                            .then((e) => e.json())
                            .then(e => {
                                return {
                                    ...ele,
                                    message: e?.rent_message,
                                    message_created_date: e?.message_created_date,
                                }
                            })));
                setListRent(slot);
            }
        }
        getData();
    }, [contractMarketplace, nft]);

    return (
        <div className="w-full p-4 flex flex-col items-center">
            <Link href={`/nft/${nft.token_id}`} passHref>
                <a className={`block relative rounded overflow-hidden h-full cursor-pointer aspect-square 
                    ${size == CardSize.Large ? "w-1/2" : "w-3/4"}`}>
                    {
                        nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src={get_ipfs_link_image(nft.token_id)} layout='fill' />
                    }
                    {
                        !nft.token_id && <Image alt="neardate" className="object-contain object-center w-full block" src="https://dummyimage.com/421x261" layout='fill' />
                    }
                </a>
            </Link>
            <h4 className={`border-2 border-blue-400 font-semibold mt-2 px-2 mb-5
            ${size == CardSize.Large ? "text-2xl" : "text-md"}`}>
                {message?.message}
            </h4>
            {
                listRent.map((e, i) => {
                    return (
                        <span key={e.message} className={`border border-blue-300 font-medium px-2
                        ${size == CardSize.Large ? "text-md" : "text-sm"}`}>
                            {e.message}
                        </span>
                    );
                })
            }
        </div>
    );
}