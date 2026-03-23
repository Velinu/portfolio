"use client";

import { useState, useTransition } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { createAchievement, updateAchievement, deleteAchievement } from "@/lib/actions/achievements";
import { Achievement } from "@/lib/types";

const EMPTY = { title: "", description: "", date: "", categoryId: "" };

export function AchievementsAdmin({ achievements, categories }: {
  achievements: Achievement[];
  categories: { id: string; name: string; slug: string }[];
}) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleEdit(a: Achievement) {
    setForm({ title: a.title, description: a.description, date: new Date(a.date).toISOString().slice(0, 10), categoryId: a.category.id });
    setEditing(a.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editing) await updateAchievement(editing, form);
      else await createAchievement(form);
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div><button className="w2k-btn" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}>➕ Nova conquista</button></div>

      <AdminTable
        columns={[
          { header: "Título", render: (a) => a.title, width: 200 },
          { header: "Categoria", render: (a) => a.category.name, width: 120 },
          { header: "Data", render: (a) => new Date(a.date).toLocaleDateString("pt-BR"), width: 100 },
        ]}
        rows={achievements}
        onEdit={handleEdit}
        onDelete={(id) => deleteAchievement(id)}
      />

      {showForm && (
        <Dialog title={editing ? "Editar conquista" : "Nova conquista"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Field label="Título *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
            <Field label="Descrição *" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} textarea required />
            <Field label="Data *" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} type="date" required />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ width: 90, textAlign: "right", fontSize: 11, flexShrink: 0 }}>Categoria *</label>
              <select className="w2k-input" value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} required style={{ flex: 1 }}>
                <option value="">Selecione...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="w2k-separator" />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="submit" className="w2k-btn" disabled={pending}>{pending ? "Salvando..." : "Salvar"}</button>
              <button type="button" className="w2k-btn" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
}

function Field({ label, value, onChange, textarea, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; required?: boolean; type?: string; }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <label style={{ width: 90, paddingTop: 3, textAlign: "right", fontSize: 11, flexShrink: 0 }}>{label}</label>
      {textarea ? <textarea className="w2k-input" value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} style={{ flex: 1, resize: "vertical" }} /> : <input className="w2k-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} style={{ flex: 1 }} />}
    </div>
  );
}

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div className="w2k-raised" style={{ width: 480, background: "var(--w2k-surface)", maxHeight: "90vh", overflow: "auto" }}>
        <div className="w2k-titlebar-active" style={{ padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11 }}>{title}</span>
          <button onClick={onClose} style={{ background: "var(--w2k-surface)", border: "1px solid var(--w2k-dark)", width: 16, height: 14, fontSize: 10, cursor: "default" }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}
