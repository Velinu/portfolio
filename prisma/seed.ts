import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Profile
  await prisma.profile.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      name: "Seu Nome Aqui",
      bio: "Desenvolvedor apaixonado por tecnologia, criatividade e boas histórias. Trabalho com desenvolvimento web há X anos, sempre buscando soluções elegantes para problemas complexos.",
      avatarUrl: null,
      github: "https://github.com/seuusuario",
      linkedin: "https://linkedin.com/in/seuusuario",
      email: "seuemail@exemplo.com",
    },
  });

  // Achievement categories
  const catCert = await prisma.achievementCategory.upsert({
    where: { slug: "certificacao" },
    update: {},
    create: { name: "Certificação", slug: "certificacao" },
  });
  const catPremio = await prisma.achievementCategory.upsert({
    where: { slug: "premio" },
    update: {},
    create: { name: "Prêmio", slug: "premio" },
  });
  const catConquista = await prisma.achievementCategory.upsert({
    where: { slug: "conquista" },
    update: {},
    create: { name: "Conquista", slug: "conquista" },
  });

  // Projects
  await prisma.project.upsert({
    where: { slug: "portfolio-w2k" },
    update: {},
    create: {
      title: "Portfólio Windows 2000",
      slug: "portfolio-w2k",
      description: "Portfólio pessoal com tema Windows 2000, janelas arrastáveis, Start Menu e painel admin para gerenciar conteúdo.",
      techs: ["Next.js", "TypeScript", "Prisma", "Neon", "Tailwind CSS"],
      repoUrl: "https://github.com/seuusuario/about-me",
      featured: true,
    },
  });

  await prisma.project.upsert({
    where: { slug: "exemplo-projeto-2" },
    update: {},
    create: {
      title: "Projeto Exemplo 2",
      slug: "exemplo-projeto-2",
      description: "Descrição do segundo projeto. Adicione seus projetos reais pelo painel admin.",
      techs: ["React", "Node.js", "PostgreSQL"],
      featured: false,
    },
  });

  // Experiences
  await prisma.experience.upsert({
    where: { id: "exp-1" },
    update: {},
    create: {
      id: "exp-1",
      company: "Empresa Atual",
      role: "Desenvolvedor Full Stack",
      description: "Desenvolvimento de aplicações web, APIs RESTful e manutenção de sistemas legados.",
      startDate: new Date("2022-01-01"),
      current: true,
    },
  });

  await prisma.experience.upsert({
    where: { id: "exp-2" },
    update: {},
    create: {
      id: "exp-2",
      company: "Empresa Anterior",
      role: "Desenvolvedor Frontend",
      description: "Criação de interfaces responsivas e acessíveis com React e TypeScript.",
      startDate: new Date("2020-03-01"),
      endDate: new Date("2021-12-31"),
      current: false,
    },
  });

  // Achievements
  await prisma.achievement.create({
    data: {
      title: "AWS Cloud Practitioner",
      description: "Certificação fundamental em computação em nuvem AWS.",
      date: new Date("2023-06-01"),
      categoryId: catCert.id,
    },
  }).catch(() => {});

  await prisma.achievement.create({
    data: {
      title: "Melhor Projeto do Hackathon",
      description: "Primeiro lugar no hackathon interno da empresa com solução de IA.",
      date: new Date("2023-09-15"),
      categoryId: catPremio.id,
    },
  }).catch(() => {});

  await prisma.achievement.create({
    data: {
      title: "100k usuários ativos",
      description: "Produto que desenvolvi atingiu a marca de 100 mil usuários ativos.",
      date: new Date("2024-01-01"),
      categoryId: catConquista.id,
    },
  }).catch(() => {});

  // Posts
  await prisma.post.upsert({
    where: { slug: "hello-world" },
    update: {},
    create: {
      title: "Hello, World!",
      slug: "hello-world",
      content: `# Hello, World!

Bem-vindo ao meu blog. Este é o primeiro post do meu portfólio.

## O que vem por aí

Vou escrever sobre tecnologia, desenvolvimento de software e projetos pessoais.

Fique ligado!`,
      published: true,
    },
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
