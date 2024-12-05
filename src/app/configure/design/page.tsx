"use server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

interface propsType {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: propsType) => {
  const { id } = searchParams;
  return (
    <MaxWidthWrapper className="mt-10">
      <h1>{id}</h1>
    </MaxWidthWrapper>
  );
};

export default Page;
