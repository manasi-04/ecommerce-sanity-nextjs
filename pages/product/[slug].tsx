import Product, { ProductProps } from '@/components/Product';
import { StateContext, useStateContext } from '@/Context/StateContext';
import { client, imageUrl } from '@/lib/client';
import React, {useContext, useState} from 'react';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = (props: {product: ProductProps, products: ProductProps[]}) => {
  const {product, products} = props;
  const {qty, incQty, decQty, onAdd, setshowCart} = useStateContext();
  const [index, setIndex] = useState(0);
  const buyHandler = (product: ProductProps) => {
    console.log('product', product)
    onAdd(product, qty);
    setshowCart(true);
  }
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={imageUrl(product?.image && product?.image[index])} alt={product?.name} 
            className='product-detail-image'/>
          </div>
          <div className='small-images-container'>
            {product?.image.map((im, i) => 
              <img key={i} src={imageUrl(im)}
                onMouseEnter={() => setIndex(i)}
                className={`small-image${i === index ? ' selected-image': ''} `}/>)}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h3>{product.name}</h3>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>

          <h4>Details:</h4>
          <p>{product.details}</p>
          <p>${product.price}</p>
          <div className='quantity'>
            <h4>Quantity:</h4>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
              Add To Cart
            </button>
            <button type='button' className='buy-now' onClick={()=> buyHandler(product)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map(product => <Product key={product._id} {...product} />)}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export const getStaticPaths = async() => {
  const query = `*[_type=="product"]{
    slug {
      current
    }
  }`;
  const slugData = await client.fetch(query);
  const paths = slugData.map((val: {slug: {current: string}}) => ({
    params: {
      slug: val.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps = async(response: {params: {slug: string}}) => {
  const {params: {slug}} = response;
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == 'product']`;
  const products = await client.fetch(productsQuery);

  return {
    props: {
      product,
      products
    }
  }
}

export default ProductDetails;