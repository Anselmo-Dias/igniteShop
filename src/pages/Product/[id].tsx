import { ProductsContext } from "@/src/Context/ProductContext";
import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Stripe } from "stripe";

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

interface ProductItemProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

export default function Product({ product }: ProductsDataProps) {
  const [isRedirectingofCheckout, setIsRedirectingOfCheckout] = useState(false);

  const {
    shoppingCart,
    productStripe,
    buyTheProductDirectly,
    handleAddProductInShoppingCart,
  } = useContext(ProductsContext);

  const { query } = useRouter();

  const productId = String(query.id);

  async function handleByProduct() {
    let productThisShoppingCart;

    if (productStripe.length !== 0) {
      productThisShoppingCart = productStripe.find((item: ProductItemProps) => {
        return item.id === productId;
      });
    }

    if (buyTheProductDirectly) {
      try {
        setIsRedirectingOfCheckout(true);
        const response = await axios.post("/api/checkout", {
          priceId: product.defaultPriceId,
        });

        const { checkoutUrl } = response.data;

        window.location.href = checkoutUrl;
      } catch (err) {
        setIsRedirectingOfCheckout(false);
        alert("fala ao redirecionar ao checkout");
      }
      return;
    }

    if (productThisShoppingCart) {
      handleAddProductInShoppingCart(productThisShoppingCart);
    }
  }
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loaading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button disabled={isRedirectingofCheckout} onClick={handleByProduct}>
            {buyTheProductDirectly
              ? `${isRedirectingofCheckout ? "Carregando..." : "Comprar"}`
              : "Adicionar ao carrinho"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NUQE4jLRgamXAF" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-Br", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1hour
  };
};
