import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { boxHeight, dayWidth, headerHeight, months, singleDayWidth, weekWidth } from "@/constants";
import { theme } from "@/styles";
import { Day } from "@/types/global";
import { Days, getIsBusinessDay, parseDay } from "./dates";
import { drawDashedLine } from "./drawDashedLine";
import { renderTopRow, renderMiddleRow, renderBottomRow } from "./renderCalendarHeader";
import { getRearrangedDaysInMonths } from "./getRearrangedDaysInMonths";
import { getDatesRange } from "./getDatesRange";

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  days: Days,
  rows: number,
  baseDate: dayjs.Dayjs
) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(dayOfYear);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const canvasWrapper = document.getElementById("canvasWrapper");
  if (!canvasWrapper) return;

  const cols =
    zoom === 0
      ? Math.ceil(window.innerWidth / weekWidth) * 3
      : Math.ceil(window.innerWidth / dayWidth) * 3;

  const startDate = getDatesRange(baseDate, zoom).startDate;
  const parsedStartDate = parseDay(startDate);
  const dayNumOfYear = dayjs(startDate).dayOfYear();

  drawHeader(ctx, zoom, days, cols, parsedStartDate, dayNumOfYear);

  if (zoom === 1) {
    for (let i = 0; i <= rows; i++) {
      for (let y = 0; y <= cols; y++) {
        const date = dayjs(
          `${parsedStartDate.year}-${parsedStartDate.month + 1}-${parsedStartDate.dayOfMonth}`
        ).add(y, "days");

        const isCurrentDay = date.isSame(dayjs(), "day");

        drawRectangle(
          ctx,
          y * dayWidth,
          i * boxHeight + headerHeight,
          dayWidth,
          getIsBusinessDay(date),
          isCurrentDay
        );
      }
    }
  } else {
    let xPos = 0;
    let startPos = -(parsedStartDate.dayOfMonth - 1) * singleDayWidth;

    for (let i = 0; i <= cols; i++) {
      const week = dayjs(
        `${parsedStartDate.year}-${parsedStartDate.month + 1}-${parsedStartDate.dayOfMonth}`
      ).add(i, "weeks");

      const isCurrWeek = week.isSame(dayjs(), "week");

      for (let y = 0; y <= rows; y++) {
        drawRectangle(ctx, xPos, y * boxHeight + headerHeight, weekWidth, true, isCurrWeek);
      }

      xPos += weekWidth;
    }

    const daysInMonths = getRearrangedDaysInMonths(days, parsedStartDate);

    for (let i = 0; i < cols; i++) {
      const width = daysInMonths[i % months.length] * singleDayWidth;
      drawDashedLine(ctx, startPos, rows * boxHeight + headerHeight);
      startPos += width;
    }
  }
};

const drawHeader = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  days: Days,
  cols: number,
  startDate: Day,
  dayNumOfYear: number
) => {
  renderTopRow(ctx, days, zoom, startDate, dayNumOfYear);

  renderMiddleRow(ctx, days, zoom, cols, startDate);

  renderBottomRow(ctx, zoom, cols, startDate);
};

const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  isBusinessDay: boolean,
  isCurrentDay: boolean
) => {
  ctx.strokeStyle = theme.colors.grey;
  if (isCurrentDay) {
    ctx.fillStyle = theme.colors.hover;
  } else if (isBusinessDay) {
    ctx.fillStyle = theme.colors.white;
  } else {
    ctx.fillStyle = theme.colors.superLightBlue;
  }
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.fillRect(x, y, width, boxHeight);
  ctx.strokeRect(x + 0.5, y + 0.5, width, boxHeight);
};
