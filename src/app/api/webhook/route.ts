/* eslint-disable @typescript-eslint/ban-ts-comment */
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {Resend} from 'resend'
import OrderReceivedEmail from "@/components/emails/OrderRecievedEmail";
const resend =new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const email = session.customer_details?.email;
      if (!email) throw new Error("Missing user email");

      const { userId, orderId } = session.metadata || {};
      if (!userId || !orderId) throw new Error("Invalid request metadata");

      const billingAddress = session.customer_details?.address;
      const shippingAddress = session.shipping_details?.address;

      if (!billingAddress || !shippingAddress) {
        throw new Error("Missing address details");
      }

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          ShippingAddress: {
            create: {
              name: session.customer_details?.name || "Unknown",
              city: shippingAddress.city || "Unknown",
              country: shippingAddress.country || "Unknown",
              postalCode: shippingAddress.postal_code || "Unknown",
              street: shippingAddress.line1 || "Unknown",
              state: shippingAddress.state || "Unknown",
            },
          },
          BillingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!,
            },
          },
        },
      });

       await resend.emails.send({
         from: "CaseCobra <sajukhan12905@gmail.com>",
         to: session.customer_details?.email
           ? [session.customer_details.email]
           : [],
         subject: "Thanks for your purchase",
         react: OrderReceivedEmail({
           orderId,
           orderDate: updatedOrder.createdAt.toLocaleDateString(),
           //@ts-expect-error
           shippingAddress: {
             name: session.customer_details!.name!,
             city: shippingAddress!.city!,
             country: shippingAddress!.country!,
             postalCode: shippingAddress!.postal_code!,
             street: shippingAddress!.line1!,
             state: shippingAddress!.state!,
           },
         }),
       });

    }

   
    return NextResponse.json({ result: event, ok: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Webhook Error:", error.message);

    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
