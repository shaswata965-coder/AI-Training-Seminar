"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/** Asks the trainers grid on the page (TrainersView) to open a trainer's profile. */
export const OPEN_TRAINER_EVENT = "trainer:open";

/** A button that opens a trainer's full profile in the trainers grid's pop-up. */
export function OpenProfileButton({ slug, children, icon }: { slug: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <Button onClick={() => window.dispatchEvent(new CustomEvent<string>(OPEN_TRAINER_EVENT, { detail: slug }))} icon={icon} aria-haspopup="dialog">
      {children}
    </Button>
  );
}
