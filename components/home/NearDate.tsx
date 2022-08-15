import { useAppContext } from "context/state";
import React, { useEffect, useState } from "react";
import { format_number_2_digit } from "utils/format";

export default function NearDate() { 
  const { account, contractNFT } = useAppContext();
  
  const [title, setTitle] = useState("");

  useEffect(() => {
    getData();
    async function getData() {
      if (!contractNFT) return;
      try {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        const data = await contractNFT.nft_token({
          "token_id": `${year}${format_number_2_digit(month)}${format_number_2_digit(day)}`
        });
        console.log(data);
      } catch (err) { 
        console.log(err);
      }
    }
  }, [account, contractNFT]);
  return (
    <section className="bg-gray-50">
      <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {title}
            <strong className="font-extrabold text-red-700 sm:block">
            NearDate
            </strong>
          </h1>
          <p className="mt-4 sm:leading-relaxed sm:text-xl">
            
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring" href="/get-started">
              Mint Your Date
            </a>
            <a className="block w-full px-12 py-3 text-sm font-medium text-red-600 rounded shadow sm:w-auto hover:text-red-700 active:text-red-500 focus:outline-none focus:ring" href="/about">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

  );
}