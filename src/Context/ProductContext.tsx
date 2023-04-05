import { ReactNode, createContext, useState } from "react";

interface ProductsContentProps {
  buyTheProductDirectly: boolean
  handleTestProducts: (data: any) => void
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContentProps)



export function ProductsProvider({ children }: ProductsProviderProps) {

  const [shoppingCart, setShoppingCart] = useState([])
  const [buyTheProductDirectly, setBuyTheProductDirectly] = useState(true)

  function handleTestProducts(data: any) {
    setBuyTheProductDirectly(false)
  }
  
  return (
    <ProductsContext.Provider value={{buyTheProductDirectly, handleTestProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}