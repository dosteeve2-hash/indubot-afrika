import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Indubot Afrika — logiciel de gestion industrielle de l'écosystème Forge Afrika";

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
          backgroundColor: "#0A1628",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(212,175,55,0.16), transparent 45%), radial-gradient(circle at 80% 85%, rgba(0,188,212,0.14), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 6,
              color: "#00BCD4",
              textTransform: "uppercase",
            }}
          >
            Écosystème Forge Afrika
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            color: "#D4AF37",
            fontStyle: "italic",
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
          La gestion industrielle, automatisée
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 140,
            height: 4,
            backgroundColor: "#D4AF37",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
