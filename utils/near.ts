import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

declare const window: {
  walletConnection: WalletConnection;
  accountId: any;
  contractNFT: Contract;
  contractMarketplace: Contract;
  location: any;
};

export async function initializeContract() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() }, headers: {} },
      nearEnv
    )
  );
  window.walletConnection = new WalletConnection(near, null);
  window.accountId = window.walletConnection.getAccountId();
  window.contractNFT = new Contract(
    window.walletConnection.account(),
    nearEnv.contractNFT,
    {
      viewMethods: ["nft_token", "nft_tokens_for_owner"], // TODO
      changeMethods: ["nft_mint", "nft_transfer", "nft_approve", "nft_update"], // TODO
    }
  );
  window.contractMarketplace = new Contract(
    window.walletConnection.account(),
    nearEnv.contractMarketplace,
    {
      viewMethods: ["storage_balance_of", "get_sale", "get_bid_rent_by_account_id", "get_rent_by_token_id"], // TODO
      changeMethods: ["storage_deposit", "update_price", "offer", "remove_sale", "get_sales_by_nft_contract_id",
      "bid_token", "get_bid_token_by_token_id", "accept_bid_token", "get_bid_token_on_nft_by_account_id", "bid_token_cancel_and_withdraw",
      "bid_rent", "get_bid_rent_on_nft_by_account_id", 
    ], // TODO
    }
  );
}

export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractMarketplace);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}
