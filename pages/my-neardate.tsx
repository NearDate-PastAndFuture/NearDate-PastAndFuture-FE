import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import NFTItemCardV2 from "components/nft/NFTItemCardV2";
import { NFTBidModel, NFTModel, NFTSlotModel } from "types";
import { loading_screen } from 'utils/loading';

enum TabSelect {
  YourNFT,
  YourBid,
  YourSlot,
  YourSlotBid,
}

const MyNearDate: NextPage = () => {
  const { account, contractMarketplace, contractNFT } = useAppContext();

  const [tabSelected, setTabSelected] = useState<TabSelect>(TabSelect.YourNFT);

  const [listNFT, setListNFT] = useState<Array<NFTModel>>([]);

  useEffect(() => {
    async function getAsyncToken(token_id_list: Array<String>) {
      return Promise.all(token_id_list.map((e) => contractNFT.nft_token({
        "token_id": e
      })))
    }

    async function getListNFT() {
      if (!account) return;
      loading_screen(async () => {
        if (tabSelected == TabSelect.YourNFT) {
          let data = await contractNFT.nft_tokens_for_owner({
            "account_id": account.accountId
          });
          setListNFT(data);
        }
        if (tabSelected == TabSelect.YourBid) {
          let data: Array<NFTBidModel> = await contractMarketplace.get_bid_token_by_account_id({
            "account_id": account.accountId
          });
          let token_id_list = data.map(e => e.token_id);
          let list_token = await getAsyncToken(token_id_list);
          setListNFT(list_token);
        }
        if (tabSelected == TabSelect.YourSlot) {
          let data = await contractMarketplace.get_rent_by_account_id({
            "account_id": account.accountId
          })
          let token_id_list = data.map((e: { token_id: string; }) => e?.token_id);
          let list_token = await getAsyncToken(token_id_list);
          setListNFT(list_token);
        }
        if (tabSelected == TabSelect.YourSlotBid) {
          let data = await contractMarketplace.get_bid_rent_by_account_id({
            "account_id": account.accountId
          })
          let token_id_list = data.map((e: { token_id: string; }) => e?.token_id);
          let list_token = await getAsyncToken(token_id_list);
          setListNFT(list_token);
        }
      })
    };
    getListNFT();
  }, [account, contractNFT, contractMarketplace, tabSelected]);

  return (
    <BaseLayout>
      <Head>
        <title>My MearDate | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <nav className="flex text-sm font-medium border-b border-gray-100">
            <button className={`cursor-pointer p-4 -mb-px border-b hover:text-cyan-500 ${tabSelected == TabSelect.YourNFT && "text-cyan-500 border-current"}`}
              onClick={() => setTabSelected(TabSelect.YourNFT)}
            >
              Your NFT
            </button>
            <button className={`cursor-pointer p-4 -mb-px border-b hover:text-cyan-500 ${tabSelected == TabSelect.YourBid && "text-cyan-500 border-current"}`}
              onClick={() => setTabSelected(TabSelect.YourBid)}
            >
              Your NFT Bid
            </button>
            <button className={`cursor-pointer p-4 -mb-px border-b hover:text-cyan-500 ${tabSelected == TabSelect.YourSlot && "text-cyan-500 border-current"}`}
              onClick={() => setTabSelected(TabSelect.YourSlot)}
            >
              Rent Slot
            </button>
            <button className={`cursor-pointer p-4 -mb-px border-b hover:text-cyan-500 ${tabSelected == TabSelect.YourSlotBid && "text-cyan-500 border-current"}`}
              onClick={() => setTabSelected(TabSelect.YourSlotBid)}
            >
              Rent Slot Bid
            </button>
          </nav>
          <div className="pl-10 mt-12 flex flex-wrap -m-4 gap-10">
            {
              listNFT.map((e, i) => {
                return (<NFTItemCardV2 key={i} nft={e} />);
              })
            }
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default MyNearDate
