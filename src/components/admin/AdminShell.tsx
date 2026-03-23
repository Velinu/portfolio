"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin",                       label: "Dashboard",   icon: "🖥️" },
  { href: "/admin/profile",               label: "Perfil",      icon: "👤" },
  { href: "/admin/projects",              label: "Projetos",    icon: "📁" },
  { href: "/admin/experience",            label: "Experiência", icon: "📄" },
  { href: "/admin/achievements",          label: "Conquistas",  icon: "🏆" },
  { href: "/admin/achievements/categories", label: "Categorias", icon: "🏷️" },
  { href: "/admin/posts",                 label: "Posts",       icon: "📝" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--w2k-desktop)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {/* Main window */}
      <div
        className="w2k-raised"
        style={{
          width: "100%",
          maxWidth: 960,
          height: "100%",
          maxHeight: 680,
          display: "flex",
          flexDirection: "column",
          background: "var(--w2k-surface)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          className="w2k-titlebar-active"
          style={{
            padding: "3px 6px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14 }}>⚙️</span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11, flex: 1 }}>
            Gerenciamento do Portfólio
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              background: "var(--w2k-surface)",
              border: "1px solid var(--w2k-dark)",
              fontSize: 10,
              padding: "1px 6px",
              cursor: "default",
              color: "var(--w2k-text)",
            }}
          >
            Sair
          </button>
        </div>

        {/* Menu bar */}
        <div
          style={{
            borderBottom: "1px solid var(--w2k-mid-dark)",
            padding: "2px 4px",
            display: "flex",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {["Arquivo", "Exibir", "Ajuda"].map((item) => (
            <span
              key={item}
              className="w2k-menu-item"
              style={{ padding: "2px 8px", fontSize: 11, cursor: "default" }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Body: sidebar + content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Sidebar */}
          <div
            className="w2k-sunken"
            style={{
              width: 180,
              background: "#fff",
              overflow: "auto",
              flexShrink: 0,
              borderRight: "none",
            }}
          >
            <div
              style={{
                padding: "6px 8px",
                background: "var(--w2k-select)",
                color: "#fff",
                fontSize: 11,
                fontWeight: "bold",
              }}
            >
              Portfólio Admin
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 12px",
                    fontSize: 11,
                    textDecoration: "none",
                    background: isActive ? "var(--w2k-select)" : "transparent",
                    color: isActive ? "#fff" : "var(--w2k-text)",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Content area */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: 12,
              background: "var(--w2k-surface)",
            }}
          >
            {children}
          </div>
        </div>

        {/* Status bar */}
        <div
          className="w2k-sunken"
          style={{
            padding: "1px 6px",
            fontSize: 10,
            color: "#444",
            flexShrink: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Painel Administrativo</span>
          <span>{new Date().toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </div>
  );
}
