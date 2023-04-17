import Image from "next/image";
import {
  BoxPayments,
  ByProductsButton,
  CloseButton,
  Items,
  ItemsContainer,
  PaymentsContainer,
  ShoppingCartContainer,
} from "../styles/pages/shoppingCart";
import img from '../assets/Home.png'
import closeImg from '../assets/close.svg'
import { Dispatch, SetStateAction, useContext } from "react";
import { ProductsContext } from "../Context/ProductContext";

interface ShoppingCartProps {
  toggleModal: Dispatch<SetStateAction<boolean>>
}

export function ShoppingCart({toggleModal}: ShoppingCartProps) {
  const {shoppingCart} = useContext(ProductsContext)

  const valueTotalOfProducts = shoppingCart.reduce((acc, value) => {
    const redefiningValue = (value.price.substring(3, 8).trim().replace(',','.'))
    // console.log(Number(redefiningValue))
    return acc + Number(redefiningValue)
  }, 0)

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  function RemoveProductFromTheShoppingCart() {
    const newShoppingCartProductList = shoppingCart.filter((item) => {
      return item.name !== "Camisa Ignite Lab"
    })
    console.log(newShoppingCartProductList)
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
              <Items key={item.id}>
              <Image
                width={100}
                height={93}
                src={item.imageUrl}
                alt=""
              />
              <div>
                <strong>{item.name}</strong>
                <span>{item.price}</span>
                <button onClick={RemoveProductFromTheShoppingCart}>Remover</button>
              </div>
            </Items>
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
          <ByProductsButton type="button">
            Finalizar compra
          </ByProductsButton>
      </PaymentsContainer>
    </ShoppingCartContainer>
  );
}
