import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        mode: 'payment',
        billing_address_collection: 'auto',
        shipping_options: [
            {
                shipping_rate: 'shr_1MVGW3SH0AjP6mcZG2EpYwK8'
            },
            {
                shipping_rate: 'shr_1MVJZiSH0AjP6mcZU5M3If4p'
            }
        ],
        line_items: req.body.cartItems.map((item: any) => {
            const img = item?.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/88a3qcys/production/').replace('-webp', '.webp');
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [newImage]
                    },
                    unit_amount: item.price * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: item.quantity
            }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}