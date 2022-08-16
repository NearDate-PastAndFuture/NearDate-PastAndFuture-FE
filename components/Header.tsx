import Link from 'next/link'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppContext } from 'context/state';
import { login, logout } from "utils/near";
import { truncate } from "utils/format";
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';

interface HeaderProps {

}

export default function Header({ }: HeaderProps) {
  const router = useRouter();
  const { asPath } = router;
  const { account, balance } = useAppContext();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <Link href="/" passHref>
            <h2 className="ml-3 text-xl font-bold cursor-pointer">NearDate-PastAndFuture</h2>
          </Link>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/" passHref>
            <a className={`mr-5 hover:text-gray-900 cursor-pointer hover:underline" ${asPath == "/" ? "font-bold" : ""}`}>Home</a>
          </Link>
          {
            account?.accountId && <Link href="/mint" passHref>
              <a className={`mr-5 hover:text-gray-900 cursor-pointer hover:underline" ${asPath == "/mint" ? "font-bold" : ""}`}>Mint</a>
            </Link>
          }
          <Link href="/marketplace" passHref>
            <a className={`mr-5 hover:text-gray-900 cursor-pointer hover:underline" ${asPath == "/marketplace" ? "font-bold" : ""}`}>Martketplace</a>
          </Link>
          {
            account?.accountId && <Link href="/my-neardate" passHref>
              <a className={`mr-5 hover:text-gray-900 cursor-pointer hover:underline" ${asPath == "/my-neardate" ? "font-bold" : ""}`}>My NearDate</a>
            </Link>
          }
        </nav>
        {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button> */}
        {
          account?.accountId ?
            (<div className="flex items-center">
              <div className="ml-2 md:w-40 text-right  top-16">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {truncate(account?.accountId, 20)}
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a href={`https://explorer.testnet.near.org/accounts/${account?.accountId}`} target="_blank" rel="noreferrer" >
                            <button
                              className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >

                              {account?.accountId}
                            </button>
                          </a>

                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              router.push('/'); setTimeout(() => {
                                logout()
                              }, 1000);
                            }}
                            className={`${active ? 'bg-secondary text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >

                            Disconnect
                          </button>
                        )}
                      </Menu.Item>
                    </div>

                  </Menu.Items>
                </Menu>
              </div>
            </div>)
            :
            (<button className="bg-secondary px-6 py-2 rounded-md font-bold" onClick={login}>Connect wallet</button>)
        }
      </div>
    </header>
  )
}
