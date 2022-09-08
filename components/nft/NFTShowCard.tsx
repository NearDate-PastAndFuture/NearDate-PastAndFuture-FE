import Link from "next/link";
import { useEffect, useState } from "react";
import { NFTModel, NFTMessageModel, NFTSlotModel, NFTRentSlotModel } from "types";
import Image from 'next/image';
import { get_ipfs_link_image } from "utils/ipfs";
import { truncate } from "utils/format";
import { useAppContext } from "context/state";

interface NFTShowCardProps {
    nft: NFTModel;
}

export default function NFTShowCard({ nft }: NFTShowCardProps) {
    const { account, contractMarketplace } = useAppContext();

    const [message, setMessage] = useState<NFTMessageModel>();
    const [listRent, setListRent] = useState<Array<NFTSlotModel>>([]);

    useEffect(() => {
        async function getData() {
            if (!nft?.message) return;

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
        <div className="md:w-[36rem] w-[10rem] h-96 bg-backgroundLight rounded-md border-b-2">
            <div className="p-2 flex space-x-3 md:flex-row flex-col">
                <Link href={`/nft/${nft?.token_id}`} passHref>
                    <a className="h-36 aspect-square bg-imageLight relative rounded-md cursor-pointer">
                        <div className="absolute h-36 rounded-md aspect-square border-2 border-imageLight bg-black blur-sm"></div>
                        <Image alt="neardate" className="object-contain object-center rounded-md p-1" src={get_ipfs_link_image(nft.token_id)} layout='fill' />
                    </a>
                </Link>
                <div className="flex flex-col w-full justify-between">
                    <div className="px-5 py-2 bg-background rounded-3xl relative mt-2 max-w-full h-full">
                        <p className="text-center text-xl max-w-full line-clamp-3">{message?.message}</p>
                        <div className="absolute top-0 left-0 h-0.5 w-6 bg-primary"></div>
                        <div className="absolute top-0 left-0 h-3 w-0.5 bg-primary"></div>
                        <div className="absolute top-0 right-0 h-0.5 w-6 bg-primary"></div>
                        <div className="absolute top-0 right-0 h-3 w-0.5 bg-primary"></div>
                        <div className="absolute bottom-0 left-0 h-0.5 w-6 bg-primary"></div>
                        <div className="absolute bottom-0 left-0 h-3 w-0.5 bg-primary"></div>
                        <div className="absolute bottom-0 right-0 h-0.5 w-6 bg-primary"></div>
                        <div className="absolute bottom-0 right-0 h-3 w-0.5 bg-primary"></div>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-primary text-sm font-semibold mt-2">
                        {truncate(nft.owner_id, 40)}
                    </span>
                    
                    <span className="text-secondary text-sm mt-1">
                        {`${new Date(message?.token_created_date || Date.now()).toLocaleString("en-US")}`}
                    </span>
                    </div>
                </div>
            </div>
            <div className="mt-1 flex justify-start p-2 pt-0">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0602 9.2616C17.0629 10.2821 16.8244 11.2887 16.3644 12.1996C15.8188 13.2911 14.9802 14.2091 13.9424 14.8509C12.9046 15.4927 11.7086 15.8329 10.4884 15.8334C9.46798 15.836 8.46133 15.5976 7.55047 15.1375L3.14352 16.6065L4.61251 12.1996C4.15243 11.2887 3.91401 10.2821 3.91667 9.2616C3.91714 8.04139 4.25733 6.8454 4.89913 5.8076C5.54092 4.7698 6.45898 3.93118 7.55047 3.38567C8.46133 2.9256 9.46798 2.68718 10.4884 2.68984H10.875C12.4865 2.77875 14.0086 3.45894 15.1498 4.60018C16.2911 5.74142 16.9713 7.26352 17.0602 8.87503V9.2616Z" stroke="#E4B9F9" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="px-4 flex flex-col gap-2 h-48 overflow-y-scroll scrollbar-thin scrollbar-thumb-background scrollbar-track-backgroundLight scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    {
                        listRent.map(e => {
                            return (
                                <div className="rounded-md bg-background px-2 py-1">
                                    <p className="text-primary">
                                        {e.message}
                                    </p>
                                    <p className="text-secondary text-sm">
                                        {e.renting_account_id}
                                    </p>
                                </div>
                            );
                        })
                    }
                    {
                        listRent.length == 0 && <span className="text-secondary">Don't have any rent</span>
                    }
                </div>
            </div>
        </div>
    );
}
