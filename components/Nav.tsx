import Link from 'next/link'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppContext } from 'context/state';
import { login, logout } from "utils/near";
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';

interface NavProps {

}

export default function Nav({ }: NavProps) {
  const router = useRouter();
  const { account, balance, contract } = useAppContext();

  return (
    <div className="flex justify-between">
      <Link href="/" passHref>
        <h2 className="font-bold cursor-pointer text-sm hover:underline ">NearDate-PastAndFuture</h2>
      </Link>
      {
        account?.accountId ?
          (<div className="flex items-center">
            <div className="ml-2 md:w-40 text-right  top-16">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    NEAR {balance}
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
  )
}
