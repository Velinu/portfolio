"use client";

import { Profile } from "@/lib/types";

export function AboutWindow({ profile }: { profile: Profile | null }) {
  if (!profile) {
    return <EmptyState icon="👤" message="Profile not configured." />;
  }

  return (
    <div className="w2k-selectable" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Explorer toolbar */}
      <Toolbar />

      {/* Profile card */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div
          className="w2k-sunken"
          style={{
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            flexShrink: 0,
            background: "#fff",
          }}
        >
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "👤"
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{profile.name}</div>
          <div style={{ color: "#444", marginBottom: 8 }}>{profile.bio}</div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {profile.email && (
              <Row icon="✉️" label="E-mail" value={profile.email} href={`mailto:${profile.email}`} />
            )}
            {profile.github && (
              <Row icon="🐙" label="GitHub" value={profile.github} href={profile.github} />
            )}
            {profile.linkedin && (
              <Row icon="💼" label="LinkedIn" value={profile.linkedin} href={profile.linkedin} />
            )}
          </div>
        </div>
      </div>

      <Divider />

      {/* System info box */}
      <div className="w2k-sunken" style={{ background: "#fff", padding: 8 }}>
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>About this computer</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", color: "#444" }}>
          <span>Operating System:</span><span>Portfolio™ 2000</span>
          <span>Processor:</span><span>Creativity 9000 MHz</span>
          <span>RAM:</span><span>Infinite (full of ideas)</span>
          <span>Hard Drive:</span><span>GitHub (unlimited)</span>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11 }}>
      <span style={{ width: 16 }}>{icon}</span>
      <span style={{ color: "#666", width: 60 }}>{label}:</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#0000cc", textDecoration: "underline", cursor: "pointer" }}
      >
        {value}
      </a>
    </div>
  );
}

function Toolbar() {
  return (
    <div
      className="w2k-raised"
      style={{
        padding: "2px 4px",
        display: "flex",
        gap: 4,
        background: "var(--w2k-surface)",
        marginBottom: 4,
      }}
    >
      {["File", "Edit", "View", "Favorites", "Help"].map((item) => (
        <span
          key={item}
          style={{ padding: "2px 6px", fontSize: 11, cursor: "default" }}
          className="w2k-menu-item"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function Divider() {
  return <div className="w2k-separator" style={{ margin: "4px 0" }} />;
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div style={{ textAlign: "center", padding: 24, color: "#666" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div>{message}</div>
    </div>
  );
}
