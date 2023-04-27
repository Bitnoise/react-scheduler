import { dayWidth, headerHeight, headerMonthHeight, headerWeekHeight } from "@/constants";
import { theme } from "@/styles";
import { Days, getMonths } from "./dates";
import {
  renderMonthsRow,
  renderWeeksRow,
  renderDaysRow,
  renderYearRow
} from "./renderCalendarHeader";

const rows = 10;
const boxHeight = 60;
const weekWidth = dayWidth * 7;

export const drawGrid = (ctx: CanvasRenderingContext2D, zoom: number, days: Days) => {
  const daysInYear = days.length;

  ctx.canvas.width = daysInYear * dayWidth;
  ctx.canvas.height = rows * boxHeight + headerHeight;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawHeader(ctx, zoom, days);

  days.map((day, index) => {
    for (let y = 0; y <= rows; y++) {
      drawRectange(
        index * dayWidth,
        y * boxHeight + headerHeight,
        ctx,
        day.isBussinessDay,
        day.isCurrentDay,
        zoom
      );
    }
  });
};

const drawHeader = (ctx: CanvasRenderingContext2D, zoom: number, days: Days) => {
  const daysInYear = days.length;

  if (zoom === 1) {
    let xPosMonth = 0;

    getMonths(days).map((month) => {
      const daysInMonth = days.filter((day) => day.monthName === month).length;
      const width = daysInMonth * dayWidth;
      renderMonthsRow(ctx, xPosMonth, 0, width, month.toUpperCase());
      xPosMonth += width;
    });

    renderWeeksRow(ctx, 0, headerMonthHeight, weekWidth, days);

    renderDaysRow(ctx, 0, headerMonthHeight + headerWeekHeight, days);
  } else {
    let xPosYear = 0;

    const width = daysInYear * dayWidth;
    renderYearRow(ctx, 0, 0, width, days);
    getMonths(days).map((month) => {
      const daysInMonth = days.filter((day) => day.monthName === month).length;
      //   renderMonthsRow(ctx, xPosYear, 0, width, month.toUpperCase());
      xPosYear += width;
    });

    renderWeeksRow(ctx, 0, headerMonthHeight, weekWidth, days);

    renderDaysRow(ctx, 0, headerMonthHeight + headerWeekHeight, days);
  }
};

const drawRectange = (
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  isBussinessDay: boolean,
  isCurrentDay: boolean,
  zoom: number
) => {
  if (zoom === 1) {
    ctx.strokeStyle = theme.colors.grey;
    if (isCurrentDay) {
      ctx.fillStyle = theme.colors.hover;
    } else if (isBussinessDay) {
      ctx.fillStyle = theme.colors.white;
    } else {
      ctx.fillStyle = theme.colors.superLightBlue;
    }

    ctx.beginPath();
    ctx.fillRect(x, y, dayWidth, boxHeight);
    ctx.strokeRect(x, y, dayWidth, boxHeight);
  }
};
