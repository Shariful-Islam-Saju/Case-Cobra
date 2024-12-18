/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignPreview from "./DesignPreview";

const page = async ({ searchParams }: any) => {
  const { id } = await searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    notFound();
  }
  return <DesignPreview configuration={configuration}></DesignPreview>;
};

export default page;
