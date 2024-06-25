import {
  weekWidth,
  dayWidth,
  outsideWrapperId,
  leftColumnWidth,
  screenWidthMultiplier
} from "@/constants";

export const getCols = (zoom: number) => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const componentWidth = wrapperWidth - leftColumnWidth;
  const visibleCols =
    zoom === 0 ? Math.ceil(componentWidth / weekWidth) : Math.ceil(componentWidth / dayWidth);

  return visibleCols * screenWidthMultiplier;
};

export const getVisibleCols = (zoom: number) => getCols(zoom) / screenWidthMultiplier;
