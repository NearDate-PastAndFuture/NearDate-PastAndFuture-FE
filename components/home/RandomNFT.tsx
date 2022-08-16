import NFTItemCard from "components/nft/NFTItemCard";
import NFTCard, { CardSize } from "components/nft/NFTCard";
import { useEffect, useState } from 'react';
import { useAppContext } from "context/state";
import { NFTModel } from "types";

export default function RandomNFT() {
  const { account, contractNFT } = useAppContext()

  const [listNFT, setListNFT] = useState<Array<NFTModel>>([]);

  useEffect(() => {
    async function getListNFT() {
      if (!account) return;
      try {
        let data = await contractNFT.get_random_nfts({
          "number": 4
        });

        setListNFT(data);

      } catch (err) {
        console.log(err);
      }
    };
    getListNFT();
  }, [account, contractNFT]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Random Date</h1>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4">
            {
              listNFT.map((e, i) => {
                return (<NFTItemCard key={i} nft={e} />);
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}