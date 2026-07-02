"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/demo-store";

/** Heart toggle that persists a listing in the buyer's favourites. */
export function FavoriteButton({
  propertyId,
  className = "",
  iconClassName = "size-[18px]",
}: {
  propertyId: string;
  className?: string;
  iconClassName?: string;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFav(isFavorite(propertyId));
    }, 0);
    return () => window.clearTimeout(id);
  }, [propertyId]);

  return (
    <button
      type="button"
      onClick={() => setFav(toggleFavorite(propertyId))}
      aria-pressed={fav}
      aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={className}
    >
      <Heart
        className={`${iconClassName} ${fav ? "fill-[#EF4444] text-[#EF4444]" : ""}`}
      />
    </button>
  );
}
