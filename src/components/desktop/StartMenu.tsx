"use client";

import { useState } from "react";
import { useWindowManager, WindowId } from "./WindowManager";

interface StartMenuProps {
  onClose: () => void;
}

const MENU_ITEMS: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "My projects", icon: "📁" },
  { id: "experience", label: "Experience.doc", icon: "📄" },
  { id: "achievements", label: "Achievements", icon: "🏆" },
  { id: "blog", label: "Blog.exe", icon: "🌐" },
  { id: "contact", label: "Contact", icon: "✉️" },
];

export function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindowManager();
  const [showShutdown, setShowShutdown] = useState(false);

  function handleOpen(id: WindowId) {
    openWindow(id);
    onClose();
  }

  function handleShutdown() {
    setShowShutdown(true);
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          left: 0,
          width: 200,
          background: "var(--w2k-surface)",
          border: "1px solid var(--w2k-dark)",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header banner */}
        <div
          style={{
            background: "linear-gradient(to bottom, var(--w2k-title-from), var(--w2k-title-to))",
            padding: "8px 12px",
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            minHeight: 54,
          }}
        >
          <span style={{ fontSize: 28, lineHeight: 1 }}>👤</span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 13, lineHeight: 1 }}>
            Portfolio
          </span>
        </div>

        {/* Menu items */}
        <div style={{ padding: "2px 0" }}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleOpen(item.id)}
              className="w2k-menu-item"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 11,
                cursor: "default",
                textAlign: "left",
                color: "var(--w2k-text)",
              }}
            >
              <span style={{ fontSize: 16, width: 20 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          <div className="w2k-separator" style={{ margin: "4px 8px" }} />

          {/* About this computer */}
          <button
            onClick={() => { handleOpen("about"); }}
            className="w2k-menu-item"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              cursor: "default",
              textAlign: "left",
              color: "var(--w2k-text)",
            }}
          >
            <span style={{ fontSize: 16, width: 20 }}>🖥️</span>
            About this computer
          </button>

          <div className="w2k-separator" style={{ margin: "4px 8px" }} />

          {/* Shut down */}
          <button
            onClick={handleShutdown}
            className="w2k-menu-item"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              cursor: "default",
              textAlign: "left",
              color: "var(--w2k-text)",
            }}
          >
            <span style={{ fontSize: 16, width: 20 }}>⏻</span>
            Shut down...
          </button>
        </div>
      </div>

      {/* Shutdown dialog */}
      {showShutdown && (
        <ShutdownDialog onClose={() => { setShowShutdown(false); onClose(); }} />
      )}
    </>
  );
}

function ShutdownDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
      }}
    >
      <div
        className="w2k-raised"
        style={{
          background: "var(--w2k-surface)",
          width: 360,
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          className="w2k-titlebar-active"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "2px 4px",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 14 }}>🖥️</span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 11, flex: 1 }}>
            Shut Down Windows
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <span style={{ fontSize: 40 }}>⚠️</span>
          <div className="w2k-selectable">
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>
              Are you sure you want to quit?
            </p>
            <p style={{ margin: 0, color: "#444" }}>
              This portfolio cannot be shut down — it exists to impress you.
              Try again when the universe allows it. 😄
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "8px 16px 16px",
          }}
        >
          <button className="w2k-btn" onClick={onClose} style={{ minWidth: 80 }}>
            OK
          </button>
          <button className="w2k-btn" onClick={onClose} style={{ minWidth: 80 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
