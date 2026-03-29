"use client";

import { Experience } from "@/lib/types";

export function ExperienceWindow({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 24, color: "#666" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
        <div>No experience entries found.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* WordPad-style toolbar */}
      <div
        className="w2k-raised"
        style={{
          padding: "2px 4px",
          display: "flex",
          gap: 2,
          background: "var(--w2k-surface)",
          flexShrink: 0,
          borderBottom: "1px solid var(--w2k-mid-dark)",
          flexWrap: "wrap",
        }}
      >
        {["📋 Copy", "🖨️ Print", "🔍 Find"].map((item) => (
          <button key={item} className="w2k-btn" style={{ minWidth: "auto", padding: "1px 6px", fontSize: 10 }}>
            {item}
          </button>
        ))}
      </div>

      {/* Document area */}
      <div
        className="w2k-selectable"
        style={{
          flex: 1,
          overflow: "auto",
          background: "#fff",
          padding: "24px 32px",
          fontFamily: "Times New Roman, serif",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 4,
            borderBottom: "2px solid #000",
            paddingBottom: 8,
          }}
        >
          Professional Experience
        </h1>

        {experiences.map((exp, i) => (
          <div key={exp.id} style={{ marginBottom: 24 }}>
            {i > 0 && <div className="w2k-separator" style={{ margin: "16px 0" }} />}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: 13 }}>{exp.role}</div>
                <div style={{ fontStyle: "italic", color: "#444", fontSize: 12 }}>{exp.company}</div>
              </div>
              <div style={{ fontSize: 11, color: "#666", textAlign: "right", flexShrink: 0 }}>
                <div>{formatDate(exp.startDate)}</div>
                <div>{exp.current ? "→ Present" : `→ ${formatDate(exp.endDate!)}`}</div>
              </div>
            </div>

            <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6, color: "#333" }}>
              {exp.description}
            </div>

            {exp.current && (
              <div
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  background: "#000080",
                  color: "#fff",
                  padding: "1px 8px",
                  fontSize: 10,
                }}
              >
                ● Current job
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        className="w2k-sunken"
        style={{ padding: "1px 6px", fontSize: 10, color: "#444", flexShrink: 0 }}
      >
        Ln 1, Col 1 · {experiences.length} experience(s) · Read-only
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
