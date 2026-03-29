"use client";

import { useState, useTransition } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";

const EMPTY = { title: "", description: "", techs: "", url: "", repoUrl: "", imageUrl: "", featured: false };

export function ProjectsAdmin({ projects }: { projects: Project[] }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleEdit(p: Project) {
    setForm({ title: p.title, description: p.description, techs: p.techs.join(", "), url: p.url ?? "", repoUrl: p.repoUrl ?? "", imageUrl: p.imageUrl ?? "", featured: p.featured });
    setEditing(p.id);
    setShowForm(true);
  }

  function handleNew() {
    setForm(EMPTY);
    setEditing(null);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editing) {
        await updateProject(editing, form);
      } else {
        await createProject(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div>
        <button className="w2k-btn" onClick={handleNew}>➕ New project</button>
      </div>

      <AdminTable
        columns={[
          { header: "Title", render: (p) => p.title, width: 180 },
          { header: "Techs", render: (p) => p.techs.join(", "), width: 180 },
          { header: "Featured", render: (p) => p.featured ? "⭐ Yes" : "No", width: 70 },
        ]}
        rows={projects}
        onEdit={handleEdit}
        onDelete={(id) => deleteProject(id)}
      />

      {showForm && (
        <Dialog title={editing ? "Edit project" : "New project"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Field label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
            <Field label="Description *" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} textarea required />
            <Field label="Techs *" value={form.techs} onChange={(v) => setForm((f) => ({ ...f, techs: v }))} placeholder="React, Node.js, ..." required />
            <Field label="URL" value={form.url} onChange={(v) => setForm((f) => ({ ...f, url: v }))} />
            <Field label="Repo URL" value={form.repoUrl} onChange={(v) => setForm((f) => ({ ...f, repoUrl: v }))} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 100 }}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
              <label htmlFor="featured" style={{ fontSize: 11 }}>Featured project</label>
            </div>
            <div className="w2k-separator" />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="submit" className="w2k-btn" disabled={pending}>{pending ? "Saving..." : "Save"}</button>
              <button type="button" className="w2k-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
}

function Field({ label, value, onChange, textarea, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; required?: boolean; placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <label style={{ width: 90, paddingTop: 3, textAlign: "right", fontSize: 11, flexShrink: 0 }}>{label}</label>
      {textarea ? (
        <textarea className="w2k-input" value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} placeholder={placeholder} style={{ flex: 1, resize: "vertical" }} />
      ) : (
        <input className="w2k-input" type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} style={{ flex: 1 }} />
      )}
    </div>
  );
}

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div className="w2k-raised" style={{ width: 480, background: "var(--w2k-surface)", maxHeight: "90vh", overflow: "auto" }}>
        <div className="w2k-titlebar-active" style={{ padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11 }}>{title}</span>
          <button onClick={onClose} style={{ background: "var(--w2k-surface)", border: "1px solid var(--w2k-dark)", width: 16, height: 14, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "default" }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}
