# Design: About Me — Windows 2000 Edition

**Data:** 2026-03-22

## Visão Geral

Página pessoal pública com painel admin protegido. A experiência visual simula uma área de trabalho do Windows 2000 no desktop e um Windows Mobile/PocketPC no celular.

---

## Stack

- **Framework:** Next.js 14 (App Router) — frontend + API Routes + Server Actions
- **Banco de dados:** PostgreSQL via Neon (serverless)
- **ORM:** Prisma
- **Autenticação:** NextAuth.js (Google OAuth + email/senha)
- **Estilização:** Tailwind CSS + estilos customizados para o tema W2K
- **Hospedagem:** Vercel

---

## Design — Desktop (1024px+)

### Área de Trabalho
- Wallpaper configurável (placeholder inicial)
- Ícones no desktop que abrem janelas arrastáveis:
  - `Sobre Mim` — bio, foto, redes sociais
  - `Meus Projetos` — explorador de pastas com projetos
  - `Experiência.doc` — timeline de carreira
  - `Conquistas` — lista com filtro por categoria
  - `Blog.exe` — lista de posts
  - `Contato` — formulário estilo dialog box

### Janelas
- Chrome W2K: barra de título azul com gradiente, botões minimize/maximize/close, bordas biseladas (efeito 3D)
- Conteúdo interno full retro: fonte Tahoma, ícones clássicos, layout de explorador de arquivos
- Janelas arrastáveis e redimensionáveis
- Z-index gerenciado (janela clicada vai para frente)

### Blog
- Simula Internet Explorer 6
- Barra de endereço mostrando `C:\MeuSite\blog\[slug].html`
- Botões de navegação (voltar, avançar, atualizar) — decorativos

### Taskbar
- **Start Menu** funcional:
  - Lista de todas as seções
  - "Sobre este computador" → abre janela com bio resumida
  - "Desligar" → dialog box divertida
- **Janelas abertas** aparecem na taskbar (clique minimiza/restaura)
- **Relógio** com hora real do visitante (canto direito)

---

## Design — Mobile (até 768px)

Simula **Windows Mobile / PocketPC**:
- Barra de status no topo (hora, bateria, sinal — decorativos)
- Navegação por abas na base
- Janelas adaptadas para tela pequena
- Mesma paleta de cores e tipografia retro

---

## Modelo de Dados

```prisma
model Profile {
  id        String  @id @default(cuid())
  name      String
  bio       String
  avatarUrl String?
  github    String?
  linkedin  String?
  email     String?
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  techs       String[]
  url         String?
  repoUrl     String?
  imageUrl    String?
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model AchievementCategory {
  id           String        @id @default(cuid())
  name         String        @unique
  slug         String        @unique
  achievements Achievement[]
}

model Achievement {
  id          String              @id @default(cuid())
  title       String
  description String
  date        DateTime
  categoryId  String
  category    AchievementCategory @relation(fields: [categoryId], references: [id])
}

model Experience {
  id          String    @id @default(cuid())
  company     String
  role        String
  description String
  startDate   DateTime
  endDate     DateTime?
  current     Boolean   @default(false)
}

model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## Rotas

### Vitrine Pública
```
/                        # Desktop W2K (home)
/projects/[slug]         # Detalhe de projeto (abre em janela)
/blog/[slug]             # Post no estilo IE6
/contact                 # Formulário de contato
```

### Painel Admin (protegido)
```
/admin                   # Dashboard
/admin/profile           # Editar perfil
/admin/projects          # CRUD projetos
/admin/experience        # CRUD experiências
/admin/achievements      # CRUD conquistas
/admin/achievements/categories  # CRUD categorias
/admin/posts             # CRUD posts (editor Markdown)
```

---

## Paleta de Cores W2K

| Elemento | Cor |
|---|---|
| Desktop background | `#008080` (teal padrão W2K) |
| Janela — barra de título ativa | gradiente `#000080` → `#1084d0` |
| Janela — barra de título inativa | gradiente `#808080` → `#b5b5b5` |
| Corpo das janelas | `#d4d0c8` |
| Botões | `#d4d0c8` com bevel 3D |
| Texto | `#000000` |
| Fonte principal | `Tahoma, Arial, sans-serif` |

---

## Fases de Implementação

### Fase 1 — Fundação
- Setup Next.js + Prisma + Neon + NextAuth
- Migrations do banco de dados
- Autenticação (Google + email/senha)

### Fase 2 — Sistema de Janelas W2K
- Componente `Window` arrastável (react-draggable)
- Desktop com ícones
- Taskbar + Start Menu
- Gerenciamento de z-index e estado das janelas

### Fase 3 — Conteúdo Público
- Janelas: Sobre Mim, Projetos, Experiência, Conquistas
- Blog estilo IE6
- Formulário de Contato

### Fase 4 — Painel Admin
- Dashboard
- CRUD de todas as entidades
- Editor Markdown para posts

### Fase 5 — Mobile (Windows Mobile)
- Layout responsivo PocketPC
- Adaptação das janelas para mobile

### Fase 6 — Polimento
- Wallpaper configurável
- Easter eggs (sons W2K, dialog de desligar)
- SEO e performance
- Deploy Vercel
