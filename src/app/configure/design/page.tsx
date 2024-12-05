/* eslint-disable @typescript-eslint/no-explicit-any */
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
  try {
    const { id } = await searchParams;
    if (!id || typeof id !== "string") {
      throw new Error("Not Found");
    }

    const configuration = await db.configuration.findUnique({
      where: {
        id,
      },
    });

    if (!configuration) {
      throw new Error("Not Found");
    }
    const { imageUrl, height, width } = configuration;

    return (
      <DesignConfigator
        configId={configuration.id}
        imgUrl={imageUrl}
        imageDimensions={{ height, width }}
      />
    );
  } catch (error: any) {
    console.error(error.message);
    notFound();
  }
};

export default Page;
