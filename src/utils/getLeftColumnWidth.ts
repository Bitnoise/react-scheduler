import { leftColumnWidth, mobileLeftColumnWidth, mobileMediaQuery } from "@/constants";

export const isMobileViewport = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(mobileMediaQuery).matches;

export const getLeftColumnWidth = (): number =>
  isMobileViewport() ? mobileLeftColumnWidth : leftColumnWidth;
