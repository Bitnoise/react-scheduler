import type { ComponentProps, FunctionComponent } from "react";

export type IconsNames =
  | "add"
  | "subtract"
  | "filter"
  | "arrowLeft"
  | "arrowRight"
  | "defaultAvatar"
  | "calendarWarning"
  | "calendarFree"
  | "arrowUp"
  | "arrowDown"
  | "search"
  | "close";

export type Icon = FunctionComponent<ComponentProps<"svg"> & { title?: string }>;
