import Image from "next/image";
import { HeaderContent } from "../styles/pages/header";
import logoImg from "../assets/logo.svg";
import { useContext, } from "react";
import { ProductsContext } from "../Context/ProductContext";
import shoppingCartImg from "../assets/shopping-cart.svg";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  toggleModal: Dispatch<SetStateAction<boolean>>
}

export default function Header({toggleModal}: HeaderProps ) {

  const { shoppingCart } = useContext(ProductsContext)

  return (
    <HeaderContent>
          <Image width={100} height={75} src={logoImg} alt="" />
          <button onClick={() => toggleModal(true)}>
            <Image width={25} height={25} src={shoppingCartImg} alt="" />
            <span>{shoppingCart.length}</span>
          </button>
    </HeaderContent>
  )
}