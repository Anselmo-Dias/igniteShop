import { ReactNode, createContext, useState } from "react";

interface ProductsStripe {
      id?: string
      name?: string
      imageUrl?: string
      price?: string 
}

type ProductsStripeProps = (ProductsStripe)[]

interface ProductsContentProps {
  productStripe?: ProductsStripeProps
  buyTheProductDirectly: boolean
  handleTestProducts: (productsData?: any) => void
}


interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContentProps)

export function ProductsProvider({ children }: ProductsProviderProps) {

  const [shoppingCart, setShoppingCart] = useState<ProductsStripe[]>()
  const [productStripe, setProductStripe] = useState({} as ProductsStripeProps)
  const [buyTheProductDirectly, setBuyTheProductDirectly] = useState(true)

  function handleTestProducts(productsData: ProductsStripeProps) {
    setBuyTheProductDirectly(false)
    setProductStripe(productsData)
    console.log(shoppingCart)
  }
  
  return (
    <ProductsContext.Provider value={{productStripe, buyTheProductDirectly, handleTestProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}