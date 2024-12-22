import { db } from "@/db";

interface propsType {
  id: string;
  email: string;
}
export async function createAccount({ id, email }: propsType) {
  const user = db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    db.user.create({
      data: {
        email,
        id,
      },
    });
  }
}
