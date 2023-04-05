import Image from "next/image";
import {
  Items,
  ItemsContainer,
  ShoppingCartContainer,
} from "../styles/pages/shoppingCart";
import img from '../assets/Home.png'

export function ShoppingCart() {
  return (
    <ShoppingCartContainer>
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
    </ShoppingCartContainer>
  );
}
