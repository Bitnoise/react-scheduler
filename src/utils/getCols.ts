import { weekWidth, screenWidthMultiplier, dayWidth } from "@/constants";

export const getCols = (zoom: number) =>
  zoom === 0
    ? Math.ceil(window.innerWidth / weekWidth) * screenWidthMultiplier
    : Math.ceil(window.innerWidth / dayWidth) * screenWidthMultiplier;
