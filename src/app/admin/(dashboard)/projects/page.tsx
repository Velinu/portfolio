import { prisma } from "@/lib/prisma";
import { ProjectsAdmin } from "./ProjectsAdmin";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        📁 Projetos
      </div>
      <ProjectsAdmin projects={projects} />
    </div>
  );
}
