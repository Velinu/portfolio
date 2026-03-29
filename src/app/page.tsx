import { prisma } from "@/lib/prisma";
import { WindowManagerProvider } from "@/components/desktop/WindowManager";
import { Desktop } from "@/components/desktop/Desktop";
import { Providers } from "@/components/Providers";

export default async function Home() {
  const [profile, projects, experiences, achievements, posts] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.experience.findMany({ orderBy: { startDate: "desc" } }),
    prisma.achievement.findMany({
      include: { category: true },
      orderBy: { date: "desc" },
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <Providers>
      <WindowManagerProvider>
        <Desktop
          profile={profile}
          projects={projects}
          experiences={experiences}
          achievements={achievements}
          posts={posts}
        />
      </WindowManagerProvider>
    </Providers>
  );
}
