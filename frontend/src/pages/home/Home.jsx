import React from 'react'
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommened from './Recommened';

export const Home = () => {
  return (
    <>
    <Banner />
    <TopSellers/>
    <Recommened/>
    </>
  )
}

export default Home;