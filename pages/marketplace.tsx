import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import NFTSaleCard from "components/nft/NFTSaleCard";
import { NFTModel, NFTSaleModel } from "types";
import { loading_screen } from 'utils/loading';
import { parseIntT } from 'utils/format';

const Marketplace: NextPage = () => {
  const { account, contractMarketplace, contractNFT } = useAppContext();

  const [priceFilter, setPriceFilter] = useState<"asc" | "des">("asc");
  const [dateFilter, setDateFilter] = useState({
    "day": 0,
    "month": 0,
    "year": 0,
  })

  const [listNFT, setListNFT] = useState<Array<NFTSaleModel>>([]);

  useEffect(() => {
    async function getListNFT() {
      if (!contractMarketplace || !contractNFT) return;
      loading_screen(async () => {
        let data = await contractMarketplace.get_sales_by_nft_contract_id({
          "nft_contract_id": contractNFT.contractId,
          "from_index": "0",
          "limit": 100
        })

        setListNFT(data);
      })
    };
    getListNFT();
  }, [contractMarketplace, contractNFT]);

  function filterNFT(listNFT: Array<NFTSaleModel>) {
    return listNFT.filter((e) => {
      console.log(dateFilter);
      let date = e.token_id; // "20221020"
      if (dateFilter.day != 0 && date.substring(6, 8) != dateFilter.day.toString()) {
        return false;
      }
      if (dateFilter.month != 0 && date.substring(4, 6) != dateFilter.month.toString()) {
        return false;
      }
      if (dateFilter.year != 0 && date.substring(0, 4) != dateFilter.year.toString()) {
        return false;
      }
      return true;
    }).sort((a, b) => a.sale_conditions > b.sale_conditions ? priceFilter == "asc" ? 1 : -1 : priceFilter == "asc" ? -1 : 1);
  }

  return (
    <BaseLayout>
      <Head>
        <title>Marketplace | NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
          <div className="lg:sticky lg:top-4">
            <details open className="overflow-hidden border border-gray-200 rounded">
              <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:hidden">
                <span className="text-sm font-medium text-black">
                  Toggle Filters
                </span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <form className="border-t border-gray-200 lg:border-t-0">
                <fieldset>
                  <legend className="block w-full px-5 py-3 text-xs font-medium bg-backgroundLight">
                    Select by
                  </legend>
                  <div className="px-5 py-6 space-y-2">
                    <div className="flex items-center">
                      <input id="Day" name="type[Day]" className="border-gray-300 rounded px-2 py-1 border-none bg-backgroundLight" type="number" value={dateFilter.day == 0 ? "" : dateFilter.day}
                        onChange={(e) => setDateFilter({ ...dateFilter, day: parseIntT(e.target.value) })}
                      />
                      <label htmlFor="Day" className="text-sm font-medium ml-3">
                        Day
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="Month" name="type[Month]" className="border-gray-300 rounded px-2 py-1 border-none bg-backgroundLight appearance-none" type="number" value={dateFilter.month == 0 ? "" : dateFilter.month}
                        onChange={(e) => setDateFilter({ ...dateFilter, month: parseIntT(e.target.value) })}
                      />
                      <label htmlFor="Month" className="text-sm font-medium ml-3">
                        Month
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="Year" name="type[Year]" className="border-gray-300 rounded px-2 py-1 border-none bg-backgroundLight appearance-none" type="number" value={dateFilter.year == 0 ? "" : dateFilter.year}
                        onChange={(e) => setDateFilter({ ...dateFilter, year: parseIntT(e.target.value) })}
                      />
                      <label htmlFor="Year" className="text-sm font-medium ml-3">
                        Year
                      </label>
                    </div>
                    <div className="pt-2">
                      <button type="button" className="text-xs text-gray-500 underline"
                        onClick={() => setDateFilter({
                          "day": 0,
                          "month": 0,
                          "year": 0,
                        })}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </fieldset>
                <div>
                  <fieldset>
                    <legend className="block w-full px-5 py-3 text-xs font-medium bg-backgroundLight">
                      Price
                    </legend>
                    <div className="px-5 py-6 space-y-2">
                      <div className="flex items-center">
                        <input id="asc" type="checkbox" name="price[asc]" checked={priceFilter == "asc"} className="w-5 h-5 border-gray-300 rounded"
                          onChange={() => setPriceFilter("asc")}
                        />
                        <label htmlFor="asc" className="ml-3 text-sm font-medium">
                          Asc
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="des" type="checkbox" name="price[des]" checked={priceFilter == "des"} className="w-5 h-5 border-gray-300 rounded"
                          onChange={() => setPriceFilter("des")}
                        />
                        <label htmlFor="des" className="ml-3 text-sm font-medium">
                          Des
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                {/* <div className="flex justify-between px-5 py-3 border-t border-gray-200">
                  <button name="reset" type="button" className="text-xs font-medium text-gray-600 underline rounded">

                  </button>
                  <button name="commit" type="button" className="px-5 py-3 text-xs font-medium text-white bg-imageLight rounded"
                  onClick={()=> {}}
                  >
                    Apply Filters
                  </button>
                </div> */}
              </form>
            </details>
          </div>
          <div className="lg:col-span-3 px-2">
            <div className='my-2'>
              <span className=' font-bold'>Tổng số {filterNFT(listNFT).length}</span>
            </div>

            <section className="text-gray-600 body-font">
              <div className="container mx-auto">
                <div className="flex flex-wrap -m-4">
                  {
                    filterNFT(listNFT).map((e, i) => {
                      return (<NFTSaleCard key={i} nft={e} />);
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
