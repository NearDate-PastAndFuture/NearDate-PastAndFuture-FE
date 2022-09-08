import NFTItemCardV2 from "components/nft/NFTItemCardV2";
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
          "number": 10
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
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap w-full flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-primary">Random Date</h1>
        </div>
        <div className="container mx-auto mt-10">
          <div className="flex flex-wrap gap-10 justify-center">
            {
              listNFT.map((e, i) => {
                return (<NFTItemCardV2 key={i} nft={e} />);
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}