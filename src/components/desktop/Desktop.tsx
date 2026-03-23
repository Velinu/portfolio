"use client";

import { Profile, Project, Experience, Achievement, Post } from "@/lib/types";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { WindowId } from "./WindowManager";
import { AboutWindow } from "./windows/AboutWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { AchievementsWindow } from "./windows/AchievementsWindow";
import { BlogWindow } from "./windows/BlogWindow";
import { ContactWindow } from "./windows/ContactWindow";

interface DesktopProps {
  profile: Profile | null;
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  posts: Post[];
}

const ICONS: { id: WindowId; label: string; icon: string }[] = [
  { id: "about",        label: "Sobre Mim",       icon: "👤" },
  { id: "projects",     label: "Meus Projetos",   icon: "📁" },
  { id: "experience",   label: "Experiência.doc", icon: "📄" },
  { id: "achievements", label: "Conquistas",       icon: "🏆" },
  { id: "blog",         label: "Blog.exe",         icon: "🌐" },
  { id: "contact",      label: "Contato",          icon: "✉️" },
];

export function Desktop({ profile, projects, experiences, achievements, posts }: DesktopProps) {
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
          <AboutWindow profile={profile} />
        </Window>
        <Window id="projects">
          <ProjectsWindow projects={projects} />
        </Window>
        <Window id="experience">
          <ExperienceWindow experiences={experiences} />
        </Window>
        <Window id="achievements">
          <AchievementsWindow achievements={achievements} />
        </Window>
        <Window id="blog">
          <BlogWindow posts={posts} />
        </Window>
        <Window id="contact">
          <ContactWindow />
        </Window>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
