import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import shoppingCartImg from '../assets/shopping-cart-white.svg'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import Link from "next/link";
import { ProductsContext } from "../Context/ProductContext";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string
    price: string
  }[]
}

export default function Home({products}: HomeProps) {

  const {handleTestProducts} = useContext(ProductsContext)

  function handleAddItemInShoppingCart() {
    alert('Alterei o estato para efetuar a compra ')
    handleTestProducts(products)
  }
  
  console.log(products)

  const [sliderRefs] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  })

  return (
    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>
      <HomeContainer ref={sliderRefs} className={'keen-slider'}>
      {products.map((product: any) => {
        return (
          <Link href={`/Product/${product.id}`} key={product.id}>
              <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={580} height={420} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

               <button onClick={handleAddItemInShoppingCart}>
                 <Image  width={50} height={50} src={shoppingCartImg} alt=""/>
               </button>
              </footer>
            </Product>
          </Link>

        )
      })}
    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
  const price = product.default_price as Stripe.Price


    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      }).format( (price.unit_amount as number) / 100),
    }
  })

  console.log(response.data)

  console.log('rodouuu')
  
  return {
      props: {
       products
      },
      revalidate: 10,
  } 
}
