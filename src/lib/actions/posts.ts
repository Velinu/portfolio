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

export async function createPost(data: {
  title: string;
  content: string;
  published: boolean;
}) {
  const slug = toSlug(data.title);
  await prisma.post.create({
    data: { title: data.title, slug, content: data.content, published: data.published },
  });
  revalidatePath("/");
  revalidatePath("/admin/posts");
}

export async function updatePost(
  id: string,
  data: { title: string; content: string; published: boolean }
) {
  await prisma.post.update({
    where: { id },
    data: { title: data.title, content: data.content, published: data.published },
  });
  revalidatePath("/");
  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/posts");
}
