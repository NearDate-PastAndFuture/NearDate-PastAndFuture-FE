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
      <div className="container mx-auto flex justify-between p-5 flex-col md:flex-row items-center lg:pt-8">
        <Link href="/">
          <a className='flex space-x-3 items-center md:pl-8'>
            <svg width="39" height="47" viewBox="0 0 39 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2_93)">
                <path d="M13.0852 44.0328C13.8882 44.0328 14.5391 43.3686 14.5391 42.5492C14.5391 41.7298 13.8882 41.0656 13.0852 41.0656C12.2823 41.0656 11.6313 41.7298 11.6313 42.5492C11.6313 43.3686 12.2823 44.0328 13.0852 44.0328Z" stroke="#B9D7F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.0783 44.0328C29.8813 44.0328 30.5322 43.3686 30.5322 42.5492C30.5322 41.7298 29.8813 41.0656 29.0783 41.0656C28.2753 41.0656 27.6244 41.7298 27.6244 42.5492C27.6244 43.3686 28.2753 44.0328 29.0783 44.0328Z" stroke="#B9D7F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.45391 12.8775H7.26957L11.1661 32.7427C11.299 33.4258 11.6632 34.0393 12.1948 34.476C12.7264 34.9127 13.3916 35.1446 14.0739 35.1313H28.2059C28.8883 35.1446 29.5534 34.9127 30.085 34.476C30.6167 34.0393 30.9808 33.4258 31.1138 32.7427L33.44 20.2954H8.72348" stroke="#B9D7F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g clipPath="url(#clip1_2_93)">
                <path d="M30.2944 3.38051L23.5154 7.42262C22.9805 7.74153 22.8055 8.43365 23.1244 8.9685L27.1665 15.7476C27.4854 16.2824 28.1775 16.4575 28.7124 16.1386L35.4914 12.0965C36.0263 11.7775 36.2013 11.0854 35.8824 10.5506L31.8403 3.77151C31.5214 3.23665 30.8293 3.0616 30.2944 3.38051Z" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28.2643 3.2782L29.4192 5.21507" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24.3906 5.58801L25.5455 7.52489" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24.2793 10.9053L32.9952 5.70834" stroke="#B9D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <g clipPath="url(#clip2_2_93)">
                <path d="M23.5 26.3485C23.5 25.7819 23.2749 25.2385 22.8743 24.8378C22.4736 24.4372 21.9302 24.2121 21.3636 24.2121C20.797 24.2121 20.2536 24.4372 19.853 24.8378C19.4524 25.2385 19.2273 25.7819 19.2273 26.3485C19.2273 28.8409 18.1591 29.553 18.1591 29.553H24.5682C24.5682 29.553 23.5 28.8409 23.5 26.3485Z" stroke="#B9D7F9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.9796 30.9773C21.917 31.0852 21.8272 31.1748 21.7191 31.2371C21.611 31.2993 21.4884 31.3321 21.3636 31.3321C21.2389 31.3321 21.1163 31.2993 21.0082 31.2371C20.9001 31.1748 20.8102 31.0852 20.7477 30.9773" stroke="#B9D7F9" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_2_93">
                  <rect width="34.8939" height="35.6061" fill="white" transform="translate(0 11.3939)" />
                </clipPath>
                <clipPath id="clip1_2_93">
                  <rect width="13.5303" height="13.5303" fill="white" transform="translate(19.9394 6.92932) rotate(-30.8061)" />
                </clipPath>
                <clipPath id="clip2_2_93">
                  <rect width="8.54545" height="8.54545" fill="white" transform="translate(17.0909 23.5)" />
                </clipPath>
              </defs>
            </svg>
            <span className=' text-2xl text-primary font-semibold'>
              NearDate
            </span>
          </a>
        </Link>
        <nav className="md:mx-auto md:py-1 md:pl-4 flex gap-2 md:gap-10 items-center text-base justify-center w-full">
          <Link href="/">
            <a className={`flex py-2 space-x-2 items-center hover:bg-background
              ${(asPath == "/" || asPath.indexOf("/?") == 0) ? "bg-background text-primary" : "text-secondary"}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className='text-md hidden md:block'>
                Home
              </span>
            </a>
          </Link>
          {
            account?.accountId && <Link href="/mint">
              <a className={`flex py-2 space-x-2 items-center hover:bg-background
              ${asPath == "/mint" || asPath.indexOf("/mint?") == 0 ? "bg-background text-primary" : "text-secondary"}
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className='text-md hidden md:block'>
                  Canlendar
                </span>
              </a>
            </Link>
          }
          <Link href="/marketplace">
            <a className={`flex py-2 space-x-2 items-center hover:bg-background
              ${asPath == "/marketplace" || asPath.indexOf("/marketplace?") == 0 ? "bg-background text-primary" : "text-secondary"}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className='text-md hidden md:block'>
                Marketplace
              </span>
            </a>
          </Link>
          {
            account?.accountId && <Link href="/my-neardate">
              <a className={`flex py-2 space-x-2 items-center hover:bg-background
              ${asPath == "/my-neardate" || asPath.indexOf("/my-neardate?") == 0 ? "bg-background text-primary" : "text-secondary"}
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span className='text-md hidden md:block'>
                  My NearDate
                </span>
              </a>
            </Link>
          }
        </nav>
        {
          account?.accountId ?
            (<div className="flex items-center w-full justify-center max-w-fit">
              <div className="text-right top-16">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-primary rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {truncate(account?.accountId, 20)}
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute z-10 right-0 w-56 mt-4 origin-top-right bg-backgroundLight divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a href={`https://explorer.testnet.near.org/accounts/${account?.accountId}`} target="_blank" rel="noreferrer" >
                            <button
                              className={`${active ? ' bg-secondary bg-opacity-50' : 'bg-transparent'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
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
                            className={`${active ? ' bg-secondary bg-opacity-50' : 'bg-transparent'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
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
            (
              <div className="flex items-center w-full justify-center">
                <button className="bg-secondary px-6 py-2 rounded-md font-bold" onClick={login}>Connect wallet</button>
              </div>
            )
        }
      </div>
    </header>
  )
}
