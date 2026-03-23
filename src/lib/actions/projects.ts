"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProject(data: {
  title: string;
  description: string;
  techs: string;
  url?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}) {
  const slug = toSlug(data.title);
  await prisma.project.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      techs: data.techs.split(",").map((t) => t.trim()).filter(Boolean),
      url: data.url || null,
      repoUrl: data.repoUrl || null,
      imageUrl: data.imageUrl || null,
      featured: data.featured,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    description: string;
    techs: string;
    url?: string;
    repoUrl?: string;
    imageUrl?: string;
    featured: boolean;
  }
) {
  await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      techs: data.techs.split(",").map((t) => t.trim()).filter(Boolean),
      url: data.url || null,
      repoUrl: data.repoUrl || null,
      imageUrl: data.imageUrl || null,
      featured: data.featured,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
