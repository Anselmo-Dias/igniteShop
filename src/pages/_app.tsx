import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import shoppingCartImg from "../assets/shopping-cart.svg";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { ProductsProvider } from "../Context/ProductContext";
import { useState } from "react";
import { ShoppingCart } from "./ShoppingCart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  const [modalShoppingCart, setModalShoppingCart] = useState(false)

  function handleToggleModalShoppingCart() {
    setModalShoppingCart(true)
  }

  return (
    <ProductsProvider>
      <Container>
        <Header>
          <Image width={100} height={75} src={logoImg} alt="" />
          <button onClick={handleToggleModalShoppingCart}>
            <Image width={25} height={25} src={shoppingCartImg} alt="" />
            <span>3</span>
          </button>
        </Header>

        {modalShoppingCart ? <ShoppingCart toggleModal={setModalShoppingCart} /> : null}

        <Component {...pageProps} />
      </Container>
    </ProductsProvider>
  );
}
