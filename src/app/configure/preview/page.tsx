/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import React from "react";

const page = ({ searchParams }:any) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }
  return <div>{id}</div>;
};

export default page;
