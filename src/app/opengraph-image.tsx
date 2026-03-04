import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ziweiastrology.ai — Decode Your Reality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)",
          position: "relative",
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

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Star symbol */}
          <div
            style={{
              fontSize: "64px",
              color: "#c9a84c",
              display: "flex",
            }}
          >
            *
          </div>

          {/* Site name */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            ziweiastrology.ai
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              color: "#c9a84c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Decode Your Reality
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "18px",
              color: "#a89cc8",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
