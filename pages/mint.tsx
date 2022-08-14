/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import MintIntroduction from "components/mint/MintIntroduction";
import Link from 'next/link';
import { format_number_2_digit } from "utils/format";
import ipfs, { get_ipfs_link, get_ipfs_link_image } from "utils/ipfs";
import { utils } from "near-api-js";
import Image from "next/image";
import { loading_screen } from "utils/loading";
import { new_json_file } from "utils/file";
import { useRouter } from 'next/router';

const Mint: NextPage = () => {
  const { account, contractNFT } = useAppContext();

  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [nearDateTitle, setNearDateTitle] = useState<string>("");

  const [day, setDay] = useState<number>(1);
  const [mounth, setMounth] = useState<number>(1);
  const [year, setYear] = useState<number>(2022);

  const [message, setMessage] = useState<string>("");

  const [canNextClick, setCanNextClick] = useState<boolean>(false);

  async function onNextClick() {
    if (canNextClick) {
      if (step != 3) {
        setStep(step + 1);
        setCanNextClick(false);
        return;
      }
      loading_screen(async () => {
        let neardate = `${year}${format_number_2_digit(mounth)}${format_number_2_digit(day)}`;
        // upload to ipfs
        const json_data = {
          "id": neardate,
          "message": message,
          "token_created_date": Date.now(),
          "message_updated_date": Date.now(),
        };
        let file_name = `${neardate}_test.json`;
        const file = new_json_file(json_data, file_name);
        let domain = await ipfs.put([file]);
        let ipfs_link_uploaded = get_ipfs_link(domain, file_name);

        const data = await contractNFT.nft_mint({
          "token_id": neardate,
          "metadata": {
            "title": message,
          },
          "receiver_id": account.accountId,
          "message_url": ipfs_link_uploaded
        }, 30000000000000, utils.format.parseNearAmount("0.01"));

        router.push(`nft/${neardate}`);
      }, "NearDate is now minting your date")
    }
  }

  useEffect(() => {
    async function checkoutNFTExsit() {
      if (!contractNFT) return;
      try {
        const data = await contractNFT.nft_token({
          "token_id": `${year}${format_number_2_digit(mounth)}${format_number_2_digit(day)}`
        });
        if (data === null) {
          setCanNextClick(true);
          setNearDateTitle("");
        } else {
          setCanNextClick(false);
          setNearDateTitle(data?.metadata?.title);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkoutNFTExsit();
  }, [day, mounth, year]);

  useEffect(() => {
    if (message.length != 0) {
      setCanNextClick(true);
    } else {
      setCanNextClick(false);
    }
  }, [message]);

  return (
    <BaseLayout>
      <Head>
        <title>Mint | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='container px-5 mx-auto pb-24'>
        <MintIntroduction />

        <div className='pt-24'>
          <div className="mb-12 px-4 py-3 text-white bg-yellow-500">
            <p className="text-sm font-medium text-center">
              Mỗi địa chỉ chỉ mint một lần
              <Link href="/marketplace" passHref>
                <a className="underline"> Chuyển đến Martketplace → </a>
              </Link>
            </p>
          </div>
          <h2 className="sr-only">Steps</h2>
          <div className="relative after:inset-x-0 after:h-0.5 after:absolute after:top-1/2 after:-translate-y-1/2 after:block after:rounded-lg after:bg-gray-100">
            <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
              <li className="flex items-center p-2 bg-white">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 1 ? "bg-blue-600" : "bg-gray-100"}`}>
                  1
                </span>
                <span className="hidden sm:block sm:ml-2"> Select </span>
              </li>
              <li className="flex items-center p-2 bg-white">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 2 ? "bg-blue-600" : "bg-gray-100"}`}>
                  2
                </span>
                <span className="hidden sm:block sm:ml-2"> Message </span>
              </li>
              <li className="flex items-center p-2 bg-white">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 3 ? "bg-blue-600" : "bg-gray-100"}`}>
                  3
                </span>
                <span className="hidden sm:block sm:ml-2"> Payment </span>
              </li>
            </ol>
          </div>
        </div>

        <div className='container pt-12 grid grid-cols-2 gap-4'>
          {
            step == 1 && (
              <div className='px-24 flex flex-col'>
                <label className="relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="day">
                  <span className="text-xs font-medium text-gray-500">
                    Ngày
                  </span>
                  <input className="w-full p-0 text-sm border-none focus:ring-0" id="day" type="number" placeholder="01"
                    value={day}
                    onChange={(e) => setDay(parseInt(e.target.value))}
                  />
                </label>
                <label className="mt-6 relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="mounth">
                  <span className="text-xs font-medium text-gray-500">
                    Tháng
                  </span>
                  <input className="w-full p-0 text-sm border-none focus:ring-0" id="mounth" type="number" placeholder="01"
                    value={mounth}
                    onChange={(e) => setMounth(parseInt(e.target.value))} />
                </label>
                <label className="mt-6 relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="year">
                  <span className="text-xs font-medium text-gray-500">
                    Năm
                  </span>
                  <input className="w-full p-0 text-sm border-none focus:ring-0" id="year" type="number" placeholder="2022"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))} />
                </label>
              </div>
            )
          }
          {
            step == 2 && (
              <div className='px-24 flex flex-col'>
                <label className="mt-6 relative block p-3 border-2 border-gray-200 rounded-lg" htmlFor="message">
                  <span className="text-xs font-medium text-gray-500">
                    Message
                  </span>
                  <textarea className="w-full p-0 text-sm border-none focus:ring-0" id="message" placeholder="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                </label>
              </div>
            )
          }
          {
            step == 3 && (
              <div className='px-24 flex flex-col items-start'>
                <p className='text-xl font-semibold'>Message</p>
                <p className='text-md'>{message}</p>
                <button className='mt-5 bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-600' onClick={() => setCanNextClick(true)}>
                  Confirm
                </button>
              </div>
            )
          }

          <div className='px-24 flex flex-col items-center'>
            <div className='h-64 w-64 bg-gray-400 rounded-md'>
              {/* <Image alt="neardate"
                className="object-center" layout='fill'
                src={get_ipfs_link_image(`${year}${format_number_2_digit(mounth)}${format_number_2_digit(day)}`)}
              /> */}
            </div>
            <span>
              {year}-{format_number_2_digit(mounth)}-{format_number_2_digit(day)}
            </span>
            <span>
              {nearDateTitle}
            </span>
            <button className={
              `mt-6 inline-flex items-center px-8 py-3 text-white border  rounded hover:bg-transparent  focus:outline-none focus:ring
              ${canNextClick ? "bg-indigo-600 border-indigo-600 hover:text-indigo-600" : "bg-gray-600 border-gray-600 hover:text-gray-600"}
              `
            }
              onClick={onNextClick}
            >
              <span className="text-sm font-medium">
                {step == 3 ? "Mint" : "Next"}
              </span>
              <svg className="w-5 h-5 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Mint
