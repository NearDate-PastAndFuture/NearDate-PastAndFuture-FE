import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { NFTMessageModel, NFTModel, NFTSaleModel, NFTBidModel, NFTSlotModel } from "types";
import ipfs, { get_ipfs_link, get_ipfs_link_image } from 'utils/ipfs';
import { utils } from "near-api-js";
import { loading_screen } from "utils/loading";
import { new_json_file } from 'utils/file';
import Swal from 'sweetalert2';

const NFTItem: NextPage = () => {
  const router = useRouter()
  const { id } = router.query;
  const { account, contractMarketplace, contractNFT } = useAppContext();

  const [message, setMessage] = useState<NFTMessageModel>();

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isDepositYet, setIsDepositYet] = useState<boolean>(false);

  const [isSale, setIsSale] = useState<boolean>(false);

  const [priceSale, setPriceSale] = useState<number>(0);

  const [transferAccountId, setTransferAccountId] = useState<string>("");

  const [rent, setRent] = useState<number>(0);

  const [listBid, setListBid] = useState<Array<NFTBidModel>>([]);

  const [listRentSlot, setListRentSlot] = useState<Array<NFTSlotModel>>([]);

  const [listSlotRent, setListRent] = useState([
    "asdf asdf asdf asdf",
    "Asdf asdf asdf a sdf a sdfa a sdf asdf a sdf as df asd fa sdf"
  ]);

  useEffect(() => {
    async function getData() {
      if (!account) return;
      if (!id) return;

      loading_screen(async () => {
        let data: NFTModel = await contractNFT.nft_token({
          "token_id": id?.toString()
        });

        console.log("nft: ", data);

        if (data?.approved_account_ids[contractMarketplace.contractId] > 0) {
          setIsSale(true);
          let price: NFTSaleModel = await contractMarketplace.get_sale({
            "nft_contract_token": contractNFT.contractId + "." + id?.toString(),
          });
          if (price != null) {
            setPriceSale(parseFloat(utils.format.formatNearAmount(price.sale_conditions)));
          } else {
            setIsSale(false);
          }
        }

        if (data.owner_id == account.accountId) {
          setIsOwner(true)

          let checkDeposit = await contractMarketplace.storage_balance_of({
            "account_id": account.accountId
          })
          if (checkDeposit >= 0.1) {
            setIsDepositYet(true);
          }

          let getListBid: Array<NFTBidModel> = await contractMarketplace.get_bid_token_by_token_id({
            "token_id": id?.toString(),
          });
          setListBid(getListBid);
        }

        let message_data_resp = await fetch(data.message);
        let message_data: NFTMessageModel = await message_data_resp.json();

        setMessage(message_data);

        let rent_message_list = await contractMarketplace.get_rent_by_token_id({
          "token_id": id?.toString()
        })

        console.log("rent_message_list", rent_message_list);
        if (rent_message_list != null) {
          setListRent([]);
        } 
      })
    };
    getData();
  }, [account, contractMarketplace, contractNFT, id]);

  async function onDepositClick() {
    loading_screen(async () => {
      await contractMarketplace.storage_deposit({
        "account_id": account.accountId,
      }, 30000000000000, utils.format.parseNearAmount("0.1"))
      setIsDepositYet(true);
    }, "NearDate is deposit");
  }

  async function onPutSaleClick() {
    loading_screen(async () => {
      let data = await contractNFT.nft_approve({
        "token_id": id?.toString(),
        "account_id": contractMarketplace.contractId,
        "msg": JSON.stringify({ "sale_conditions": utils.format.parseNearAmount(priceSale.toString()) }),
      }, 30000000000000, utils.format.parseNearAmount("0.01"));

      setIsSale(true);
    }, 'NearDate is sale your NFT to marketplace');
  }

  async function onEditSaleClick() {
    Swal.fire({
      title: 'Update price',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        loading_screen(async () => {
          let data = await contractMarketplace.update_price({
            "nft_contract_id": contractNFT.contractId,
            "token_id": id?.toString(),
            "price": utils.format.parseNearAmount(result.value.toString()),
          }, 30000000000000, "1")
          setPriceSale(result.value);
        }, "NearDate is updating your price sale");
      }
    })
  }

  async function onEditMessageClick() {
    Swal.fire({
      title: 'Update message',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputAutoTrim: true,
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        loading_screen(async () => {
          const json_data: NFTMessageModel = {
            "id": id?.toString() || "",
            "message": result.value.toString(),
            "token_created_date": message?.token_created_date || Date.now(),
            "message_updated_date": Date.now(),
          };
          let file_name = `${id?.toString()}_update_${Date.now()}.json`;
          const file = new_json_file(json_data, file_name);
          let domain = await ipfs.put([file]);
          let ipfs_link_uploaded = get_ipfs_link(domain, file_name);

          let data = await contractNFT.nft_update({
            "token_id": id?.toString(),
            "message_url": ipfs_link_uploaded,
          }, 30000000000000, "1");

          setMessage(json_data);
        }, "NearDate is updating message");
      }
    })
  }

  async function onCancelSaleClick() {

  }

  async function onOfferSaleClick() {
    loading_screen(async () => {
      let data = await contractMarketplace.offer({
        "nft_contract_id": contractNFT.contractId,
        "token_id": id?.toString(),
      }, 30000000000000, utils.format.parseNearAmount(priceSale.toString()));

    }, "NearDate is offering")
  }

  async function onTransferClick() {
    loading_screen(async () => {
      let data = await contractNFT.nft_transfer({
        "receiver_id": transferAccountId,
        "token_id": id?.toString(),
        "memo": "NearDate NFT transfer",
      }, 30000000000000, "1")
      setIsOwner(false);
    }, "NearDate is transfering")
  }

  async function onOfferAnotherSaleClick() {
    Swal.fire({
      title: 'Your offer',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Offer',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        loading_screen(async () => {
          let data = contractMarketplace.bid_token({
            "token_id": id?.toString(),
          }, 30000000000000, utils.format.parseNearAmount(result.value.toString()));

        }, "NearDate is sending your offer request")
      }
    })
  }

  async function onAccepBidClick(bid_id: number) {
    Swal.fire({
      title: 'You confirm',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        loading_screen(async () => {
          let data = contractMarketplace.accept_bid_token({
            "bid_id": bid_id,
          }, 30000000000000, "1");

        }, "NearDate is proccessing")
      }
    })
  }

  async function onRentSlotClick() {
    let messageSlot = "";
    Swal.fire({
      title: 'Your offer',
      input: 'textarea',
      text: "Message",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Next',
      showLoaderOnConfirm: true,
    })
    .then((result) => {
      messageSlot = result.value;
      return Swal.fire({
        title: 'Your offer',
        input: 'number',
        text: "Price",
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Offer',
        showLoaderOnConfirm: true,
      });
    })
    .then((resutl2) => {
      if (resutl2.isConfirmed) {
        loading_screen(async () => {
          const json_data = {
            "rent_message": messageSlot,
            "message_created_date": Date.now(),
          };
          let file_name = `${id?.toString}_slot_${Date.now()}.json`;
          const file = new_json_file(json_data, file_name);
          let domain = await ipfs.put([file]);
          let ipfs_link_uploaded = get_ipfs_link(domain, file_name);

          let data = contractMarketplace.bid_rent({
            "token_id": id?.toString(),
            "message": ipfs_link_uploaded,
            "start_at": Date.now(),
            "expire_at": 1 * 1000 * 24 * 60 * 60
          }, 30000000000000, utils.format.parseNearAmount(resutl2.value.toString()));

        }, "NearDate is proccessing")
      }
    })
  }

  return (
    <BaseLayout>
      <Head>
        <title>{id} | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='container py-12 px-5 mx-auto'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-1 flex flex-col justify-start items-center w-full'>
            <div className="container relative block group h-96">
              <span className="absolute inset-0" />
              <div className="relative flex items-end h-full transition-transform transform bg-white group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="px-8 pb-8 transition-opacity group-hover:opacity-0 group-hover:absolute w-full h-full">
                  <div className="block relative rounded overflow-hidden h-full">
                    {
                      id && <Image alt="neardate" className="h-full object-cover object-center w-full" src={get_ipfs_link_image(id.toString())} layout='fill' />
                    }
                  </div>
                  <h2 className="mt-4 text-2xl font-medium text-center truncate text-ellipsis">{message?.message}</h2>
                </div>
                <div className="w-full absolute p-8 transition-opacity opacity-0 border-black border-2 group-hover:opacity-100 group-hover:relative h-full">
                  <h2 className="mt-4 text-2xl font-medium">{message?.message}</h2>
                  <p>Last updated at: {`${new Date(message?.message_updated_date || Date.now()).toLocaleString("en-US")}`}</p>
                  <p className="mt-4">
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-5 flex flex-col justify-start'>
            {
              listSlotRent.map((e, i)=> {
                return (<p key={e + i} className='mt-1 font-semibold'>{e}</p>);
              })
            }
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex flex-col justify-center items-start'>

              <div className='flex flex-row justify-center items-center mb-5'>
                <span className=' font-semibold text-2xl'>{message?.message}</span>
                {
                  isOwner && <button className='ml-2' onClick={onEditMessageClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                }
              </div>
              {
                isSale && <div className='flex flex-row justify-center items-center mb-5'>
                  <span className=' font-semibold text-xl'>Sale price: {priceSale} NEAR</span>
                  {/* <div className='w-12 h-12'><NearProtocolLogo /></div> */}
                  {
                    isOwner && <button className='ml-2' onClick={onEditSaleClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  }
                </div>
              }
            </div>

            {
              !isOwner &&
              <div className='flex flex-row justify-start gap-4'>
                {
                  isSale && (
                    <button className='mt-5 bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md'
                      onClick={onOfferSaleClick}
                    >
                      Offer
                    </button>
                  )
                }
                <button className='mt-5 bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md'
                  onClick={onOfferAnotherSaleClick}
                >
                  Make another offer
                </button>
                <button className='mt-5 bg-yellow-500 px-5 py-2 font-semibold hover:bg-yellow-600 rounded-md'
                  onClick={onRentSlotClick}
                >
                  Rent Slot
                </button>
              </div>
            }
            {
              (isOwner && !isSale) && (
                <>
                  {
                    !isDepositYet && (
                      <>
                        <span>You must deposit before do sale</span>
                        <button className=' bg-yellow-400 px-3 py-2 mb-5 round-md'
                          onClick={onDepositClick}
                        >Deposit</button>
                      </>
                    )
                  }
                  <label className="relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="price">
                    <span className="text-xs font-medium text-gray-500">
                      Price
                    </span>
                    <input className="w-full p-0 text-sm border-none focus:ring-0" id="price" type="number" placeholder="5"
                      value={priceSale}
                      onChange={(e) => setPriceSale(parseFloat(e.target.value))}
                    />
                  </label>
                  <button className='mt-2 bg-blue-500 px-5 py-2 rounded-md'
                    onClick={onPutSaleClick}
                  >
                    Put it Marketplace
                  </button>
                  <label className="mt-12 relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="transfer">
                    <span className="text-xs font-medium text-gray-500">
                      Account ID
                    </span>
                    <input className="w-full p-0 text-sm border-none focus:ring-0 outline-0" id="transfer" type="text" placeholder="phamnhut.testnet"
                      value={transferAccountId}
                      onChange={(e) => setTransferAccountId(e.target.value)}
                    />
                  </label>
                  <button className='mt-2 bg-blue-500 px-5 py-2 rounded-md'
                    onClick={onTransferClick}
                  >
                    Transfer
                  </button>
                </>
              )
            }
            {
              isOwner && <>
                <h2 className='mt-12 text-xl font-semibold border-b-2 border-black'>
                  Bid NFT
                </h2>
                <div className="mt-2 overflow-hidden overflow-x-auto border border-gray-100 rounded">
                  <table className="min-w-full text-sm divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">ID</th>
                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Account ID</th>
                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Price</th>
                        <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {
                        listBid.map((e, i) => {
                          return (
                            <tr key={e.bid_id}>
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{e.bid_id}</td>
                              <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{e.bid_account_id}</td>
                              <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{utils.format.formatNearAmount(e.price)} NEAR</td>
                              <td className="px-4 py-2 text-blue-700 whitespace-nowrap hover:text-blue-900 cursor-pointer"
                                onClick={() => onAccepBidClick(e.bid_id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </>
            }
            <h2 className='mt-12 text-xl font-semibold border-b-2 border-black'>
              {!isOwner && "Your "} Rent Slot
            </h2>
            <div className="mt-2 overflow-hidden overflow-x-auto border border-gray-100 rounded">
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Start At</th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Account ID</th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Expires</th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Message</th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {
                    listRentSlot.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{e.starts_at}</td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{e.renting_account_id}</td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{e.expires_at}</td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap truncate">{e.rent_message}</td>
                          <td className="px-4 py-2 text-blue-700 whitespace-nowrap hover:text-blue-900 cursor-pointer"
                            // onClick={() => onAccepBidClick(e.bid_id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>

            {
              (isOwner && isSale) && <button className='mt-12 bg-yellow-500 px-5 py-2 rounded-md'
                onClick={onCancelSaleClick}
              >
                Cancal sale
              </button>
            }
          </div>
        </div>
      </div>
    </BaseLayout >
  );
}

export default NFTItem