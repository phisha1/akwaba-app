import Link from "next/link";
import { cn } from "@/lib/utils";

/** Akwaba Immo wordmark + house mark, matching the design's logo treatment. */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Akwaba Immo — accueil"
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl",
          light ? "bg-white/12" : "bg-brand-500",
        )}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 11 L12 5 L19 11 v8 h-5 v-5 h-4 v5 H5 z"
            fill={light ? "#ffffff" : "#ffffff"}
          />
          <rect x="9.5" y="14.5" width="5" height="4.5" rx="1" fill="#E0A33E" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[19px] font-extrabold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        Akwaba<span className="text-gold-400">Immo</span>
      </span>
    </Link>
  );
}
