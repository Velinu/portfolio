"use client";

import { useContactWindow } from "./hook";

export function ContactWindow() {
  const { register, onSubmit, errors, isPending, error, isSuccess } = useContactWindow();

  if (isSuccess) {
    return <SuccessDialog />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{ fontSize: 32 }}>✉️</span>
        <div>
          <p style={{ fontWeight: "bold", marginBottom: 2 }}>Send Message</p>
          <p style={{ fontSize: 10, color: "#555" }}>
            Fill out the form below to get in touch.
          </p>
        </div>
      </div>

      <div className="w2k-separator" />

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <FormRow label="Name:">
          <input
            className="w2k-input"
            type="text"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </FormRow>

        <FormRow label="E-mail:">
          <input
            className="w2k-input"
            type="email"
            placeholder="your email"
            {...register("email")}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </FormRow>

        <FormRow label="Message:">
          <textarea
            className="w2k-input"
            rows={5}
            placeholder="Write your message..."
            style={{ resize: "vertical" }}
            {...register("message")}
          />
          {errors.message && <ErrorMsg>{errors.message.message}</ErrorMsg>}
        </FormRow>

        {error && (
          <div
            className="w2k-sunken"
            style={{ background: "#fff0f0", padding: "4px 8px", fontSize: 11, color: "#cc0000" }}
          >
            ⚠️ Error sending message. Please try again.
          </div>
        )}

        <div className="w2k-separator" />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            type="submit"
            className="w2k-btn"
            disabled={isPending}
            style={{ minWidth: 80 }}
          >
            {isPending ? "Sending..." : "Send"}
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

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10, color: "#cc0000", marginTop: 2 }}>{children}</span>
  );
}

function SuccessDialog() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", padding: 16 }}>
      <span style={{ fontSize: 48 }}>✅</span>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bold", marginBottom: 4 }}>Mensagem enviada!</p>
        <p style={{ fontSize: 11, color: "#444" }}>
          Sua mensagem foi enviada com sucesso. Responderei em breve.
        </p>
      </div>
    </div>
  );
}
