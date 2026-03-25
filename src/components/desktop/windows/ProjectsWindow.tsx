"use client";

import { useState } from "react";
import { Project } from "@/lib/types";

export function ProjectsWindow({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 24, color: "#666" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
        <div>Esta pasta está vazia.</div>
      </div>
    );
  }

  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>
      {/* Address bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 4px",
          borderBottom: "1px solid var(--w2k-mid-dark)",
          background: "var(--w2k-surface)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 11, color: "#666" }}>Endereço:</span>
        <div
          className="w2k-sunken"
          style={{ flex: 1, padding: "1px 4px", background: "#fff", fontSize: 11 }}
        >
          C:\MyPortfolio\Projects
        </div>
      </div>

      {/* Content pane */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* File list */}
        <div
          className="w2k-sunken"
          style={{
            flex: 1,
            background: "#fff",
            overflow: "auto",
            padding: 2,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project.id)}
              onDoubleClick={() => project.url && window.open(project.url, "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "3px 6px",
                background: selected === project.id ? "var(--w2k-select)" : "transparent",
                color: selected === project.id ? "var(--w2k-select-text)" : "var(--w2k-text)",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>
                {project.featured ? "⭐" : "📄"}
              </span>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontWeight: project.featured ? "bold" : "normal", fontSize: 11 }}>
                  {project.title}
                </div>
              </div>
              <div style={{ fontSize: 10, color: selected === project.id ? "#ccc" : "#888", flexShrink: 0 }}>
                {project.techs.slice(0, 2).join(", ")}
              </div>
            </div>
          ))}
        </div>

        {/* Detail pane */}
        {selectedProject && (
          <div
            className="w2k-sunken"
            style={{
              width: 180,
              background: "#fff",
              padding: 8,
              overflow: "auto",
              borderLeft: "none",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ fontSize: 28, textAlign: "center" }}>
              {selectedProject.featured ? "⭐" : "📄"}
            </div>
            <div style={{ fontWeight: "bold", fontSize: 11, textAlign: "center" }}>
              {selectedProject.title}
            </div>
            <div className="w2k-separator" />
            <div style={{ fontSize: 10, color: "#444" }}>{selectedProject.description}</div>
            <div className="w2k-separator" />
            <div style={{ fontSize: 10 }}>
              <strong>Tecnologias:</strong>
              <div style={{ marginTop: 2, color: "#444" }}>
                {selectedProject.techs.join(", ")}
              </div>
            </div>
            {(selectedProject.url || selectedProject.repoUrl) && (
              <>
                <div className="w2k-separator" />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 10, color: "#0000cc", textDecoration: "underline" }}
                    >
                      🌐 Open project
                    </a>
                  )}
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 10, color: "#0000cc", textDecoration: "underline" }}
                    >
                      🐙 Ver código
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="w2k-sunken"
        style={{
          padding: "1px 6px",
          fontSize: 10,
          color: "#444",
          flexShrink: 0,
          borderTop: "none",
        }}
      >
        {projects.length} objeto(s)
        {selected && ` · ${selectedProject?.title} selecionado`}
      </div>
    </div>
  );
}
