import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Indubot Afrika, vitrine de pré-lancement et démonstration en développement";

export default function OpengraphImage() {
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
          backgroundColor: "#14161F",
          backgroundImage:
            "radial-gradient(circle at 78% 48%, rgba(109,63,240,0.18), transparent 38%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              color: "#B7A5FF",
              textTransform: "uppercase",
            }}
          >
            Écosystème Forge Afrika
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 600,
            color: "#F0EFF7",
          }}
        >
          Indubot Afrika
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#F5F0E8",
            maxWidth: 880,
            textAlign: "center",
          }}
        >
          Sachez en temps réel quelle machine s&apos;arrête, et pourquoi.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 184,
            height: 3,
            backgroundColor: "#6D3FF0",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
