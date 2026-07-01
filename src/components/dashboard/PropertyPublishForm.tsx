"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import {
  saveStoredProperty,
  getPropertyById,
  patchProperty,
} from "@/lib/demo-store";
import type { Transaction } from "@/lib/types";

const TYPES = ["Maison", "Appartement", "Studio", "Terrain", "Local commercial", "Chambre"];
const VILLES = ["Yaoundé", "Douala", "Bafoussam", "Kribi", "Bamenda", "Garoua"];

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-line px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/10";

export function PropertyPublishForm() {
  const router = useRouter();
  const params = useSearchParams();
  const editId = params.get("id");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Maison");
  const [transaction, setTransaction] = useState<Transaction>("vente");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("Yaoundé");
  const [neighborhood, setNeighborhood] = useState("");
  const [pieces, setPieces] = useState("3");
  const [surface, setSurface] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  // Edit mode: prefill from the stored/catalogue listing.
  useEffect(() => {
    if (!editId) return;
    const p = getPropertyById(editId);
    if (!p) return;
    setTitle(p.title);
    setType(p.type);
    setTransaction(p.transaction);
    setPrice(String(p.price));
    setCity(p.city);
    setNeighborhood(p.neighborhood);
    setPieces(p.pieces != null ? String(p.pieces) : "3");
    setSurface(String(p.surface));
    setDescription(p.description ?? "");
  }, [editId]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const draft = {
      title,
      type,
      transaction,
      price: Number(price),
      city,
      neighborhood,
      pieces: type === "Terrain" ? null : Number(pieces),
      surface: Number(surface),
      description,
    };

    if (editId) {
      patchProperty(editId, draft);
      setPublished(true);
      window.setTimeout(() => router.push("/tableau-de-bord"), 900);
      return;
    }

    const property = saveStoredProperty(draft);
    setPublished(true);
    window.setTimeout(() => {
      router.push(`/recherche?transaction=${property.transaction}&ville=${property.city}`);
    }, 900);
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-[900px]">
      <div className="mb-6 rounded-2xl border border-line bg-white p-6 shadow-card">
        <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-500">
          Front-only
        </span>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">
          {editId ? "Modifier le bien" : "Publier un bien"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {editId
            ? "Vos modifications sont enregistrées dans le navigateur pour la démo et se reflètent dans la recherche."
            : "Cette annonce sera enregistrée dans le navigateur pour la démo. Elle apparaîtra ensuite dans la recherche sans backend."}
        </p>
      </div>

      {published && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-success bg-success-bg p-4 text-sm font-bold text-success">
          <CheckCircle2 className="size-5" />
          {editId
            ? "Modifications enregistrées. Redirection vers le tableau de bord..."
            : "Bien publié. Redirection vers la recherche..."}
        </div>
      )}

      <div className="grid gap-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:grid-cols-2">
        <Field label="Titre du bien" className="sm:col-span-2">
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Appartement moderne à Bonamoussadi"
            required
          />
        </Field>

        <Field label="Type">
          <select
            className={inputClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>

        <Field label="Transaction">
          <div className="grid grid-cols-2 gap-2">
            {(["vente", "location"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTransaction(item)}
                className={`rounded-[10px] border-[1.5px] px-3 py-3 text-sm font-bold capitalize ${
                  transaction === item
                    ? "border-brand-500 bg-brand-50 text-brand-500"
                    : "border-line text-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Prix FCFA">
          <input
            type="number"
            min="1"
            className={inputClass}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="85000000"
            required
          />
        </Field>

        <Field label="Ville">
          <select
            className={inputClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {VILLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>

        <Field label="Quartier">
          <input
            className={inputClass}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Ex. Bastos"
            required
          />
        </Field>

        <Field label="Surface m²">
          <input
            type="number"
            min="1"
            className={inputClass}
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            placeholder="120"
            required
          />
        </Field>

        <Field label="Pièces">
          <input
            type="number"
            min="1"
            className={inputClass}
            value={pieces}
            onChange={(e) => setPieces(e.target.value)}
            disabled={type === "Terrain"}
          />
        </Field>

        <Field label="Description" className="sm:col-span-2">
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez le bien, son environnement et ses atouts."
            required
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-gold-400 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(224,163,62,0.28)] hover:bg-gold-500"
          >
            {editId ? "Enregistrer les modifications" : "Publier le bien"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}
