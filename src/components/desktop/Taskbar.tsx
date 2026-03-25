"use client";

import { useEffect, useState, useRef } from "react";
import { useWindowManager, WindowId } from "./WindowManager";
import { StartMenu } from "./StartMenu";

export function Taskbar() {
  const { windows, restoreWindow, minimizeWindow } = useWindowManager();
  const [time, setTime] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  // Close start menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openWindows = windows.filter((w) => w.isOpen);

  function handleTaskbarClick(id: WindowId, isMinimized: boolean) {
    if (isMinimized) {
      restoreWindow(id);
    } else {
      minimizeWindow(id);
    }
  }

  return (
    <div
      style={{
        height: 28,
        background: "var(--w2k-taskbar)",
        borderTop: "1px solid var(--w2k-light)",
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "0 2px",
        flexShrink: 0,
        position: "relative",
        zIndex: 9999,
        boxShadow: "inset 0 1px 0 var(--w2k-light)",
      }}
    >
      {/* Start button */}
      <div ref={startRef} style={{ position: "relative" }}>
        <button
          onClick={() => setStartOpen((v) => !v)}
          className={startOpen ? "w2k-btn pressed" : "w2k-btn"}
          style={{
            background: startOpen
              ? "var(--w2k-surface)"
              : "linear-gradient(to bottom, var(--w2k-start-from), var(--w2k-start-to))",
            color: startOpen ? "var(--w2k-text)" : "#fff",
            fontWeight: "bold",
            fontSize: 11,
            height: 22,
            minWidth: 54,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <WindowsLogo />
          Start
        </button>

        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </div>

      {/* Separator */}
      <div className="w2k-separator" style={{ width: 1, height: 20, margin: "0 2px" }} />

      {/* Open window buttons */}
      <div style={{ flex: 1, display: "flex", gap: 2, overflow: "hidden" }}>
        {openWindows.map((w) => (
          <button
            key={w.id}
            onClick={() => handleTaskbarClick(w.id, w.isMinimized)}
            className={!w.isMinimized ? "w2k-btn pressed" : "w2k-btn"}
            style={{
              height: 22,
              maxWidth: 150,
              minWidth: 100,
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 4,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: 13 }}>{w.icon}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{w.title}</span>
          </button>
        ))}
      </div>

      {/* Systray + Clock */}
      <div
        className="w2k-sunken"
        style={{
          padding: "1px 6px",
          height: 22,
          display: "flex",
          alignItems: "center",
          fontSize: 11,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {time}
      </div>
    </div>
  );
}

function WindowsLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <rect x="0" y="0" width="6" height="6" fill="#ff0000" />
      <rect x="7" y="0" width="6" height="6" fill="#00ff00" />
      <rect x="0" y="7" width="6" height="6" fill="#0000ff" />
      <rect x="7" y="7" width="6" height="6" fill="#ffff00" />
    </svg>
  );
}
