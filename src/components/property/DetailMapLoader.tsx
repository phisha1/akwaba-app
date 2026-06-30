"use client";

import dynamic from "next/dynamic";

const DetailMap = dynamic(
  () => import("./DetailMap").then((m) => m.DetailMap),
  {
    ssr: false,
    loading: () => <div className="h-72 w-full animate-pulse bg-surface-cool" />,
  },
);

export function DetailMapLoader(props: { lat: number; lng: number }) {
  return <DetailMap {...props} />;
}
