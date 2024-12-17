import { notFound } from "next/navigation";
import React from "react";

interface pageProps {
  searchParams: {
    [key: string]: string | string[];
  };
}
const page =  ({ searchParams }: pageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }
  return <div>{id}</div>;
};

export default page;
