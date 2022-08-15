import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import NFTItemCard from "components/nft/NFTItemCard";
import { NFTModel } from "types";

const MyNearDate: NextPage = () => {
  const { account, contractMarketplace, contractNFT } = useAppContext()

  const [listNFT, setListNFT] = useState<Array<NFTModel>>([]);

  useEffect(() => {
    async function getListNFT() {
      if (!account) return;
      try {
        let data = await contractNFT.nft_tokens_for_owner({
          "account_id": account.accountId
        });

        setListNFT(data);

      } catch (err) {
        console.log(err);
      }
    };
    getListNFT();
  }, [account, contractNFT]);

  return (
    <BaseLayout>
      <Head>
        <title>My MearDate | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <nav className="flex text-sm font-medium border-b border-gray-100">
            <button className="cursor-pointer p-4 -mb-px border-b border-current text-cyan-500">
              Your NFT
            </button>
            <button className="cursor-pointer p-4 -mb-px border-b border-transparent hover:text-cyan-500">
              Bid
            </button>
            <button className="cursor-pointer p-4 -mb-px border-b border-transparent hover:text-cyan-500">
              Rent Slot
            </button>
          </nav>
          <div className="mt-12 flex flex-wrap -m-4">
            {
              listNFT.map((e, i) => {
                return (<NFTItemCard key={i} nft={e} />);
              })
            }
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default MyNearDate
