import { prisma } from "@/lib/prisma";
import { CategoriesAdmin } from "./CategoriesAdmin";

export default async function CategoriesPage() {
  const categories = await prisma.achievementCategory.findMany({ orderBy: { name: "asc" } });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        🏷️ Categorias de Conquistas
      </div>
      <CategoriesAdmin categories={categories} />
    </div>
  );
}
