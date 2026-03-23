import { prisma } from "@/lib/prisma";
import { ExperienceAdmin } from "./ExperienceAdmin";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        📄 Experiência Profissional
      </div>
      <ExperienceAdmin experiences={experiences} />
    </div>
  );
}
