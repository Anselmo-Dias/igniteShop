import Image from "next/image";
import {
  BoxPayments,
  ByProductsButton,
  CloseButton,
  ItemsContainer,
  PaymentsContainer,
  ShoppingCartContainer,
} from "../styles/pages/shoppingCart";
import closeImg from '../assets/close.svg'
import { Dispatch, SetStateAction } from "react";
import { Item } from "../components/Item";
import { ProductsContext } from "@/src/Context/ProductContext";
import { stripe } from "@/src/lib/stripe";
import axios from "axios";
import { GetStaticProps } from "next";
import { useContext, useState } from "react";
import { Stripe } from "stripe" 

interface ShoppingCartProps {
  toggleModal: Dispatch<SetStateAction<boolean>>
}

interface ProductsDataProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}
export function ShoppingCart({toggleModal}: ShoppingCartProps, { product }: ProductsDataProps ) {
  const [isRedirectingofCheckout, setIsRedirectingOfCheckout] = useState(false);
  const {shoppingCart, handleRemoveProductFromShoppingCart} = useContext(ProductsContext)

   const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const valueTotalOfProducts = shoppingCart.reduce((acc, value) => {
    const redefiningValue = (value.price.substring(3, 8).trim().replace(',','.'))
    return acc + Number(redefiningValue)
  }, 0)

  function handleSelectProductOfRemove(id: string) {
    const newShoppingCartProductList = shoppingCart.filter((item) => {
      return item.id != id
    })
    handleRemoveProductFromShoppingCart(newShoppingCartProductList)
  }

  async function handleByProduct() {
    try {
      setIsRedirectingOfCheckout(true);
      const response = await axios.post("/api/checkout2", {
        shoppingCart: shoppingCart,
      });

      console.log(response)

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsRedirectingOfCheckout(false);
      alert("fala ao redirecionar ao checkout");
    }
  }

 
  return (
    <ShoppingCartContainer>
      <CloseButton onClick={() => toggleModal(false)} type="button">
            <Image width={30} height={30} src={closeImg} alt="" />
      </CloseButton>
      <div>
        <h1>Sacola de compras</h1>

        <ItemsContainer>
          {shoppingCart.map((item) => {
            return (
              <Item key={item.id} id={item.id} imageUrl={item.imageUrl} name={item.name} price={item.price} handleRemoveItem={handleSelectProductOfRemove}/>
            )
          })}
        </ItemsContainer>

        
      </div>
      <PaymentsContainer>
          <BoxPayments>
            <p>
              <span>Quantidade</span>
              <span>{shoppingCart.length} {(shoppingCart.length >= 2 || shoppingCart.length == 0) ? 'Itens' : 'item'}</span>
            </p>
            <p>
              <strong>Valor Total</strong>
              <strong>{priceFormatted.format(valueTotalOfProducts)}</strong>
            </p>
          </BoxPayments>
          <ByProductsButton onClick={handleByProduct} type="button">
            Finalizar compra
          </ByProductsButton>
      </PaymentsContainer>
    </ShoppingCartContainer>
  );
}