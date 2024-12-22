/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { isValidUrl } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({ config }: { config: string }) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: config,
    },
  });
  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("You need to be logged in to create a checkout session");
  }
  const { finish, material } = configuration;
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;
  let order: Order | undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });
  if (existingOrder) {
    order = existingOrder;
  } else {
    console.log({ price, userId: user.id, configId: configuration.id });
    order = await db.order.create({
      data: {
        amount: price,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: configuration.name,
    images: configuration.croppedImageUrl
      ? [configuration.croppedImageUrl]
      : [configuration.imageUrl],
    default_price_data: {
      currency: "BDT",
      unit_amount: price * 100, // Stripe requires amounts in cents
    },
    description: "Hello This is me Shariful Islam"
  });

  const priceData = await stripe.prices.retrieve(
    product.default_price as string
  );

  const success_url = `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`;
  const cancel_url = `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`;
  const stripeSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: priceData.id, quantity: 1 }], // Use price ID here
    mode: "payment",
  });

  return { url: stripeSession.url };
};
