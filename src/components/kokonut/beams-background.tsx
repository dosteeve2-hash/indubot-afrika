"use client";

/**
 * @author: @dorianbaffier
 * @description: Beams Background
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { mouvementReduit, surChangementDeMouvement } from "@/lib/mouvement";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number, isDarkMode: boolean): Beam {
  const angle = -35 + Math.random() * 10;
  const hueBase = isDarkMode ? 190 : 210;
  const hueRange = isDarkMode ? 70 : 50;

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: hueBase + Math.random() * hueRange,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function BeamsBackground({
  className,
  children,
  intensity = "strong",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;
  const isDarkModeRef = useRef<boolean>(true);
  const reduit = useReducedMotion() === true;

  const opacityMap = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Largeur et hauteur du repere de DESSIN, en pixels CSS. Le tampon du canevas fait
    // dpr fois cela, mais `ctx.scale(dpr, dpr)` ramene tout le dessin a cette echelle.
    // C'est donc ici qu'il faut placer les faisceaux — et c'est ce qui manquait :
    // `createBeam(canvas.width, …)` leur donnait des coordonnees du tampon dans un
    // repere dpr fois plus petit. Sur un telephone a dpr = 3, l'essentiel du fond
    // etait dessine hors de l'ecran, a droite et en dessous. Le defaut ne se voyait
    // pas sur un ecran a dpr = 1, c'est-a-dire sur la machine ou on developpe.
    const largeurDessin = () => window.innerWidth;
    const hauteurDessin = () => window.innerHeight;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Affecter canvas.width remet la transformation du contexte a l'identite :
      // le ctx.scale qui suit ne s'accumule donc pas d'un redimensionnement a l'autre.
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(largeurDessin(), hauteurDessin(), isDarkModeRef.current)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = largeurDessin() / 3;

      const hueBase = isDarkModeRef.current ? 190 : 210;
      const hueRange = isDarkModeRef.current ? 70 : 50;

      beam.y = hauteurDessin() + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = hueBase + (index * hueRange) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      const saturation = isDarkModeRef.current ? "85%" : "75%";
      const lightness = isDarkModeRef.current ? "65%" : "45%";

      gradient.addColorStop(
        0,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`
      );
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${
          pulsingOpacity * 0.5
        })`
      );
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${
          pulsingOpacity * 0.5
        })`
      );
      gradient.addColorStop(
        1,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    /** Une image. `avancer` a false : on dessine sans faire bouger les faisceaux. */
    function dessiner(avancer: boolean) {
      if (!(canvas && ctx)) return;

      ctx.clearRect(0, 0, largeurDessin(), hauteurDessin());
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        if (avancer) {
          beam.y -= beam.speed;
          beam.pulse += beam.pulseSpeed;
          if (beam.y + beam.length < -100) {
            resetBeam(beam, index, totalBeams);
          }
        }
        drawBeam(ctx, beam);
      });
    }

    function animate() {
      dessiner(true);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    function demarrer() {
      if (animationFrameRef.current) return;
      animate();
    }

    function arreter() {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
      // Une seule image fixe plutot qu'un aplat : sous « reduire les animations », le
      // fond garde son dessin, il cesse simplement de bouger. Supprimer l'image
      // laisserait un rectangle vide a la place du decor de la page d'accueil.
      dessiner(false);
    }

    if (mouvementReduit()) arreter();
    else demarrer();

    const desabonner = surChangementDeMouvement((reduit) => {
      if (reduit) arreter();
      else demarrer();
    });

    return () => {
      desabonner();
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      }
    };
  }, [intensity]);

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-navy",
        className
      )}
    >
      <canvas
        className="absolute inset-0"
        ref={canvasRef}
        style={{ filter: "blur(15px)" }}
      />

      {/* Motion ne coupe pas de lui-meme une animation infinie : son reglage
          automatique n'est actif que sous <MotionConfig reducedMotion="user">, absent
          ici. Sans ce test, la pulsation continuait indefiniment. */}
      <motion.div
        animate={reduit ? { opacity: 0.1 } : { opacity: [0.05, 0.15, 0.05] }}
        className="absolute inset-0 bg-navy/20"
        style={{
          backdropFilter: "blur(50px)",
        }}
        transition={
          reduit
            ? { duration: 0 }
            : { duration: 10, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
        }
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
