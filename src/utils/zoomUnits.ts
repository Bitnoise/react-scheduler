import dayjs from "dayjs";
import { weekWidth, zoom2ColumnWidth } from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";

export const getCellWidth = (zoom: number): number => {
  switch (zoom) {
    case 0:
      return weekWidth;
    case 2:
      return zoom2ColumnWidth;
    default:
      return getDayWidth();
  }
};

export const getCellTimeUnit = (zoom: number): dayjs.ManipulateType => {
  switch (zoom) {
    case 0:
      return "weeks";
    case 2:
      return "hours";
    default:
      return "days";
  }
};
