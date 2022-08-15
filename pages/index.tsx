import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";
import NearDate from "components/home/NearDate";
import RandomNFT from "components/home/RandomNFT";
import Contents from "components/home/Contents";
import OurTeam from "components/home/OurTeam";

const Home: NextPage = () => {
  const { account } = useAppContext()

  return (
    <BaseLayout>
      <Head>
        <title>NearDate-PastAndFuture</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NearDate />
      <RandomNFT />
      <Contents />
      {/* <OurTeam /> */}
    </BaseLayout>
  )
}

export default Home
