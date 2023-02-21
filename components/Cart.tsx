import { Items, useStateContext } from '@/Context/StateContext';
import { imageUrl } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { ProductProps } from './Product';

export interface State {
  cartQty: number;
  setshowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: Items[];
  totalPrice: number;
  updateCartItems: (id: string, type: string) => void;
  onRemove: (product: Items) => void;
  showCart: boolean;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductProps, quantity: number) => void;
  setcartItems: Dispatch<SetStateAction<Items[]>>;
  setcartQty: Dispatch<SetStateAction<number>>;
  settotalPrice: Dispatch<SetStateAction<number>>;
}

const Cart = () => {
  const {cartQty, setshowCart, cartItems, totalPrice, updateCartItems, onRemove} = useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItems})
    });

    if(response.status === 500) return;

    const data = await response.json();
    toast.success('Redirecting...');
    stripe?.redirectToCheckout({sessionId: data.id})
  }
  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button type='button' onClick={() => setshowCart(false)} className='cart-heading'>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({cartQty} Items)</span>
        </button>

        {cartItems.length === 0 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type='button' onClick={() => setshowCart(false)} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && (
            cartItems.map((item: Items, index: number) => 
              (<div key={index} className='product'>
                <img src={imageUrl(item?.image[0])} className='cart-product-image' alt='cart-image'/>
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => updateCartItems(item?._id, 'dec')}><AiOutlineMinus /></span>
                    <span className='num'>{item.quantity}</span>
                    <span className='plus' onClick={() => updateCartItems(item?._id, 'inc')}><AiOutlinePlus /></span>
                  </p>
                  <button className='remove-item' type='button' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                  </div>
                </div>
              </div>)
            )
          )}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button className='btn' type='button' onClick={handleCheckout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;