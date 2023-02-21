import { imageUrl } from '@/lib/client';
import Link from 'next/link';
import React from 'react'
import { BannerProps } from './HeroBanner';

const FooterBanner = (footerBanner: BannerProps) => {
    const {
        largeText1, largeText2, discount, saleTime,
        smallText, midText, desc, product, buttonText, image
    } = footerBanner;
  return (
    <div className='footer-banner-container'>
        <div className='banner-desc'>
            <div className='left'>
                <p>{discount}</p>
                <h3>{largeText1}</h3>
                <h3>{largeText2}</h3>
                <p>{saleTime}</p>
            </div>
            <div className='right'>
                <p>{smallText}</p>
                <h3>{midText}</h3>
                <p>{desc}</p>
                <Link href={`/product/${product}`}>
                    <button type='button'>{buttonText}</button>
                </Link>
            </div>
            <img src={imageUrl(image)} alt='banner image' className='footer-banner-image' />
        </div>
    </div>
  )
}

export default FooterBanner;