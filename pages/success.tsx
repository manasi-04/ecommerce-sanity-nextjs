import { useStateContext } from '@/Context/StateContext';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';

const Success = () => {
    const { setcartItems, settotalPrice, setcartQty } = useStateContext();
    useEffect(() => {
        setcartItems([]);
        setcartQty(0);
        settotalPrice(0);
    }, []);
    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>
                    Thank you for your order!
                </h2>
                <p className='email-msg'>
                    Check your email inbox for receipt.
                </p>
                <p className='description'>
                    If you have any questions please email
                    <a className='email' href='mailto:order@example.com'>
                        order@example.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' className='btn'>
                        Continue Shopping
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default Success;