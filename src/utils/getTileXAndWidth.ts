import { dayWidth, singleDayWidth } from "@/constants";
import { DatesRange } from "./getDatesRange";

export const getTileXAndWidth = (item: DatesRange, range: DatesRange, zoom: number) => {
  const x =
    (item.startDate.diff(range.startDate, "day") + 1) * (zoom === 0 ? singleDayWidth : dayWidth);
  if (item.startDate.isAfter(range.startDate) && item.endDate.isBefore(range.endDate)) {
    const width =
      item.endDate.diff(item.startDate, "day") * (zoom === 0 ? singleDayWidth : dayWidth);

    return { x, width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isBefore(range.endDate)) {
    const width =
      item.endDate.diff(range.startDate, "day") * (zoom === 0 ? singleDayWidth : dayWidth);

    return { x: 0, width };
  }

  if (item.startDate.isAfter(range.startDate) && item.endDate.isAfter(range.endDate)) {
    const width =
      range.endDate.diff(item.startDate, "day") * (zoom === 0 ? singleDayWidth : dayWidth);
    return { x, width };
  }

  if (item.startDate.isBefore(range.startDate) && item.endDate.isAfter(range.endDate)) {
    const width =
      range.endDate.diff(range.startDate, "day") * (zoom === 0 ? singleDayWidth : dayWidth);

    return { x: 0, width };
  }
  return { x: 0, width: 0 };
};
