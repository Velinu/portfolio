"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createExperience(data: {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}) {
  await prisma.experience.create({
    data: {
      company: data.company,
      role: data.role,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: data.current ? null : data.endDate ? new Date(data.endDate) : null,
      current: data.current,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function updateExperience(
  id: string,
  data: {
    company: string;
    role: string;
    description: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }
) {
  await prisma.experience.update({
    where: { id },
    data: {
      company: data.company,
      role: data.role,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: data.current ? null : data.endDate ? new Date(data.endDate) : null,
      current: data.current,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}
