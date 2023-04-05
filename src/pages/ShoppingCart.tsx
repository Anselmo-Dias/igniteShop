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
import { Dispatch, SetStateAction } from "react";

interface ShoppingCartProps {
  toggleModal: Dispatch<SetStateAction<boolean>>
}


export function ShoppingCart({ toggleModal } : ShoppingCartProps) {

  function handleToggleModalShoppingCart() {
    toggleModal(false)
  }


  return (
    <ShoppingCartContainer>
      <CloseButton onClick={handleToggleModalShoppingCart} type="button">
            <Image width={30} height={30} src={closeImg} alt="" />
      </CloseButton>
      <div>
        <h1>Sacola de compras</h1>

        <ItemsContainer>
          <Items>
            <Image
              width={100}
              height={93}
              src={img}
              alt=""
            />
            <div>
              <strong>Camiseta Beyond the Limits</strong>
              <span>R$ 79,90</span>
              <button>Remover</button>
            </div>
          </Items>
          <Items>
            <Image
              width={100}
              height={93}
              src={img}
              alt=""
            />
            <div>
              <strong>Camiseta Beyond the Limits</strong>
              <span>R$ 79,90</span>
              <button>Remover</button>
            </div>
          </Items>
          <Items>
            <Image
              width={100}
              height={93}
              src={img}
              alt=""
            />
            <div>
              <strong>Camiseta Beyond the Limits</strong>
              <span>R$ 79,90</span>
              <button>Remover</button>
            </div>
          </Items>
        </ItemsContainer>

        
      </div>
      <PaymentsContainer>
          <BoxPayments>
            <p>
              <span>Quantidade</span>
              <span>3 itens</span>
            </p>
            <p>
              <strong>Valor Total</strong>
              <strong>R$ 270,00</strong>
            </p>
          </BoxPayments>
          <ByProductsButton type="button">
            Finalizar compra
          </ByProductsButton>
      </PaymentsContainer>
    </ShoppingCartContainer>
  );
}
