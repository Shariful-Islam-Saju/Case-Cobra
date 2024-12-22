import { db } from "@/db";

interface propsType {
  id: string;
  email: string;
}
export async function createAccount({ id, email }: propsType) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    await db.user.create({
      data: {
        email,
        id,
      },
    });
  }
}
