"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email) {
      throw new Error("You need to be logged in to view this page.");
    }
    const order = await db.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
      include: {
        BillingAddress: true,
        ShippingAddress: true,
        user: true,
        configuration: true,
      },
    });
    if (!order) {
      throw new Error("This order does not exit.");
    }

    if (order.isPaid) {
      return order;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
