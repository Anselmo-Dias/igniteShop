import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
 const { priceId } = req.body;

 if(req.method !== 'POST') {
  return res.status(405).json({ error: 'Method not allowed' })
 }

 if(!priceId) {
  return res.status(400).json({ error: 'Price not found' })
 }
 
 const sucessUrl = `${process.env.NEXT_URL}/success`
 const cancelUrl = `${process.env.NEXT_URL}`
 
  const checkoutSessiion = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
 }) 

 return res.status(201).json({
    checkoutUrl: checkoutSessiion.url,
 })
}