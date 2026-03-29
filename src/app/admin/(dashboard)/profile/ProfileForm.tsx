"use client";

import { useTransition, useState } from "react";
import { upsertProfile } from "@/lib/actions/profile";
import { Profile } from "@/lib/types";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState({
    name: profile?.name ?? "",
    bio: profile?.bio ?? "",
    avatarUrl: profile?.avatarUrl ?? "",
    github: profile?.github ?? "",
    linkedin: profile?.linkedin ?? "",
    email: profile?.email ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await upsertProfile({
        name: form.name,
        bio: form.bio,
        avatarUrl: form.avatarUrl || undefined,
        github: form.github || undefined,
        linkedin: form.linkedin || undefined,
        email: form.email || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 520 }}>
      <Field label="Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
      <Field label="Bio *" value={form.bio} onChange={(v) => setForm((f) => ({ ...f, bio: v }))} textarea required />
      <Field label="Avatar URL" value={form.avatarUrl} onChange={(v) => setForm((f) => ({ ...f, avatarUrl: v }))} />
      <Field label="GitHub" value={form.github} onChange={(v) => setForm((f) => ({ ...f, github: v }))} />
      <Field label="LinkedIn" value={form.linkedin} onChange={(v) => setForm((f) => ({ ...f, linkedin: v }))} />
      <Field label="E-mail" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />

      <div className="w2k-separator" />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button type="submit" className="w2k-btn" disabled={pending} style={{ minWidth: 80 }}>
          {pending ? "Saving..." : "Save"}
        </button>
        {saved && <span style={{ fontSize: 11, color: "#007700" }}>✅ Saved successfully!</span>}
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, textarea, required,
}: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; required?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <label style={{ width: 90, paddingTop: 3, textAlign: "right", fontSize: 11, flexShrink: 0 }}>{label}</label>
      {textarea ? (
        <textarea
          className="w2k-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          required={required}
          style={{ flex: 1, resize: "vertical" }}
        />
      ) : (
        <input
          className="w2k-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          style={{ flex: 1 }}
        />
      )}
    </div>
  );
}
