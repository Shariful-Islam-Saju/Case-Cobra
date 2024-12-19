/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import sharp from "sharp";
import { z } from "zod";
import { db } from "@/db";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "512MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetaData = await sharp(buffer).metadata();
      const { width, height } = imgMetaData;
      if (!configId) {
        const configuration = db.configuration.create({
          data: {
            imageUrl: file.url,
            name: file.name,
            height: height || 500,
            width: width || 500,
          },
        });
        return { configId: (await configuration).id };
      } else {
        const updatedConfiguration = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });
        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
