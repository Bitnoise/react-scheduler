import { minutesInHour, singleDayWidth, zoom2ColumnWidth } from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";
import { DatesRange } from "./getDatesRange";

export const getTileXAndWidth = (
  item: DatesRange,
  range: DatesRange,
  zoom: number
): { x: number; width: number } => {
  let cellWidth: number;
  switch (zoom) {
    case 0:
      cellWidth = singleDayWidth;
      break;
    case 2:
      cellWidth = zoom2ColumnWidth;
      break;
    default:
      cellWidth = getDayWidth();
  }
  const getX = () => {
    let position;
    switch (zoom) {
      case 2:
        position =
          (item.startDate.diff(range.startDate, "minute") / minutesInHour + 1) * cellWidth -
          cellWidth / 2;
        break;
      default: {
        // floor rather than truncate: an item starting a few hours before the range start
        // (same day) must land on the previous column, not on the first one
        position =
          (Math.floor(item.startDate.diff(range.startDate, "day", true)) + 1) * cellWidth;
      }
    }
    return Math.max(0, position);
  };

  if (item.startDate.isAfter(range.startDate) && item.endDate.isBefore(range.endDate)) {
    let width;
    switch (zoom) {
      case 2:
        width = (item.endDate.diff(item.startDate, "minute") / minutesInHour) * cellWidth;
        break;
      default:
        width = item.endDate.diff(item.startDate, "day") * cellWidth + cellWidth;
    }

    return { x: getX(), width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isBefore(range.endDate)) {
    let width;
    switch (zoom) {
      case 2:
        width =
          (item.endDate.diff(range.startDate, "minute") / minutesInHour) * cellWidth +
          0.5 * cellWidth;
        break;
      default:
        width = item.endDate.diff(range.startDate, "day") * cellWidth + cellWidth;
    }

    return { x: getX(), width };
  }

  if (item.startDate.isAfter(range.startDate) && item.endDate.isAfter(range.endDate)) {
    let width;
    switch (zoom) {
      case 2:
        width = (range.endDate.diff(item.startDate, "minute") / minutesInHour) * cellWidth;
        break;
      default:
        width = range.endDate.diff(item.startDate, "day") * cellWidth + cellWidth;
    }

    return { x: getX(), width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isAfter(range.endDate)) {
    let width;
    switch (zoom) {
      case 2:
        width = (range.endDate.diff(range.startDate, "minute") / minutesInHour) * cellWidth;
        break;
      default:
        width = range.endDate.diff(range.startDate, "day") * cellWidth + cellWidth;
    }

    return { x: getX(), width };
  }
  return { x: getX(), width: 0 };
};
