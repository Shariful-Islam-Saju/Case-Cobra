import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    redirect("/login"); // Redirect to login if no user is found
  }

  const isAdmin = process.env.ADMIN_EMAIL === user?.email;

  if (!isAdmin) {
    redirect("/"); // Redirect to home page if not admin
  }

  return (
    <MaxWidthWrapper>
      <h1 className="text-center mt-5 font-bold text-5xl">DashBoard</h1>
    </MaxWidthWrapper>
  );
};

export default page;
