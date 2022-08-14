const CONTRACT_NFT = process.env.NEXT_PUBLIC_NFT_CONTRACT || "nft-contract-test.phamnhut.testnet";
const CONTRACT_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT || "nft-market-test.phamnhut.testnet";

function environment(env: string) {
  switch (env) {
    case "mainnet": // line 5
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractNFT: CONTRACT_NFT,
        contractMarketplace: CONTRACT_MARKETPLACE,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };
    case "testnet": // line 14
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractNFT: CONTRACT_NFT,
        contractMarketplace: CONTRACT_MARKETPLACE,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    default:
      throw Error(`Unknown environment '${env}'.`);
  }
}

export default environment;