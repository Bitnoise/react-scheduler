import dayjs from "dayjs";
import { Day } from "@/types/global";
import { boxHeight, zoom2ColumnWidth } from "@/constants";
import { getIsBusinessDay } from "../dates";
import { drawCell } from "./drawCell";

export const drawHourlyView = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  startDate: Day
) => {
  for (let i = 0; i < rows; i++) {
    for (let y = 0; y <= cols; y++) {
      const date = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
        y,
        "hours"
      );

      const isCurrentDay = date.isSame(dayjs(), "day");

      drawCell(
        ctx,
        y * zoom2ColumnWidth,
        i * boxHeight,
        zoom2ColumnWidth,
        getIsBusinessDay(date),
        isCurrentDay
      );
    }
  }
};
