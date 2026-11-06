"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AuraBadge } from "@/components/aura/Aura";

/**
 * Aura wears the DIU badge on every page but the home page, whose hero already shows the
 * university's building and sign behind him. Covers the whole page, header and footer included.
 */
export function AuraBadgeByPage({ children }: { children: ReactNode }) {
  return <AuraBadge wear={usePathname() !== "/"}>{children}</AuraBadge>;
}
