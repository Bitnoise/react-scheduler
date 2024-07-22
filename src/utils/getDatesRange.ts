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
  console.log("DATE", date);
  // const startDate =
  //   zoom === 0 ? date.subtract(colsOffset, "weeks") : date.subtract(colsOffset, "days");
  let startDate;
  switch (zoom) {
    case 1: {
      startDate = date.subtract(colsOffset, "days");
      break;
    }
    case 2: {
      startDate = date.subtract(colsOffset, "hours");
      break;
    }
    default: {
      startDate = date.subtract(colsOffset, "weeks");
      break;
    }
  }

  // const endDate = zoom === 0 ? date.add(colsOffset, "weeks") : date.add(colsOffset, "days");
  let endDate;
  switch (zoom) {
    case 1: {
      endDate = date.add(colsOffset, "days");
      break;
    }
    case 2: {
      endDate = date.add(colsOffset * 2, "hours");
      break;
    }
    default: {
      endDate = date.add(colsOffset, "weeks");
      break;
    }
  }

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
