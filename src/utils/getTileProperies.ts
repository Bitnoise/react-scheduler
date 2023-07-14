import dayjs from "dayjs";
import {
  boxHeight,
  dayWidth,
  headerHeight,
  navHeight,
  singleDayWidth,
  tileHeight,
  tileYOffset
} from "@/constants";
import { TileProperties } from "@/types/global";

export const getTileProperties = (
  row: number,
  startDate: dayjs.Dayjs,
  resourceStartDate: Date,
  resourceEndDate: Date,
  zoom: number
): TileProperties => {
  const y = row * boxHeight + headerHeight + navHeight + tileYOffset;
  const parsedResourceStartDate = dayjs(resourceStartDate).hour(0).minute(0);
  const parsedResourceEndDate = dayjs(resourceEndDate).hour(23).minute(59);
  if (zoom === 0) {
    const x = (parsedResourceStartDate.diff(startDate, "day") + 1) * singleDayWidth;
    const width = parsedResourceEndDate.diff(parsedResourceStartDate, "day") * singleDayWidth;
    return {
      x,
      y,
      width,
      height: tileHeight
    };
  } else {
    const x = (parsedResourceStartDate.diff(startDate, "day") + 1) * dayWidth;
    const width = (parsedResourceEndDate.diff(parsedResourceStartDate, "day") + 1) * dayWidth;
    return {
      x,
      y,
      width,
      height: tileHeight
    };
  }
};
