import Link from "next/link";
import { cn } from "@/lib/utils";

/** Akwaba Immo wordmark + house mark, matching the maquette's logo treatment. */
export function Logo({
  className,
  light = false,
  size = 36,
}: {
  className?: string;
  light?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Akwaba Immo — accueil"
    >
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect width="36" height="36" rx="8" fill={light ? "rgba(255,255,255,.12)" : "#0E4D5C"} />
        <path d="M18 8L6 18h4v10h6v-7h4v7h6V18h4z" fill="white" />
        <rect x="15" y="22" width="6" height="6" rx="1" fill="#E0A33E" />
      </svg>
      <span
        className={cn(
          "text-xl font-extrabold tracking-[-0.5px]",
          light ? "text-white" : "text-brand-500",
        )}
      >
        Akwaba<span className="text-gold-400">Immo</span>
      </span>
    </Link>
  );
}
