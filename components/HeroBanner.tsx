import { imageUrl } from '@/lib/client';
import Link from 'next/link';
import React from 'react'

export interface BannerProps {
    image: string;
    midText: string;
    largeText1: string;
    smallText: string;
    product: string;
    buttonText: string;
    desc: string;
    largeText2: string;
    discount: string;
    saleTime: string;
}
const HeroBanner = (banner: BannerProps) => {
    const {
        image,
        midText,
        largeText1,
        smallText,
        product,
        buttonText,
        desc,
    } = banner;
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>{smallText}</p>
            <h2>{midText}</h2>
            <h1>{largeText1}</h1>
        </div>
        <img src={imageUrl(image)} alt='headphones' className='hero-banner-image'/>
        <div>
            <Link href={`/product/${product}`}>
                <button type='button'>{buttonText}</button>
            </Link>
        </div>
        <div className='desc'>
            <h5>Description</h5>
            <p>{desc}</p>
        </div>

    </div>
  )
}

export default HeroBanner;