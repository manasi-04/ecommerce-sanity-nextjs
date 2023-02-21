import Head from 'next/head';
import React, { ReactElement } from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = (props: {children: ReactElement[]}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Music Store</title>
      </Head>
      <Navbar />
      <main className='main-container'>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout;