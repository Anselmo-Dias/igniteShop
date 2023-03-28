import Stripe from "stripe";

const ProcessText = () => {
  const Process = process.env.STRIPE_SECRET_KEY as string;

  return Process
}

export const stripe = new Stripe(ProcessText() , {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'ignite-shop'
  },
})