import {
  weekWidth,
  dayWidth,
  outsideWrapperId,
  leftColumnWidth,
  screenWidthMultiplier,
  zoom2ColumnWidth
} from "@/constants";

export const getCols = (zoom: number) => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const componentWidth = wrapperWidth - leftColumnWidth;

  switch (zoom) {
    case 1:
      return Math.ceil(componentWidth / dayWidth) * screenWidthMultiplier;
    case 2:
      return Math.ceil(componentWidth / zoom2ColumnWidth) * screenWidthMultiplier;
    default:
      return Math.ceil(componentWidth / weekWidth) * screenWidthMultiplier;
  }
};

export const getVisibleCols = (zoom: number) => getCols(zoom) / screenWidthMultiplier;
