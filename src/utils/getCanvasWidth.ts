import { outsideWrapperId, screenWidthMultiplier } from "@/constants";
import { getLeftColumnWidth } from "./getLeftColumnWidth";

export const getCanvasWidth = (): number => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;

  return (wrapperWidth - getLeftColumnWidth()) * screenWidthMultiplier;
};
