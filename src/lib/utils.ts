import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  });

  return formatter.format(price);
}

export function modifyFilename(filename:string) {
  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  // Extract the file name and extension
  const [name, extension] = filename.split(".");

  // Return the new filename
  return `${name}-${currentDate}.${extension}`;
}
