import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projectCount, postCount, achievementCount, experienceCount] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.achievement.count(),
    prisma.experience.count(),
  ]);

  const stats = [
    { label: "Projetos",    count: projectCount,     icon: "📁", href: "/admin/projects" },
    { label: "Posts",       count: postCount,         icon: "📝", href: "/admin/posts" },
    { label: "Conquistas",  count: achievementCount,  icon: "🏆", href: "/admin/achievements" },
    { label: "Experiências",count: experienceCount,   icon: "📄", href: "/admin/experience" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        🖥️ Dashboard — Resumo do Sistema
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="w2k-raised"
              style={{
                padding: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--w2k-surface)",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: 28 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1 }}>{stat.count}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{stat.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="w2k-separator" />

      {/* Quick actions */}
      <div style={{ fontWeight: "bold", fontSize: 11, marginBottom: 4 }}>Ações rápidas</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { href: "/admin/projects",    label: "➕ Novo projeto" },
          { href: "/admin/posts",       label: "✍️ Novo post" },
          { href: "/admin/achievements",label: "🏆 Nova conquista" },
          { href: "/admin/profile",     label: "👤 Editar perfil" },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <button className="w2k-btn">{action.label}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
