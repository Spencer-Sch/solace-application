/* =============================
 * Original project code pattern
 * ========================== */

import { SquaresFour, MapTrifold, Storefront } from "@phosphor-icons/react";

// sufix of "1" in variable names is used to avoid duplicate variable name declarations in this file
export const routeNamesMap1 = new Map([
  ["dashboard", { label: "Dashboard", path: "/dashboard", icon: SquaresFour }],
  ["map", { label: "Map", path: "/map", icon: MapTrifold }],
  [
    "marketplace",
    { label: "Marketplace", path: "/marketplace", icon: Storefront },
  ],
]);

export const routeNamesArr1 = Array.from(
  routeNamesMap1,
  ([key, { label, path, icon }]) => ({
    path,
    label,
    icon,
  }),
);

/* ========================================
 * Recently discoved improvement to pattern
 * ===================================== */

import { Icon } from "phosphor-react";

type RouteInfo = {
  label: string;
  path: string;
  icon: Icon;
};

const ROUTE_DATA = {
  dashboard: {
    label: "Dashboard",
    path: "/dashboard",
    icon: SquaresFour,
  },
  map: {
    label: "Map",
    path: "/map",
    icon: MapTrifold,
  },
  marketplace: {
    label: "Marketplace",
    path: "/marketplace",
    icon: Storefront,
  },
} as const;

export type RouteName = keyof typeof ROUTE_DATA;

export const ROUTES: Record<RouteName, RouteInfo> = ROUTE_DATA;

// sufix of "2" in variable names is used to avoid duplicate variable name declarations in this file
export const routeNamesMap2 = new Map(Object.entries(ROUTE_DATA)) as Map<
  RouteName,
  RouteInfo
>;

export const routeNamesArr2 = Object.values(ROUTE_DATA);
