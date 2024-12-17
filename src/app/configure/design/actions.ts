"use server";

import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export interface saveConfigType {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
}
export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: saveConfigType) {
  try {
    await db.configuration.update({
      where: { id: configId },
      data: { color, finish, material, model },
    });
  } catch (error) {
    console.log(error);
  }
}
