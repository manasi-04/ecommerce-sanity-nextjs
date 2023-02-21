import { useStateContext } from '@/Context/StateContext';
import Link from 'next/link';
import React from 'react';
import {AiOutlineShopping} from 'react-icons/ai';
import Cart from './Cart';

const Navbar = () => {
  const {cartQty, showCart, setshowCart} = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          Headphones
        </Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setshowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{cartQty}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar;