import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface ProductItemProps {
  id: string
  name: string
  imageUrl: string
  price: string
}

export type ProductsDataProps = ProductItemProps[]

interface ProductsContentProps {
  shoppingCart: ProductItemProps[]
  productStripe: ProductsDataProps
  buyTheProductDirectly: boolean
  handleTestProducts: (productsData: ProductsDataProps) => void
  handleAddProductInShoppingCart: (product: ProductItemProps) => void
  handleRemoveProductFromShoppingCart: (newProductListOfShoppingCart: ProductsDataProps) => void
}

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsContext = createContext({} as ProductsContentProps);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ProductItemProps[]>([]);
  const [productStripe, setProductStripe] = useState<ProductsDataProps>([]);
  const [buyTheProductDirectly, setBuyTheProductDirectly] = useState(true);

  function handleTestProducts(productsData: ProductsDataProps) {
    setBuyTheProductDirectly(false);
    setProductStripe(productsData);
  }

  function handleAddProductInShoppingCart(product: ProductItemProps) {
    const existsProductInShoppingCart = shoppingCart.find((item) => {
      return item === product;
    });
    if (!existsProductInShoppingCart) {
      setShoppingCart((state: ProductItemProps[]) => [...state, product]);
    }
    console.log(shoppingCart);
  }

  function handleRemoveProductFromShoppingCart(newProductListOfShoppingCart: ProductsDataProps) {
    setShoppingCart(newProductListOfShoppingCart)
  }

  return (
    <ProductsContext.Provider
      value={{
        productStripe,
        shoppingCart,
        buyTheProductDirectly,
        handleTestProducts,
        handleAddProductInShoppingCart,
        handleRemoveProductFromShoppingCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
