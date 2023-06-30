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
  projStartDate: Date,
  projEndDate: Date,
  zoom: number
): TileProperties => {
  const y = row * boxHeight + headerHeight + navHeight + tileYOffset;
  const parsedProjStartDate = dayjs(projStartDate).hour(0).minute(0);
  const parsedProjEndDate = dayjs(projEndDate).hour(23).minute(59);
  if (zoom === 0) {
    const x = (parsedProjStartDate.diff(startDate, "day") + 1) * singleDayWidth;
    const width = (parsedProjEndDate.diff(parsedProjStartDate, "day") + 1) * singleDayWidth;
    return {
      x,
      y,
      width,
      height: tileHeight
    };
  } else {
    const x = (parsedProjStartDate.diff(startDate, "day") + 1) * dayWidth;
    const width = (parsedProjEndDate.diff(parsedProjStartDate, "day") + 1) * dayWidth;
    return {
      x,
      y,
      width,
      height: tileHeight
    };
  }
};
