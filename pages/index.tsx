import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import BaseLayout from 'components/BaseLayout';
import { useAppContext } from "context/state";

const Home: NextPage = () => {
  const { account } = useAppContext()

  return (
    <BaseLayout>
      <div>Home page</div>
    </BaseLayout>
  )
}

export default Home
