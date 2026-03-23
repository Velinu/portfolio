export type Profile = {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string | null;
  github: string | null;
  linkedin: string | null;
  email: string | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techs: string[];
  url: string | null;
  repoUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  createdAt: Date;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: { id: string; name: string; slug: string };
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
};
