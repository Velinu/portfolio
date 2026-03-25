"use client";

import { WindowId, useWindowManager } from "./WindowManager";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: string;
}

export function DesktopIcon({ id, label, icon }: DesktopIconProps) {
  const { openWindow } = useWindowManager();

  return (
    <button
      onDoubleClick={() => openWindow(id)}
      style={{
        background: "transparent",
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 6,
        width: 72,
        cursor: "default",
        color: "#fff",
      }}
      title={`Open ${label}`}
    >
      <span style={{ fontSize: 36, lineHeight: 1, filter: "drop-shadow(1px 1px 1px #000)" }}>
        {icon}
      </span>
      <span
        style={{
          fontSize: 11,
          fontFamily: "Tahoma, Arial, sans-serif",
          textAlign: "center",
          whiteSpace: "nowrap",
          textShadow: "1px 1px 1px #000",
          lineHeight: 1.2,
          maxWidth: 70,
        }}
      >
        {label}
      </span>
    </button>
  );
}
