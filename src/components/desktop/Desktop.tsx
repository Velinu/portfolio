"use client";

import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { WindowId } from "./WindowManager";

const ICONS: { id: WindowId; label: string; icon: string }[] = [
  { id: "about",        label: "Sobre Mim",      icon: "👤" },
  { id: "projects",     label: "Meus Projetos",  icon: "📁" },
  { id: "experience",   label: "Experiência.doc", icon: "📄" },
  { id: "achievements", label: "Conquistas",      icon: "🏆" },
  { id: "blog",         label: "Blog.exe",        icon: "🌐" },
  { id: "contact",      label: "Contato",         icon: "✉️" },
];

export function Desktop() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--w2k-desktop)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Icon grid + window area */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Desktop icons */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 1,
          }}
        >
          {ICONS.map((icon) => (
            <DesktopIcon key={icon.id} {...icon} />
          ))}
        </div>

        {/* Windows */}
        <Window id="about">
          <AboutContent />
        </Window>
        <Window id="projects">
          <ProjectsContent />
        </Window>
        <Window id="experience">
          <ExperienceContent />
        </Window>
        <Window id="achievements">
          <AchievementsContent />
        </Window>
        <Window id="blog">
          <BlogContent />
        </Window>
        <Window id="contact">
          <ContactContent />
        </Window>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}

/* ── Placeholder window contents (serão substituídos com dados reais) ── */

function AboutContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>👤 Carregando informações...</p>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>📁 Nenhum projeto cadastrado ainda.</p>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>📄 Experiência profissional em breve.</p>
    </div>
  );
}

function AchievementsContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>🏆 Conquistas em breve.</p>
    </div>
  );
}

function BlogContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>🌐 Nenhum post publicado ainda.</p>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="w2k-selectable">
      <p style={{ margin: 0 }}>✉️ Formulário de contato em breve.</p>
    </div>
  );
}
