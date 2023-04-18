import { ProductsContext } from "@/src/Context/ProductContext";
import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { useContext } from "react";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

 const { shoppingCart } = req.body;

 const lineItems = [];
 for (const item of shoppingCart) {
   const product = await stripe.products.create({
     name: item.nome,
     description: item.descricao
   });
   const price = await stripe.prices.create({
     product: product.id,
     unit_amount: item.preco,
     currency: 'brl'
   });
   lineItems.push({
     price: price.id,
     quantity: item.quantidade
   });
 }

 if(req.method !== 'POST') {
  return res.status(405).json({ error: 'Method not allowed' })
 }

 if(!shoppingCart) {
  return res.status(400).json({ error: 'Price not found' })
 }
 
 const sucessUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
 const cancelUrl = `${process.env.NEXT_URL}`
 
  const checkoutSessiion = await stripe.checkout.sessions.create({
    success_url: sucessUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: shoppingCart,
 }) 

 return res.status(201).json({
    checkoutUrl: checkoutSessiion.url,
 })
}