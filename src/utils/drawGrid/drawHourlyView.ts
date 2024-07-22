import dayjs from "dayjs";
import { Day } from "@/types/global";
import { boxHeight, zoom2ColumnWidth } from "@/constants";
import { getIsBusinessDay } from "../dates";
import { drawCell } from "./drawCell";

export const drawHourlyView = (ctx: CanvasRenderingContext2D, rows: number, cols: number) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let hour;

      if (j === Math.floor(cols / 2)) {
        hour = dayjs();
      } else if (j > Math.floor(cols / 2)) {
        // next hours
        hour = dayjs().add(j - Math.floor(cols / 2), "hours");
      } else {
        // previous hours
        hour = dayjs().subtract(Math.floor(cols / 2) - i, "hours");
      }

      const isCurrentHour = hour.isSame(dayjs(), "hour");

      drawCell(
        ctx,
        j * zoom2ColumnWidth + zoom2ColumnWidth / 2 - 0.5,
        i * boxHeight,
        zoom2ColumnWidth,
        getIsBusinessDay(hour),
        isCurrentHour
      );
    }
  }
};
