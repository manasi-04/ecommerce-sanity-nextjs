import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js/types/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = async () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
    }

    return stripePromise;
}

export default getStripe;