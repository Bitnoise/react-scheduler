import dayjs from "dayjs";
import { getCols } from "./getCols";

export type DatesRange = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export type ParsedDatesRange = {
  startDate: Date;
  endDate: Date;
};

export const getDatesRange = (date: dayjs.Dayjs, zoom: number): DatesRange => {
  const colsOffset = getCols(zoom) / 2;
  const startDate =
    zoom === 0 ? date.subtract(colsOffset, "weeks") : date.subtract(colsOffset, "days");

  const endDate = zoom === 0 ? date.add(colsOffset, "weeks") : date.add(colsOffset, "days");

  return {
    startDate,
    endDate
  };
};

export const getParsedDatesRange = (date: dayjs.Dayjs, zoom: number): ParsedDatesRange => {
  const dates = getDatesRange(date, zoom);

  return {
    startDate: dates.startDate.toDate(),
    endDate: dates.endDate.toDate()
  };
};
