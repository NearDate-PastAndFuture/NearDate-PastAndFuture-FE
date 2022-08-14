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
          <div className="flex flex-wrap -m-4">
            {
              listNFT.map((e, i) => {
                return (<NFTItemCard key={i} nft={e}/>);
              })
            }
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default MyNearDate
