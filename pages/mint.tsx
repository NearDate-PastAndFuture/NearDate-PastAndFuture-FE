/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import MintIntroduction from "components/mint/MintIntroduction";
import Calendar from "components/mint/Calendar";
import CountDown from "components/mint/CountDown";

import Link from 'next/link';
import { format_number_2_digit } from "utils/format";
import ipfs, { get_ipfs_link, get_ipfs_link_image } from "utils/ipfs";
import { utils } from "near-api-js";
import Image from "next/image";
import { loading_screen } from "utils/loading";
import { new_json_file } from "utils/file";
import { useRouter } from 'next/router';
import { IPFSMessage } from 'types';

const Mint: NextPage = () => {
  const { account, contractNFT } = useAppContext();

  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [isMintd, setIsMinted] = useState<boolean>(false);

  let dateObj = new Date();
  let monthNow = dateObj.getUTCMonth() + 1; //months from 1-12
  let dayNow = dateObj.getUTCDate();
  let yearNow = dateObj.getUTCFullYear();

  const [day, setDay] = useState<number>(dayNow);
  const [month, setMonth] = useState<number>(monthNow);
  const [year, setYear] = useState<number>(yearNow);

  const [message, setMessage] = useState<string>("");

  const [timeoutToMint, setTimeoutToMint] = useState<number | null>(null);

  const [firstMint, setFirstMint] = useState<boolean>(true);

  const [canNextClick, setCanNextClick] = useState<boolean>(false);

  const stepProcessRef = useRef<null | HTMLDivElement>(null);
  const stepProcessExecuteScroll = () => {
    if (stepProcessRef && stepProcessRef.current) {
      stepProcessRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function setDayMonthYear(day: number, month: number, year: number) {
    setDay(day);
    setMonth(month + 1);
    setYear(year);
    stepProcessExecuteScroll();
  }

  async function onNextClick() {
    if (canNextClick) {
      if (step != 3) {
        setStep(step + 1);
        setCanNextClick(false);
        return;
      }
      loading_screen(async () => {
        let neardate = `${year}${format_number_2_digit(month)}${format_number_2_digit(day)}`;
        // upload to ipfs
        const json_data: IPFSMessage = {
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
          "message_url": ipfs_link_uploaded,
        }, 30000000000000, firstMint ? utils.format.parseNearAmount("0.01") : utils.format.parseNearAmount("1"));

        router.push(`nft/${neardate}`);
      }, "NearDate is now minting your date")
    }
  }

  useEffect(() => {
    async function checkoutNFTExsit() {
      if (!contractNFT) return;
      try {
        const data = await contractNFT.nft_token({
          "token_id": `${year}${format_number_2_digit(month)}${format_number_2_digit(day)}`
        });
        if (data === null) {
          setCanNextClick(true);
          setIsMinted(false);
        } else {
          setCanNextClick(false);
          setIsMinted(true);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const checkTime = await contractNFT.get_mint();
        if (checkTime.length != 2) {
          return;
        } 
        let time = checkTime[0];
        let persentage = checkTime[1];
        setTimeoutToMint(time);
      } catch (err) {
        console.log(err);
      }

    }
    checkoutNFTExsit();
  }, [day, month, year, contractNFT]);

  useEffect(()=> {
    async function checkFirstMint() {
      try {
        if (!account || !contractNFT) {
          return;
        }

        const checkFirstMint = await contractNFT.get_first_mint_address( {
          "account_id": account.accountId,
        });

        setFirstMint(checkFirstMint);
      } catch( err) {
        console.log(err);
      }
    }
    checkFirstMint();
  }, [account, contractNFT]);

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
        <Calendar setDayMonthYear={setDayMonthYear} />

        <div className='pt-24'>
          <div className="mb-12 px-4 py-3 text-white bg-yellow-500">
            <div className="text-sm font-medium text-center">
              Next time to mint in 
              <CountDown timeEndAction={()=> {}} dateInit={new Date(timeoutToMint || Date.now())}/>
              <Link href="/marketplace" passHref>
                <a className="underline"> <span className='text-secondary'>or </span> Go to Martketplace → </a>
              </Link>
            </div>
          </div>

          <div ref={stepProcessRef} className="relative after:inset-x-0 after:h-0.5 after:absolute after:top-1/2 after:-translate-y-1/2 after:block after:rounded-lg after:bg-gray-100">
            <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
              <li className="flex items-center p-2 bg-backgroundLight rounded-sm">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 1 ? "bg-blue-600" : "bg-background"}`}>
                  1
                </span>
                <span className="hidden sm:block sm:ml-2 text-primary"> Select </span>
              </li>
              <li className="flex items-center p-2 bg-backgroundLight rounded-sm">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 2 ? "bg-blue-600" : " bg-background"}`}>
                  2
                </span>
                <span className="hidden sm:block sm:ml-2 text-primary"> Message </span>
              </li>
              <li className="flex items-center p-2 bg-backgroundLight rounded-sm">
                <span className={`w-6 h-6 text-[10px] font-bold leading-6 text-center text-white rounded-full ${step == 3 ? "bg-blue-600" : " bg-background"}`}>
                  3
                </span>
                <span className="hidden sm:block sm:ml-2 text-primary"> Payment </span>
              </li>
            </ol>
          </div>
        </div>

        <div className='container pt-12 grid md:grid-cols-2 grid-cols-1 gap-4'>
          {
            step == 1 && (
              <div className='md:px-24 px-12 flex flex-col'>
                <span>Select your date above calendar</span>
              </div>
            )
          }
          {
            step == 2 && (
              <div className='md:px-24 px-12 flex flex-col'>
                <label className="mt-6 relative block p-3 md:border-2 border border-gray-200 rounded-lg" htmlFor="message">
                  <span className="text-xs font-medium text-primary">
                    Message
                  </span>
                  <textarea className="w-full bg-transparent text-secondary p-0 text-sm border-none focus:ring-0" id="message" placeholder="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                </label>
              </div>
            )
          }
          {
            step == 3 && (
              <div className='md:px-24 px-12 flex flex-col items-start'>
                <p className='text-xl font-semibold'>Message</p>
                <p className='text-md'>{message}</p>
                <p className='text-xl font-semibold mt-2 lg:mt-4'>Price</p>
                <p className='text-md'>{firstMint ? "Free" : "1 NEAR"}</p>
                <button className='mt-5 bg-blue-500 px-5 py-2 rounded-md hover:bg-blue-600' onClick={() => setCanNextClick(true)}>
                  Confirm
                </button>
              </div>
            )
          }

          <div className='px-24 flex flex-col items-center'>
            <div className='h-64 w-64 bg-gray-400 rounded-md'>
              <a className="block relative rounded overflow-hidden h-full cursor-pointer">
                <Image alt="neardate"
                  className="object-center" layout='fill'
                  src={get_ipfs_link_image(`${year}${format_number_2_digit(month)}${format_number_2_digit(day)}`)}
                />
                {
                  isMintd && (
                    <div className="absolute right-1 bottom-2 border-amber-900/10 bg-amber-50 rounded-sm px-2 py-1 font-semibold text-amber-700">
                      Mined
                      <span className="animate-ping w-2.5 h-2.5 bg-amber-600/75 rounded-full absolute -top-1 -left-1"></span>
                      <span className="w-2.5 h-2.5 bg-amber-600 rounded-full absolute -top-1 -left-1"></span>
                    </div>
                  )
                }
              </a>
            </div>
            <span>
              {year}-{format_number_2_digit(month)}-{format_number_2_digit(day)}
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
