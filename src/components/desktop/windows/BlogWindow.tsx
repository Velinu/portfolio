"use client";

import { useState } from "react";
import { Post } from "@/lib/types";

export function BlogWindow({ posts }: { posts: Post[] }) {
  const [currentPath, setCurrentPath] = useState("C:\\MyWebsite\\blog");
  const [openPost, setOpenPost] = useState<Post | null>(null);

  function openPostPage(post: Post) {
    setOpenPost(post);
    setCurrentPath(`C:\\MyWebsite\\blog\\${post.slug}.html`);
  }

  function goBack() {
    setOpenPost(null);
    setCurrentPath("C:\\MyWebsite\\blog");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* IE6 toolbar */}
      <div
        className="w2k-raised"
        style={{
          padding: "2px 4px",
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexShrink: 0,
          background: "var(--w2k-surface)",
          flexWrap: "wrap",
        }}
      >
        <button className="w2k-btn" onClick={goBack} style={{ minWidth: "auto", padding: "1px 6px", fontSize: 11 }} title="Back">
          ◀ Back
        </button>
        <button className="w2k-btn" style={{ minWidth: "auto", padding: "1px 6px", fontSize: 11 }} title="Forward" disabled>
          Forward ▶
        </button>
        <button className="w2k-btn" style={{ minWidth: "auto", padding: "1px 6px", fontSize: 11 }} title="Refresh">
          🔄
        </button>
        <button className="w2k-btn" style={{ minWidth: "auto", padding: "1px 6px", fontSize: 11 }} title="Home">
          🏠
        </button>
        <div className="w2k-separator" style={{ width: 1, height: 20 }} />

        {/* Address bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          <span style={{ fontSize: 11, flexShrink: 0 }}>Address:</span>
          <div
            className="w2k-sunken"
            style={{ flex: 1, padding: "1px 4px", background: "#fff", fontSize: 11, fontFamily: "monospace" }}
          >
            {currentPath}
          </div>
          <button className="w2k-btn" style={{ minWidth: "auto", padding: "1px 8px", fontSize: 11 }}>
            Go
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="w2k-selectable"
        style={{ flex: 1, overflow: "auto", background: "#fff", padding: 16 }}
      >
        {!openPost ? (
          <PostList posts={posts} onOpen={openPostPage} />
        ) : (
          <PostContent post={openPost} onBack={goBack} />
        )}
      </div>

      {/* Status bar */}
      <div
        className="w2k-sunken"
        style={{ padding: "1px 6px", fontSize: 10, color: "#444", flexShrink: 0, display: "flex", justifyContent: "space-between" }}
      >
        <span>{openPost ? "Page loaded" : `${posts.length} post(s) available`}</span>
        <span>Internet</span>
      </div>
    </div>
  );
}

function PostList({ posts, onOpen }: { posts: Post[]; onOpen: (post: Post) => void }) {
  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 24, color: "#666" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🌐</div>
        <div>No posts published yet.</div>
        <div style={{ fontSize: 10, color: "#999", marginTop: 4 }}>
          The page cannot be displayed.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: 18, borderBottom: "2px solid #000080", paddingBottom: 6, marginBottom: 16 }}>
        📰 Blog
      </h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: 16,
            padding: "8px 0",
            borderBottom: "1px dotted #ccc",
          }}
        >
          <button
            onClick={() => onOpen(post)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontSize: 14,
              fontWeight: "bold",
              color: "#000080",
              textDecoration: "underline",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {post.title}
          </button>
          <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
            {new Date(post.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
        </div>
      ))}
    </div>
  );
}

function PostContent({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#000080",
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: 11,
          fontFamily: "inherit",
          marginBottom: 16,
          padding: 0,
        }}
      >
        ◀ Back to blog
      </button>

      <h1 style={{ fontSize: 20, borderBottom: "2px solid #000080", paddingBottom: 6, marginBottom: 8 }}>
        {post.title}
      </h1>
      <div style={{ fontSize: 10, color: "#666", marginBottom: 16 }}>
        Published on {new Date(post.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}
      </div>

      {/* Render markdown as plain text (Phase 3 - simple render) */}
      <div
        style={{ fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#333" }}
      >
        {post.content.replace(/#{1,6} /g, "").replace(/\*\*/g, "")}
      </div>
    </div>
  );
}
