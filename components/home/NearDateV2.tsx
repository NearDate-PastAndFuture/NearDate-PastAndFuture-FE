import NFTShowCard from "components/nft/NFTShowCard";
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

  function nextIndex() {
    if (indexNearDateNext != null) {
      setIndexNearDateNow(indexNearDateNext);
      setIndexNearDateNext(indexNearDateNext + 1 < listNft.length ? indexNearDateNext + 1 : null);
      setIndexNearDatePrevious(indexNearDateNow);
    }
  }

  function previousIndex() {
    if (indexNearDatePrevious != null) {
      setIndexNearDateNow(indexNearDatePrevious);
      setIndexNearDateNext(indexNearDateNow);
      setIndexNearDatePrevious(indexNearDatePrevious - 1 < 0 ? null : indexNearDatePrevious - 1)
    }
  }

  return (
    <section className="py-24 flex justify-center flex-col items-center">
      <div className="my-16 flex gap-4 md:gap-16">
        <div className="md:w-[18rem] w-[3rem] h-96 overflow-hidden relative " >
          <div className="md:w-[18rem] w-[3rem] absolute h-96 bg-gradient-to-l from-transparent to-background cursor-pointer"
            onClick={previousIndex}>
          </div>
          <div className="float-right">
            {
              indexNearDatePrevious != null && <NFTShowCard nft={listNft[indexNearDatePrevious]} />
            }
          </div>
        </div>
        {
          indexNearDateNow != null && <NFTShowCard nft={listNft[indexNearDateNow]} />
        }
        <div className="md:w-[18rem] w-[3rem] h-96 overflow-hidden relative">
          <div className="md:w-[18rem] w-[3rem] absolute h-96 bg-gradient-to-r from-transparent to-background cursor-pointer"
            onClick={nextIndex}
          >
          </div>
          {
            indexNearDateNext != null && <NFTShowCard nft={listNft[indexNearDateNext]} />
          }
        </div>
      </div>
      <div className="mt-4 max-w-xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href='/mint'>
            <a className="w-full px-12 py-3 text-sm font-medium text-primary bg-backgroundLight border-b-2 rounded-md shadow sm:w-auto hover:bg-secondary transition-all duration-200 hover:text-imageLight focus:outline-none focus:ring">
              Mine Your Date
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
