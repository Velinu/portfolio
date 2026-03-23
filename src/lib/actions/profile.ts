"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function upsertProfile(data: {
  name: string;
  bio: string;
  avatarUrl?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}) {
  await prisma.profile.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}
