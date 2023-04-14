import { ReactNode, createContext, useState } from "react";

interface ProductItemProps {
    id: string
    name: string
    imageUrl: string
    price: string 
}

type ProductsProps = (ProductItemProps)[]

interface ProductsContentProps {
  productStripe?: ProductsProps
  buyTheProductDirectly: boolean
  handleTestProducts: (productsData: ProductsProps) => void
  handleAddProductInShoppingCart: (product?: ProductItemProps) => void
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContentProps)

export function ProductsProvider({ children }: ProductsProviderProps) {

  const [shoppingCart, setShoppingCart] = useState<ProductItemProps[]>()
  const [productStripe, setProductStripe] = useState({} as ProductsProps)
  const [buyTheProductDirectly, setBuyTheProductDirectly] = useState(true)

  function handleTestProducts(productsData: ProductsProps) {
    setBuyTheProductDirectly(false)
    setProductStripe(productsData)
  }

  function handleAddProductInShoppingCart(product?: ProductItemProps) {
    setShoppingCart((state?: ProductItemProps[]) => [...state, product])
  }
  
  return (
    <ProductsContext.Provider value={{productStripe, buyTheProductDirectly, handleTestProducts, handleAddProductInShoppingCart}}>
      {children}
    </ProductsContext.Provider>
  )
}