import { FooterBanner, HeroBanner, Product } from '@/components';
import { BannerProps } from '@/components/HeroBanner';
import { ProductProps } from '@/components/Product';
import { client } from '@/lib/client';
import React from 'react'

interface Props {
  bannerData: BannerProps[];
  products: ProductProps[]
}

const Home = (props: Props) => {
  const {products, bannerData} = props;
  return (
    <>
      <HeroBanner {...bannerData[0]}/>
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products.map((product) => <Product key={product._id} {...product} />)}
      </div>
      <FooterBanner {...bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async() => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {
      products,
      bannerData
    }
  };
}

export default Home;