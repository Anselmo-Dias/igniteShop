import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

import { ImageContainer, SucessContainer } from "../styles/pages/sucess";

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta  name="robots" content="noindex"/>
      </Head>
      <SucessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image width={120} height={110} src={product.imageUrl} alt="" />
        </ImageContainer>

        <p>
          Uuuhl <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name} </strong> ja está a caminho
        </p>

        <Link href={"/"}>Voltar ao catagolo</Link>
      </SucessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session?.customer_details?.name;
  const product = session?.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
