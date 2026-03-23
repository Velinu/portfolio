"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Categories ────────────────────────────────────────────────
export async function createCategory(name: string) {
  await prisma.achievementCategory.create({
    data: { name, slug: toSlug(name) },
  });
  revalidatePath("/admin/achievements/categories");
}

export async function updateCategory(id: string, name: string) {
  await prisma.achievementCategory.update({
    where: { id },
    data: { name, slug: toSlug(name) },
  });
  revalidatePath("/");
  revalidatePath("/admin/achievements/categories");
}

export async function deleteCategory(id: string) {
  await prisma.achievementCategory.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/achievements/categories");
}

// ── Achievements ──────────────────────────────────────────────
export async function createAchievement(data: {
  title: string;
  description: string;
  date: string;
  categoryId: string;
}) {
  await prisma.achievement.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      categoryId: data.categoryId,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function updateAchievement(
  id: string,
  data: { title: string; description: string; date: string; categoryId: string }
) {
  await prisma.achievement.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      categoryId: data.categoryId,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}
