import { prisma } from "@/lib/prisma";
import { AchievementsAdmin } from "./AchievementsAdmin";

export default async function AchievementsPage() {
  const [achievements, categories] = await Promise.all([
    prisma.achievement.findMany({ include: { category: true }, orderBy: { date: "desc" } }),
    prisma.achievementCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        🏆 Conquistas
      </div>
      <AchievementsAdmin achievements={achievements} categories={categories} />
    </div>
  );
}
