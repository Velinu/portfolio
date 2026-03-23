import { prisma } from "@/lib/prisma";
import { PostsAdmin } from "./PostsAdmin";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 13, borderBottom: "1px solid var(--w2k-mid-dark)", paddingBottom: 4 }}>
        📝 Posts do Blog
      </div>
      <PostsAdmin posts={posts} />
    </div>
  );
}
