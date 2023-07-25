import { dayWidth, singleDayWidth } from "@/constants";
import { DatesRange } from "./getDatesRange";

export const getTileXAndWidth = (item: DatesRange, range: DatesRange, zoom: number) => {
  const cellWidth = zoom === 0 ? singleDayWidth : dayWidth;

  const getX = () => {
    const position = (item.startDate.diff(range.startDate, "day") + 1) * cellWidth;
    return Math.max(0, position);
  };

  if (item.startDate.isAfter(range.startDate) && item.endDate.isBefore(range.endDate)) {
    const width = item.endDate.diff(item.startDate, "day") * cellWidth + cellWidth;

    return { x: getX(), width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isBefore(range.endDate)) {
    const width = item.endDate.diff(range.startDate, "day") * cellWidth + cellWidth;

    return { x: getX(), width };
  }

  if (item.startDate.isAfter(range.startDate) && item.endDate.isAfter(range.endDate)) {
    const width = range.endDate.diff(item.startDate, "day") * cellWidth + cellWidth;
    return { x: getX(), width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isAfter(range.endDate)) {
    const width = range.endDate.diff(range.startDate, "day") * cellWidth + cellWidth;

    return { x: getX(), width };
  }
  return { x: getX(), width: 0 };
};
