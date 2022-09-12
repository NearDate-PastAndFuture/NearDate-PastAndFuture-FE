import { Contract, WalletConnection } from 'near-api-js';
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from 'context/state';
import Header from './Header';
import Footer from './Footer';
import SideBar from "./SideBar";

interface BaseLayoutProps {
  children: React.ReactNode
}

declare const window: {
  walletConnection: WalletConnection;
  accountId: any;
  contract: Contract;
  location: any;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  const router = useRouter()
  const { account } = useAppContext()

  // useLayoutEffect(() => {
  //   if (!window.walletConnection.account().accountId) {
  //     router.push('/')
  //   }
  // }, [])

  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* <aside className='fixed bg-gradient-to-r from-backgroundLight to-background md:w-60 w-16'>
        <SideBar />
      </aside> */}
      <main className=''>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
