import {
  weekWidth,
  outsideWrapperId,
  screenWidthMultiplier,
  zoom2ColumnWidth
} from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";
import { getLeftColumnWidth } from "./getLeftColumnWidth";

export const getCols = (zoom: number): number => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const componentWidth = wrapperWidth - getLeftColumnWidth();
  let ceiledValue = 0;

  switch (zoom) {
    case 1:
      return Math.ceil(componentWidth / getDayWidth()) * screenWidthMultiplier;
    case 2:
      return Math.ceil(componentWidth / zoom2ColumnWidth) * screenWidthMultiplier;
    default:
      ceiledValue = Math.ceil((componentWidth / weekWidth) * screenWidthMultiplier);
      return ceiledValue % 2 === 0 ? ceiledValue : ceiledValue + 1;
  }
};

export const getVisibleCols = (zoom: number): number => getCols(zoom) / screenWidthMultiplier;
