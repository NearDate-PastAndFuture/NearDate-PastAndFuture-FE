import { Contract, WalletConnection } from 'near-api-js';
import React, { createContext, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { accountBalance } from 'utils/near';

interface State {
  account?: any;
  contractNFT?: any;
  contractMarketplace?: any;
  balance?: string
};

declare const window: {
  walletConnection: WalletConnection;
  accountId: any;
  contractNFT: Contract;
  contractMarketplace: Contract;
  location: any;
};

const AppContext = createContext<State>({});

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [account, setaccount] = useState<any>(null)
  const [contractNFT, setContractNFT] = useState<any>(null)
  const [contractMarketplace, setContractMarketplace] = useState<any>(null)
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    setaccount(window.walletConnection?.account())
    setContractNFT(window.contractNFT)
    setContractMarketplace(window.contractMarketplace)
  }, [])


  const getBalance = useCallback(async () => {
    if (account?.accountId) {
      setBalance(await accountBalance());
    }
  }, [account]);
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const state: State = {
    account,
    contractNFT: contractNFT,
    contractMarketplace: contractMarketplace,
    balance
  }
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}