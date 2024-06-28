import { outsideWrapperId, leftColumnWidth, screenWidthMultiplier } from "@/constants";

export const getCanvasWidth = () => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const width = (wrapperWidth - leftColumnWidth) * screenWidthMultiplier;
  return width;
};
