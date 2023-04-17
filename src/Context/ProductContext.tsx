import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface ProductItemProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

type ProductsDataProps = ProductItemProps[];

interface ProductsContentProps {
  shoppingCart: ProductItemProps[];
  productStripe: ProductsDataProps;
  buyTheProductDirectly: boolean;
  handleTestProducts: (productsData: ProductsDataProps) => void;
  handleAddProductInShoppingCartOrRemove: (product: ProductItemProps) => void;
}

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsContext = createContext({} as ProductsContentProps);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ProductItemProps[]>([]);
  const [productStripe, setProductStripe] = useState({} as ProductsDataProps);
  const [buyTheProductDirectly, setBuyTheProductDirectly] = useState(true);

  function handleTestProducts(productsData: ProductsDataProps) {
    setBuyTheProductDirectly(false);
    setProductStripe(productsData);
  }

  function handleAddProductInShoppingCartOrRemove(product: ProductItemProps) {
    const existsProductInShoppingCart = shoppingCart.find((item) => {
      return item === product;
    });
    if (!existsProductInShoppingCart) {
      setShoppingCart((state: ProductItemProps[]) => [...state, product]);
    }
    console.log(shoppingCart);
  }

  return (
    <ProductsContext.Provider
      value={{
        productStripe,
        shoppingCart,
        buyTheProductDirectly,
        handleTestProducts,
        handleAddProductInShoppingCartOrRemove,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
