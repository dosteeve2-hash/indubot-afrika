"use client";

import { motion, useMotionValue, useTransform, type Variants } from "motion/react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  metric: { value: string; label: string };
  accent: "gold" | "cyan" | "green";
  className: string;
}

const features: FeatureItem[] = [
  {
    id: "production",
    icon: Factory,
    title: "Suivi de production",
    description:
      "Cadence, volumes et rendement de chaque ligne de production, mis à jour en temps réel.",
    metric: { value: "970", label: "unités / jour" },
    accent: "gold",
    className: "md:col-span-2",
  },
  {
    id: "machines",
    icon: Activity,
    title: "Monitoring machines",
    description:
      "Utilisation, uptime et santé de chaque machine sur l'ensemble du parc industriel.",
    metric: { value: "94.6%", label: "taux d'uptime" },
    accent: "cyan",
    className: "md:col-span-1",
  },
  {
    id: "alertes",
    icon: AlertTriangle,
    title: "Alertes intelligentes",
    description:
      "Détection anticipée des anomalies machines avant qu'elles ne deviennent des pannes.",
    metric: { value: "3", label: "alertes actives" },
    accent: "cyan",
    className: "md:col-span-1",
  },
  {
    id: "rapports",
    icon: BarChart3,
    title: "Rapports automatiques",
    description:
      "Rapports de rendement générés automatiquement, exportables pour vos équipes et investisseurs.",
    metric: { value: "87.1%", label: "rendement global" },
    accent: "gold",
    className: "md:col-span-2",
  },
];

const accentClasses: Record<FeatureItem["accent"], string> = {
  gold: "text-gold bg-gold/10 group-hover:bg-gold/15",
  cyan: "text-cyan bg-cyan/10 group-hover:bg-cyan/15",
  green: "text-green bg-green/10 group-hover:bg-green/15",
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function FeatureCard({ item }: { item: FeatureItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={cn("group relative h-full", item.className)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
    >
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-navy-2/60 p-6 backdrop-blur-sm transition-colors duration-300 group-hover:border-border-2">
        <div
          className="flex flex-col gap-4"
          style={{ transform: "translateZ(24px)" }}
        >
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
              accentClasses[item.accent]
            )}
          >
            <item.icon className="h-5 w-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif text-xl italic text-text">{item.title}</h3>
            <p className="text-sm leading-relaxed text-text-2">
              {item.description}
            </p>
          </div>
        </div>
        <div
          className="flex items-baseline gap-2 border-t border-border pt-4 font-mono"
          style={{ transform: "translateZ(24px)" }}
        >
          <span className="text-2xl font-semibold text-text">
            {item.metric.value}
          </span>
          <span className="text-xs uppercase tracking-wide text-text-3">
            {item.metric.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-3"
      initial="hidden"
      variants={staggerContainer}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
    >
      {features.map((item) => (
        <FeatureCard item={item} key={item.id} />
      ))}
    </motion.div>
  );
}
