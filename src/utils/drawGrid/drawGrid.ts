import dayjs from "dayjs";
import { Day } from "@/types/global";
import { boxHeight, canvasWrapperId, minutesInHour, zoom2ColumnWidth } from "@/constants";
import { Theme } from "@/styles";
import { getDayWidth } from "@/utils/getDayWidth";
import { drawMonthlyView } from "./drawMonthlyView";
import { drawYearlyView } from "./drawYearlyView";
import { drawHourlyView } from "./drawHourlyView";

const drawRowSeparators = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  theme: Theme,
  rowsPerPerson?: number[]
) => {
  const width = ctx.canvas.width;
  const boundaries: number[] = [0];
  if (rowsPerPerson?.length) {
    rowsPerPerson.reduce((acc, count) => {
      boundaries.push(acc + count);
      return acc + count;
    }, 0);
  } else {
    for (let i = 1; i <= rows; i++) boundaries.push(i);
  }

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = theme.colors.border;
  boundaries.forEach((row) => {
    const y = row * boxHeight + 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  });
  ctx.stroke();
};

const drawNowLine = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  rows: number,
  startDate: Day,
  theme: Theme
) => {
  const now = dayjs();
  let x: number;
  switch (zoom) {
    case 1: {
      const start = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`);
      x = (now.diff(start, "minute") / (24 * minutesInHour)) * getDayWidth();
      break;
    }
    case 2: {
      const start = dayjs(
        `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
      );
      x = (now.diff(start, "minute") / minutesInHour) * zoom2ColumnWidth + zoom2ColumnWidth / 2;
      break;
    }
    default:
      return;
  }
  if (x < 0) return;

  const height = rows * boxHeight;
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = theme.colors.accent;
  ctx.lineWidth = 2;
  ctx.moveTo(Math.round(x), 0);
  ctx.lineTo(Math.round(x), height);
  ctx.stroke();
  ctx.lineWidth = 1;
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  rows: number,
  cols: number,
  parsedStartDate: Day,
  theme: Theme,
  rowsPerPerson?: number[]
): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const canvasWrapper = document.getElementById(canvasWrapperId);
  if (!canvasWrapper) return;

  switch (zoom) {
    case 0:
      drawYearlyView(ctx, rows, cols, parsedStartDate, theme);
      break;
    case 1:
      drawMonthlyView(ctx, rows, cols, parsedStartDate, theme);
      break;
    case 2:
      drawHourlyView(ctx, rows, cols, parsedStartDate, theme);
      break;
  }
  drawRowSeparators(ctx, rows, theme, rowsPerPerson);
  drawNowLine(ctx, zoom, rows, parsedStartDate, theme);
};
