import type { ComponentProps, FunctionComponent } from "react";

export type IconsNames = "add" | "substract" | "filter" | "arrowLeft" | "arrowRight";

export type Icon = FunctionComponent<ComponentProps<"svg"> & { title?: string }>;
