import { imageUrl } from '@/lib/client';
import Link from 'next/link';
import React from 'react';

export interface ProductProps {
  _id: string;
  name: string;
  price: number;
  slug: {current: string};
  image: string[];
  details: string;
}

const Product = (product: ProductProps) => {
  const { name, price, slug, image } = product;
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <img alt={name} src={imageUrl(image && image[0])} height={250} width={250} className='product-image'/>
                <div className='product-name'>{name}</div>
                <div className='product-price'>{price}</div>
            </div>
        </Link>
    </div>
  )
}

export default Product;