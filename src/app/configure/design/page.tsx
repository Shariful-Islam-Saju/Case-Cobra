"use server";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigator from "./DesignConfigator";

interface propsType {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: propsType) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) {
    notFound();
  }
  const { imageUrl, height, width } = configuration;

  return (
    <DesignConfigator
      configId={configuration.id}
      imgUrl={imageUrl}
      imageDimensions={{ height, width }}
    />
  );
};

export default Page;
