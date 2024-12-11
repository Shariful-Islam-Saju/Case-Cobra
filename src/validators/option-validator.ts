// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950

import { PRODUCT_PRICES } from "@/config/product";

// bg-rose-950 border-rose-950
export const COLORS = [
  {
    labal: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    labal: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    labal: "Rose",
    value: "rose",
    tw: "rose-950",
  },
  {
    labal: "Yellow",
    value: "yellow",
    tw: "yellow-500",
  },
] as const;

export const MODEL = {
  name: "model",
  options: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-Resistant Coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft Grippy Texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
