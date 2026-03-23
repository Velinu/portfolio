"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactWindow() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <SuccessDialog onClose={() => setStatus("idle")} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Dialog header */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontSize: 32 }}>✉️</span>
        <div>
          <div style={{ fontWeight: "bold", marginBottom: 2 }}>Enviar mensagem</div>
          <div style={{ fontSize: 10, color: "#555" }}>
            Preencha o formulário abaixo para entrar em contato.
          </div>
        </div>
      </div>

      <div className="w2k-separator" />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <FormRow label="Nome:">
          <input
            className="w2k-input"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="Seu nome"
          />
        </FormRow>

        <FormRow label="E-mail:">
          <input
            className="w2k-input"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            placeholder="seuemail@exemplo.com"
          />
        </FormRow>

        <FormRow label="Mensagem:">
          <textarea
            className="w2k-input"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            required
            rows={5}
            placeholder="Escreva sua mensagem..."
            style={{ resize: "vertical" }}
          />
        </FormRow>

        {status === "error" && (
          <div
            className="w2k-sunken"
            style={{ background: "#fff0f0", padding: "4px 8px", fontSize: 11, color: "#cc0000" }}
          >
            ⚠️ Erro ao enviar. Tente novamente.
          </div>
        )}

        <div className="w2k-separator" />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="submit"
            className="w2k-btn"
            disabled={status === "sending"}
            style={{ minWidth: 80 }}
          >
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>
          <button
            type="button"
            className="w2k-btn"
            onClick={() => setForm({ name: "", email: "", message: "" })}
            style={{ minWidth: 80 }}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <label style={{ width: 70, paddingTop: 3, textAlign: "right", flexShrink: 0, fontSize: 11 }}>
        {label}
      </label>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function SuccessDialog({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", padding: 16 }}>
      <span style={{ fontSize: 48 }}>✅</span>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>Mensagem enviada!</div>
        <div style={{ fontSize: 11, color: "#444" }}>
          Sua mensagem foi enviada com sucesso. Responderei em breve.
        </div>
      </div>
      <button className="w2k-btn" onClick={onClose} style={{ minWidth: 80 }}>
        OK
      </button>
    </div>
  );
}
