"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";

export type WindowId =
  | "about"
  | "projects"
  | "experience"
  | "achievements"
  | "blog"
  | "contact"
  | "shutdown";

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface ManagerState {
  windows: WindowState[];
  topZ: number;
}

type Action =
  | { type: "OPEN"; id: WindowId }
  | { type: "CLOSE"; id: WindowId }
  | { type: "MINIMIZE"; id: WindowId }
  | { type: "RESTORE"; id: WindowId }
  | { type: "FOCUS"; id: WindowId }
  | { type: "MOVE"; id: WindowId; position: { x: number; y: number } }
  | { type: "RESIZE"; id: WindowId; size: { width: number; height: number } };

const INITIAL_WINDOWS: Omit<WindowState, "zIndex">[] = [
  {
    id: "about",
    title: "Sobre Mim",
    icon: "👤",
    isOpen: false,
    isMinimized: false,
    position: { x: 80, y: 60 },
    size: { width: 480, height: 360 },
  },
  {
    id: "projects",
    title: "Meus Projetos",
    icon: "📁",
    isOpen: false,
    isMinimized: false,
    position: { x: 120, y: 80 },
    size: { width: 560, height: 420 },
  },
  {
    id: "experience",
    title: "Experiência.doc",
    icon: "📄",
    isOpen: false,
    isMinimized: false,
    position: { x: 160, y: 100 },
    size: { width: 520, height: 400 },
  },
  {
    id: "achievements",
    title: "Conquistas",
    icon: "🏆",
    isOpen: false,
    isMinimized: false,
    position: { x: 200, y: 120 },
    size: { width: 480, height: 380 },
  },
  {
    id: "blog",
    title: "Blog.exe — Internet Explorer",
    icon: "🌐",
    isOpen: false,
    isMinimized: false,
    position: { x: 240, y: 80 },
    size: { width: 640, height: 480 },
  },
  {
    id: "contact",
    title: "Contato",
    icon: "✉️",
    isOpen: false,
    isMinimized: false,
    position: { x: 300, y: 140 },
    size: { width: 400, height: 320 },
  },
];

function buildInitial(): ManagerState {
  return {
    windows: INITIAL_WINDOWS.map((w) => ({ ...w, zIndex: 10 })),
    topZ: 10,
  };
}

function reducer(state: ManagerState, action: Action): ManagerState {
  const newTopZ = state.topZ + 1;

  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: newTopZ }
            : w
        ),
      };

    case "CLOSE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isOpen: false, isMinimized: false } : w
        ),
      };

    case "MINIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
      };

    case "RESTORE":
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isMinimized: false, zIndex: newTopZ }
            : w
        ),
      };

    case "FOCUS":
      return {
        ...state,
        topZ: newTopZ,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: newTopZ } : w
        ),
      };

    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      };

    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, size: action.size } : w
        ),
      };

    default:
      return state;
  }
}

interface WindowManagerContextValue {
  windows: WindowState[];
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void;
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void;
  getWindow: (id: WindowId) => WindowState | undefined;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitial);

  const openWindow = useCallback((id: WindowId) => dispatch({ type: "OPEN", id }), []);
  const closeWindow = useCallback((id: WindowId) => dispatch({ type: "CLOSE", id }), []);
  const minimizeWindow = useCallback((id: WindowId) => dispatch({ type: "MINIMIZE", id }), []);
  const restoreWindow = useCallback((id: WindowId) => dispatch({ type: "RESTORE", id }), []);
  const focusWindow = useCallback((id: WindowId) => dispatch({ type: "FOCUS", id }), []);
  const moveWindow = useCallback(
    (id: WindowId, position: { x: number; y: number }) =>
      dispatch({ type: "MOVE", id, position }),
    []
  );
  const resizeWindow = useCallback(
    (id: WindowId, size: { width: number; height: number }) =>
      dispatch({ type: "RESIZE", id, size }),
    []
  );
  const getWindow = useCallback(
    (id: WindowId) => state.windows.find((w) => w.id === id),
    [state.windows]
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows: state.windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        focusWindow,
        moveWindow,
        resizeWindow,
        getWindow,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}
