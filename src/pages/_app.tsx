import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";
import { ProductsProvider } from "../Context/ProductContext";
import {  useState } from "react";
import { ShoppingCart } from "./ShoppingCart";
import Header from "../components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  const [modalShoppingCart, setModalShoppingCart] = useState(false)

  return (  
    <ProductsProvider>
      <Container>
        <Header toggleModal={setModalShoppingCart} />

        {modalShoppingCart ? <ShoppingCart toggleModal={setModalShoppingCart} /> : null}

        <Component {...pageProps} />
      </Container>
    </ProductsProvider>
  );
}
