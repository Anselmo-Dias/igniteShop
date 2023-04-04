import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from '../assets/logo.svg'
import shoppingCartImg from '../assets/shopping-cart.svg'
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image width={100} height={75} src={logoImg} alt="" />
        <div>
          <Image width={35} height={35} src={shoppingCartImg} alt=""/>
        </div>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
