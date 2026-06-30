"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/lib/types";
import { shortPrice } from "@/lib/geo";

function pricePill(price: number, active: boolean): L.DivIcon {
  const bg = active ? "#E0A33E" : "#0E4D5C";
  return L.divIcon({
    className: "",
    html: `<div style="background:${bg};color:#fff;padding:5px 10px;border-radius:20px;font:600 11px 'Plus Jakarta Sans',sans-serif;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid #fff;line-height:1;">${shortPrice(price)}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function SearchMap({
  properties,
  center,
  activeId,
  onActivate,
  onDeactivate,
}: {
  properties: Property[];
  center: { lat: number; lng: number };
  activeId: string | null;
  onActivate?: (id: string) => void;
  onDeactivate?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Initialise the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current).setView([center.lat, center.lng], 12);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rebuild markers when the result set or city changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const bounds = L.latLngBounds([]);
    properties.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], {
        icon: pricePill(p.price, p.id === activeId),
      }).addTo(map);
      marker.bindPopup(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif;padding:4px 0"><b style="font-size:13px;color:#1E2A30">${p.title}</b><br><span style="font-size:12px;color:#6B7280">${p.neighborhood}, ${p.city}</span></div>`,
      );
      marker.on("mouseover", () => onActivate?.(p.id));
      marker.on("mouseout", () => onDeactivate?.());
      markersRef.current[p.id] = marker;
      bounds.extend([p.lat, p.lng]);
    });

    if (properties.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    } else {
      map.setView([center.lat, center.lng], 12);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, center.lat, center.lng]);

  // Highlight the active marker.
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const p = properties.find((x) => x.id === id);
      if (p) marker.setIcon(pricePill(p.price, id === activeId));
      marker.setZIndexOffset(id === activeId ? 1000 : 0);
    });
  }, [activeId, properties]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
