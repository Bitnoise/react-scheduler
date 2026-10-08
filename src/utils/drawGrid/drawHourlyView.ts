import dayjs from "dayjs";
import { Day } from "@/types/global";
import { getCanvasColors, Theme } from "@/styles";
import { boxHeight, zoom2ColumnWidth } from "@/constants";
import { getIsBusinessDay } from "../dates";
import { drawCell } from "./drawCell";

const workingHours = { start: 8, end: 19 };

export const drawHourlyView = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  startDate: Day,
  theme: Theme
): void => {
  const startDateHour = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  );
  const height = rows * boxHeight;

  for (let j = 0; j <= cols; j++) {
    const hour = startDateHour.add(j, "hours");
    const x = j * zoom2ColumnWidth + zoom2ColumnWidth / 2 - 0.5; // -0.5 to align borders with the hour axis
    const isOffHours = hour.hour() < workingHours.start || hour.hour() >= workingHours.end;

    // nights are shaded more lightly than weekends
    if (isOffHours && getIsBusinessDay(hour)) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = getCanvasColors(theme).weekend;
      ctx.fillRect(x, 0, zoom2ColumnWidth, height);
      ctx.restore();
    }

    for (let i = 0; i < rows; i++) {
      drawCell(
        ctx,
        x,
        i * boxHeight,
        zoom2ColumnWidth,
        getIsBusinessDay(hour),
        hour.isSame(dayjs(), "hour"),
        theme
      );
    }
  }
};
