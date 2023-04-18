import Image from "next/image";
import { Items } from "../styles/pages/shoppingCart";

interface ItemProps {
  id: string
  imageUrl: string
  name: string
  price: string
  handleRemoveItem: (id: string) => void
}

export function Item({id,imageUrl,name,price,handleRemoveItem} : ItemProps) {

  function removeItem() {
    handleRemoveItem(id)
  }

  return (
    <Items>
      <Image width={100} height={93} src={imageUrl} alt="" />
      <div>
        <strong>{name}</strong>
        <span>{price}</span>
        <button onClick={removeItem}>Remover</button>
      </div>
    </Items>
  );
}
