"use client";

import { useState } from "react";
import { Achievement } from "@/lib/types";

export function AchievementsWindow({ achievements }: { achievements: Achievement[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("todas");

  const categories = [
    { slug: "todas", name: "Todas" },
    ...Array.from(
      new Map(achievements.map((a) => [a.category.slug, a.category])).values()
    ),
  ];

  const filtered =
    activeCategory === "todas"
      ? achievements
      : achievements.filter((a) => a.category.slug === activeCategory);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "4px 4px 0",
          borderBottom: "1px solid var(--w2k-mid-dark)",
          background: "var(--w2k-surface)",
          flexShrink: 0,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            style={{
              padding: "3px 10px",
              fontSize: 11,
              background: activeCategory === cat.slug ? "#fff" : "var(--w2k-surface-dark)",
              border: "1px solid var(--w2k-mid-dark)",
              borderBottom: activeCategory === cat.slug ? "1px solid #fff" : "1px solid var(--w2k-mid-dark)",
              marginBottom: activeCategory === cat.slug ? -1 : 0,
              cursor: "default",
              zIndex: activeCategory === cat.slug ? 1 : 0,
              position: "relative",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* List */}
      <div
        className="w2k-sunken"
        style={{ flex: 1, background: "#fff", overflow: "auto", padding: 4 }}
      >
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 24, color: "#666" }}>
            Nenhuma conquista nesta categoria.
          </div>
        ) : (
          filtered.map((achievement) => (
            <AchievementRow key={achievement.id} achievement={achievement} />
          ))
        )}
      </div>

      {/* Status bar */}
      <div
        className="w2k-sunken"
        style={{ padding: "1px 6px", fontSize: 10, color: "#444", flexShrink: 0 }}
      >
        {filtered.length} conquista(s) · {activeCategory === "todas" ? "Todas as categorias" : categories.find(c => c.slug === activeCategory)?.name}
      </div>
    </div>
  );
}

function AchievementRow({ achievement }: { achievement: Achievement }) {
  const icons: Record<string, string> = {
    certificacao: "📜",
    premio: "🏆",
    conquista: "⭐",
  };
  const icon = icons[achievement.category.slug] ?? "🎯";

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "6px 8px",
        borderBottom: "1px solid #eee",
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold", fontSize: 11 }}>{achievement.title}</div>
        <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{achievement.description}</div>
        <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>
          {new Date(achievement.date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          {" · "}
          <span
            style={{
              background: "var(--w2k-select)",
              color: "#fff",
              padding: "0 4px",
              fontSize: 9,
            }}
          >
            {achievement.category.name}
          </span>
        </div>
      </div>
    </div>
  );
}
