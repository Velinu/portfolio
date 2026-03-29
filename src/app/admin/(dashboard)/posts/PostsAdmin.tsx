"use client";

import { useState, useTransition } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { createPost, updatePost, deletePost } from "@/lib/actions/posts";
import { Post } from "@/lib/types";

const EMPTY = { title: "", content: "", published: false };

export function PostsAdmin({ posts }: { posts: Post[] }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleEdit(p: Post) {
    setForm({ title: p.title, content: p.content, published: p.published });
    setEditing(p.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editing) await updatePost(editing, form);
      else await createPost(form);
      setShowForm(false);
      setEditing(null);
      setForm(EMPTY);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div><button className="w2k-btn" onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}>✍️ New post</button></div>

      <AdminTable
        columns={[
          { header: "Title", render: (p) => p.title, width: 220 },
          { header: "Status", render: (p) => p.published ? "✅ Published" : "📝 Draft", width: 100 },
          { header: "Date", render: (p) => new Date(p.createdAt).toLocaleDateString("en-US"), width: 100 },
        ]}
        rows={posts}
        onEdit={handleEdit}
        onDelete={(id) => deletePost(id)}
      />

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div className="w2k-raised" style={{ width: "min(700px, 95vw)", background: "var(--w2k-surface)", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            <div className="w2k-titlebar-active" style={{ padding: "3px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11 }}>{editing ? "Edit post" : "New post"} — Markdown Editor</span>
              <button onClick={() => setShowForm(false)} style={{ background: "var(--w2k-surface)", border: "1px solid var(--w2k-dark)", width: 16, height: 14, fontSize: 10, cursor: "default" }}>✕</button>
            </div>
            <div style={{ padding: 16, overflow: "auto", flex: 1 }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ fontSize: 11, flexShrink: 0 }}>Title *</label>
                  <input className="w2k-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required style={{ flex: 1 }} />
                </div>

                {/* Markdown editor */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                  <div style={{ fontSize: 11, display: "flex", gap: 8, alignItems: "center" }}>
                    <span>Content * (Markdown)</span>
                    <div style={{ display: "flex", gap: 2 }}>
                      {["**B**", "*I*", "# H1", "## H2", "- List", "[link](url)"].map((tag) => (
                        <button key={tag} type="button" className="w2k-btn"
                          onClick={() => setForm((f) => ({ ...f, content: f.content + "\n" + tag }))}
                          style={{ minWidth: "auto", padding: "0 4px", fontSize: 10 }}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="w2k-input"
                    value={form.content}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    required
                    style={{ resize: "vertical", minHeight: 240, fontFamily: "monospace", fontSize: 12 }}
                  />
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
                  <label htmlFor="published" style={{ fontSize: 11 }}>Publish immediately</label>
                </div>

                <div className="w2k-separator" />
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button type="submit" className="w2k-btn" disabled={pending}>{pending ? "Saving..." : "Save"}</button>
                  <button type="button" className="w2k-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
