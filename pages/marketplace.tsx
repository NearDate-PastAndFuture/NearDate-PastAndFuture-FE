import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import NFTItemCard from "components/nft/NFTItemCard";
import { NFTModel } from "types";
import { loading_screen } from 'utils/loading';
 
const Marketplace: NextPage = () => {
  const { account, contractMarketplace, contractNFT } = useAppContext()

  const [listNFT, setListNFT] = useState<Array<NFTModel>>([]);

  useEffect(() => {
    async function getListNFT() {
      if (!account || !contractMarketplace || !contractNFT) return;
      loading_screen(async ()=> {
        let data = await contractMarketplace.get_sales_by_nft_contract_id({
          "nft_contract_id": contractNFT.contractId,
          "from_index": "0",
          "limit": 100
        })
        console.log("get_sales_by_nft_contract_id", data);
        setListNFT(data);
      })
    };
    getListNFT();
  }, [account, contractMarketplace, contractNFT]);

  return (
    <BaseLayout>
      <Head>
        <title>Marketplace | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
          <div className="lg:sticky lg:top-4">
            <details open className="overflow-hidden border border-gray-200 rounded">
              <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:hidden">
                <span className="text-sm font-medium">
                  Toggle Filters
                </span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <form className="border-t border-gray-200 lg:border-t-0">
                <fieldset>
                  <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                    Type
                  </legend>
                  <div className="px-5 py-6 space-y-2">
                    <div className="flex items-center">
                      <input id="toy" type="checkbox" name="type[toy]" className="w-5 h-5 border-gray-300 rounded" />
                      <label htmlFor="toy" className="ml-3 text-sm font-medium">
                        Toy
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="game" type="checkbox" name="type[game]" className="w-5 h-5 border-gray-300 rounded" />
                      <label htmlFor="game" className="ml-3 text-sm font-medium">
                        Game
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="outdoor" type="checkbox" name="type[outdoor]" className="w-5 h-5 border-gray-300 rounded" />
                      <label htmlFor="outdoor" className="ml-3 text-sm font-medium">
                        Outdoor
                      </label>
                    </div>
                    <div className="pt-2">
                      <button type="button" className="text-xs text-gray-500 underline">
                        Reset Type
                      </button>
                    </div>
                  </div>
                </fieldset>
                <div>
                  <fieldset>
                    <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                      Age
                    </legend>
                    <div className="px-5 py-6 space-y-2">
                      <div className="flex items-center">
                        <input id="3+" type="checkbox" name="age[3+]" className="w-5 h-5 border-gray-300 rounded" />
                        <label htmlFor="3+" className="ml-3 text-sm font-medium">
                          3+
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="8+" type="checkbox" name="age[8+]" className="w-5 h-5 border-gray-300 rounded" />
                        <label htmlFor="8+" className="ml-3 text-sm font-medium">
                          8+
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="12+" type="checkbox" name="age[12+]" className="w-5 h-5 border-gray-300 rounded" />
                        <label htmlFor="12+" className="ml-3 text-sm font-medium">
                          12+
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="16+" type="checkbox" name="age[16+]" className="w-5 h-5 border-gray-300 rounded" />
                        <label htmlFor="16+" className="ml-3 text-sm font-medium">
                          16+
                        </label>
                      </div>
                      <div className="pt-2">
                        <button type="button" className="text-xs text-gray-500 underline">
                          Reset Age
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="flex justify-between px-5 py-3 border-t border-gray-200">
                  <button name="reset" type="button" className="text-xs font-medium text-gray-600 underline rounded">
                    Reset All
                  </button>
                  <button name="commit" type="button" className="px-5 py-3 text-xs font-medium text-white bg-green-600 rounded">
                    Apply Filters
                  </button>
                </div>
              </form>
            </details>
          </div>
          <div className="lg:col-span-3 px-2">
            <div className='my-2'>
              <span className=' font-bold'>Tổng số {listNFT.length}</span>
            </div>

            <section className="text-gray-600 body-font">
              <div className="container mx-auto">
                <div className="flex flex-wrap -m-4">
                  {
                    listNFT.map((e, i) => {
                      return (<NFTItemCard key={i} nft={e}/>);
                    })
                  }
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Marketplace
