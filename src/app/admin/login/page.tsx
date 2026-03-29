"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
    }
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/admin" });
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--w2k-desktop)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Login dialog */}
      <div className="w2k-raised" style={{ width: 340, background: "var(--w2k-surface)" }}>
        {/* Title bar */}
        <div
          className="w2k-titlebar-active"
          style={{ padding: "3px 6px", display: "flex", alignItems: "center", gap: 6 }}
        >
          <span style={{ fontSize: 14 }}>🔐</span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11 }}>
            Log On to Windows — Portfolio Admin
          </span>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Icon + description */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 36 }}>🖥️</span>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: 2 }}>Admin Panel</div>
              <div style={{ fontSize: 10, color: "#555" }}>
                Enter your credentials to access the system.
              </div>
            </div>
          </div>

          <div className="w2k-separator" />

          <form onSubmit={handleCredentials} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <FormRow label="User:">
              <input
                className="w2k-input"
                type="email"
                placeholder="youremail@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </FormRow>
            <FormRow label="Password:">
              <input
                className="w2k-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
            </FormRow>

            {error && (
              <div style={{ fontSize: 11, color: "#cc0000", padding: "2px 0" }}>
                ⚠️ {error}
              </div>
            )}

            <div className="w2k-separator" />

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="submit" className="w2k-btn" disabled={loading} style={{ minWidth: 80 }}>
                {loading ? "Signing in..." : "OK"}
              </button>
            </div>
          </form>

          <div className="w2k-separator" />

          {/* Google login */}
          <button
            onClick={handleGoogle}
            className="w2k-btn"
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}
          >
            <span>🌐</span> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <label style={{ width: 64, textAlign: "right", flexShrink: 0, fontSize: 11 }}>{label}</label>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
