"use client";

import { useState, useTransition } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/achievements";

type Category = { id: string; name: string; slug: string };

export function CategoriesAdmin({ categories }: { categories: Category[] }) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editing) await updateCategory(editing.id, name);
      else await createCategory(name);
      setName("");
      setEditing(null);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          className="w2k-input"
          placeholder="Nome da categoria (ex: Certificação)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: 240 }}
        />
        <button type="submit" className="w2k-btn" disabled={pending} style={{ minWidth: 80 }}>
          {editing ? "Atualizar" : "➕ Adicionar"}
        </button>
        {editing && (
          <button type="button" className="w2k-btn" onClick={() => { setEditing(null); setName(""); }}>
            Cancelar
          </button>
        )}
      </form>

      <AdminTable
        columns={[
          { header: "Nome", render: (c) => c.name, width: 200 },
          { header: "Slug", render: (c) => c.slug, width: 200 },
        ]}
        rows={categories}
        onEdit={(c) => { setEditing(c); setName(c.name); }}
        onDelete={(id) => deleteCategory(id)}
      />
    </div>
  );
}
