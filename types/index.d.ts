import { WalletConnection } from "near-api-js";

declare global {
  interface Window {
    walletConnection?: WalletConnection;
    accountId?: any;
    contract?: any;
  }
}

export interface NFTMetadataModel {
  message: string;
  copies: null
  description: string;
  expires_at: null
  extra: null
  issued_at: null
  media: null
  media_hash: null
  reference: null
  reference_hash: null
  starts_at: null
  title: string;
  updated_at: Date;
}

export interface NFTModel {
  approved_account_ids: any;
  message: string;
  metadata: NFTMetadataModel;
  owner_id: string;
  royalty: any
  token_id: string;
}

export interface NFTMessageModel {
  id: string;
  message: string
  message_updated_date: number;
  token_created_date: number;
}

export interface NFTSaleModel {
  approval_id: number
  nft_contract_id: string
  owner_id: string
  sale_conditions: string
  token_id: string
}

export interface NFTBidModel {
  bid_account_id: string;
  bid_id: number;
  price: string;
  token_id: string;
}

export interface NFTSlotModel {
  renting_account_id: string;
  starts_at: number;
  expires_at: number;
  rent_message: string;
  message: string;
}

export interface NFTBidSlotModel {
  bid_account_id: string;
  bid_id: number;
  expires_at: number;
  message_url: string;
  price: string;
  starts_at: number;
  token_id: string;
}

export interface NFTRentSlotModel {
  owner_id: string;
  token_id: string;
  message_url: string;
  rented_slots: Array<NFTSlotModel>;
}
