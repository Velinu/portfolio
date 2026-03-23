"use client";

import { Rnd } from "react-rnd";
import { useWindowManager, WindowId } from "./WindowManager";

interface WindowProps {
  id: WindowId;
  children: React.ReactNode;
}

export function Window({ id, children }: WindowProps) {
  const { getWindow, closeWindow, minimizeWindow, focusWindow, moveWindow, resizeWindow } =
    useWindowManager();

  const win = getWindow(id);
  if (!win || !win.isOpen || win.isMinimized) return null;

  const isActive = true; // TODO: track activeWindowId in state

  return (
    <Rnd
      style={{ zIndex: win.zIndex }}
      size={{ width: win.size.width, height: win.size.height }}
      position={{ x: win.position.x, y: win.position.y }}
      minWidth={240}
      minHeight={160}
      bounds="parent"
      dragHandleClassName="w2k-titlebar"
      onDragStop={(_, d) => moveWindow(id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        resizeWindow(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        moveWindow(id, { x: pos.x, y: pos.y });
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Window frame */}
      <div
        className="w2k-raised"
        style={{
          width: "100%",
          height: "100%",
          background: "var(--w2k-surface)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          className={`w2k-titlebar ${isActive ? "w2k-titlebar-active" : "w2k-titlebar-inactive"}`}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "2px 2px 2px 4px",
            gap: 2,
            flexShrink: 0,
            cursor: "move",
          }}
        >
          {/* Icon + title */}
          <span style={{ fontSize: 14, lineHeight: 1, marginRight: 4 }}>{win.icon}</span>
          <span
            style={{
              flex: 1,
              color: "var(--w2k-text-white)",
              fontSize: 11,
              fontWeight: "bold",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {win.title}
          </span>

          {/* Control buttons */}
          <TitleBarButton onClick={() => minimizeWindow(id)} title="Minimizar">
            <MinimizeIcon />
          </TitleBarButton>
          <TitleBarButton onClick={() => {}} title="Maximizar" disabled>
            <MaximizeIcon />
          </TitleBarButton>
          <TitleBarButton onClick={() => closeWindow(id)} title="Fechar" isClose>
            <CloseIcon />
          </TitleBarButton>
        </div>

        {/* Menu bar placeholder (toolbar area) */}
        <div
          style={{
            background: "var(--w2k-surface)",
            borderBottom: "1px solid var(--w2k-mid-dark)",
            flexShrink: 0,
            height: 4,
          }}
        />

        {/* Content area */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            background: "var(--w2k-surface)",
            padding: 8,
          }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}

function TitleBarButton({
  onClick,
  title,
  isClose,
  disabled,
  children,
}: {
  onClick: () => void;
  title: string;
  isClose?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{
        width: 16,
        height: 14,
        background: "var(--w2k-surface)",
        border: "1px solid var(--w2k-light)",
        borderRightColor: "var(--w2k-dark)",
        borderBottomColor: "var(--w2k-dark)",
        boxShadow: "inset 1px 1px 0 var(--w2k-mid-light), inset -1px -1px 0 var(--w2k-mid-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "default",
        padding: 0,
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        marginLeft: isClose ? 2 : 0,
      }}
    >
      {children}
    </button>
  );
}

function MinimizeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <rect x="1" y="5" width="6" height="2" fill="#000" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <rect x="1" y="1" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" />
      <rect x="1" y="1" width="6" height="2" fill="#000" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <line x1="1" y1="1" x2="7" y2="7" stroke="#000" strokeWidth="1.5" />
      <line x1="7" y1="1" x2="1" y2="7" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}
