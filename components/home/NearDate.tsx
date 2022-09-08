import NFTCard, { CardSize } from "components/nft/NFTCard";
import { useAppContext } from "context/state";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NFTModel } from "types";
import { format_number_2_digit } from "utils/format";

export default function NearDate() {
  const { account, contractNFT } = useAppContext();

  const [listNft, setListNft] = useState<Array<NFTModel>>([]);
  const [indexNearDateNow, setIndexNearDateNow] = useState<number | null>(null);
  const [indexNearDateNext, setIndexNearDateNext] = useState<number | null>(null);
  const [indexNearDatePrevious, setIndexNearDatePrevious] = useState<number | null>(null);

  useEffect(() => {
    getData();
    async function getData() {
      if (!contractNFT) return;
      try {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        let token_id_now = `${year}${format_number_2_digit(month)}${format_number_2_digit(day)}`

        const data: Array<NFTModel> = await contractNFT.nft_tokens_by_date({
          "date": `${format_number_2_digit(month)}${format_number_2_digit(day)}`
        });
        
        data.sort((a, b) => a.token_id > b.token_id ? 1 : -1);
        setListNft(data)
        let index = data.findIndex(e => e.token_id == token_id_now || e.token_id > token_id_now);
        if (index == -1 && data.length > 0) {
          index = data.length - 1;
        }
        if (index != -1) {
          setIndexNearDateNow(index);
          if (index + 1 < data.length) {
            setIndexNearDateNext(index + 1);
          }
          if (index - 1 > -1) {
            setIndexNearDatePrevious(index - 1);
          }
        }

      } catch (err) {
        console.log(err);
      }
    }
  }, [account, contractNFT]);

  return (
    <section className="bg-gray-50 py-24">
      <div className="grid grid-cols-4 gap-4 container w-full px-5 mx-auto">
        <div className="flex flex-row items-center">
          {
            (indexNearDatePrevious != null && indexNearDatePrevious - 1 > -1) && <button onClick={() => setIndexNearDatePrevious(indexNearDatePrevious - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          }
          {
            indexNearDatePrevious != null && <NFTCard nft={listNft[indexNearDatePrevious]} size={CardSize.Small} />
          }
          {
            (indexNearDatePrevious != null && indexNearDateNow != null && indexNearDatePrevious + 1 < indexNearDateNow) && (
              <button onClick={() => setIndexNearDatePrevious(indexNearDatePrevious + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )
          }
        </div>
        <div className="col-span-2 flex flex-col justify-center items-center">
          {
            indexNearDateNow != null && <NFTCard nft={listNft[indexNearDateNow]} size={CardSize.Large} />
          }
        </div>
        <div className="flex flex-row items-center">
          {
            (indexNearDateNext != null && indexNearDateNow != null && indexNearDateNext - 1 > indexNearDateNow) && (
              <button onClick={() => setIndexNearDateNext(indexNearDateNext - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )
          }
          {
            indexNearDateNext != null && <NFTCard nft={listNft[indexNearDateNext]} size={CardSize.Small} />
          }
          {
            (indexNearDateNext != null && indexNearDateNext + 1 < listNft.length) && (
              <button onClick={() => setIndexNearDateNext(indexNearDateNext + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )
          }
        </div>
      </div>
      <div className="mt-12 max-w-xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href={'/mint'}>
            <a className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring">
              Mint Your Date
            </a>
          </Link>
          {/* <Link href={'/about'}>
            <a className="block w-full px-12 py-3 text-sm font-medium text-red-600 rounded shadow sm:w-auto hover:text-red-700 active:text-red-500 focus:outline-none focus:ring">
              Learn More
            </a>
          </Link> */}
        </div>
      </div>
    </section>

  );
}