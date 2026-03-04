import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function OgImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  const title = post
    ? post.title.length > 80
      ? post.title.slice(0, 77) + "..."
      : post.title
    : "Blog Post";

  const author = post?.author ?? "ziweiastrology.ai";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Gold border */}
        <div
          style={{
            position: "absolute",
            inset: "12px",
            border: "2px solid #c9a84c",
            borderRadius: "8px",
            display: "flex",
          }}
        />

        {/* Top: site branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "auto",
          }}
        >
          <div style={{ fontSize: "28px", color: "#c9a84c", display: "flex" }}>
            *
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#a89cc8",
              fontWeight: 600,
              display: "flex",
            }}
          >
            ziweiastrology.ai
          </div>
        </div>

        {/* Center: post title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? "40px" : "48px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              maxWidth: "1000px",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: author + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
          }}
        >
          <div style={{ fontSize: "20px", color: "#c9a84c", display: "flex" }}>
            {author}
          </div>
          {date && (
            <div
              style={{ fontSize: "20px", color: "#a89cc8", display: "flex" }}
            >
              {date}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
