/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigator from "./DesignConfigator";

// interface PageProps {
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// }

const Page = async ({ searchParams }: any) => {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default Page;
