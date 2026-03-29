"use client";

import { useState, useTransition } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions/experience";
import { Experience } from "@/lib/types";

const EMPTY = { company: "", role: "", description: "", startDate: "", endDate: "", current: false };

function toDateInput(d: Date | null | undefined) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

export function ExperienceAdmin({ experiences }: { experiences: Experience[] }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleEdit(exp: Experience) {
    setForm({ company: exp.company, role: exp.role, description: exp.description, startDate: toDateInput(exp.startDate), endDate: toDateInput(exp.endDate), current: exp.current });
    setEditing(exp.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editing) {
        await updateExperience(editing, form);
      } else {
        await createExperience(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div><button className="w2k-btn" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}>➕ New experience</button></div>

      <AdminTable
        columns={[
          { header: "Company", render: (e) => e.company, width: 140 },
          { header: "Role", render: (e) => e.role, width: 160 },
          { header: "Period", render: (e) => `${toDateInput(e.startDate)} → ${e.current ? "Current" : toDateInput(e.endDate)}`, width: 180 },
        ]}
        rows={experiences}
        onEdit={handleEdit}
        onDelete={(id) => deleteExperience(id)}
      />

      {showForm && (
        <Dialog title={editing ? "Edit experience" : "New experience"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Field label="Company *" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} required />
            <Field label="Role *" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} required />
            <Field label="Description *" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} textarea required />
            <Field label="Start *" value={form.startDate} onChange={(v) => setForm((f) => ({ ...f, startDate: v }))} type="date" required />
            {!form.current && <Field label="End" value={form.endDate} onChange={(v) => setForm((f) => ({ ...f, endDate: v }))} type="date" />}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 100 }}>
              <input type="checkbox" id="current" checked={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))} />
              <label htmlFor="current" style={{ fontSize: 11 }}>Current job</label>
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

function Field({ label, value, onChange, textarea, required, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; required?: boolean; type?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <label style={{ width: 90, paddingTop: 3, textAlign: "right", fontSize: 11, flexShrink: 0 }}>{label}</label>
      {textarea ? (
        <textarea className="w2k-input" value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} style={{ flex: 1, resize: "vertical" }} />
      ) : (
        <input className="w2k-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} style={{ flex: 1 }} />
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
