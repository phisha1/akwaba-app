"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "",
  html: `<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#0E4D5C;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);transform:rotate(-45deg);"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

export function DetailMap({ lat, lng }: { lat: number; lng: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([lat, lng], 14);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);
    L.marker([lat, lng], { icon: pin }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  return <div ref={containerRef} className="h-72 w-full" />;
}
