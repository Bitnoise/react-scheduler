import { dayWidth, headerHeight } from "@/constants";
import { theme } from "@/styles";
import { Days, getDaysInMonths } from "./dates";
import { drawDashedLine } from "./drawDashedLine";
import { renderTopRow, renderMiddleRow, renderBottomRow } from "./renderCalendarHeader";

const rows = 15;
const boxHeight = 60;

export const drawGrid = (ctx: CanvasRenderingContext2D, zoom: number, days: Days) => {
  const daysInYear = days.length;

  ctx.canvas.width = daysInYear * dayWidth;
  ctx.canvas.height = rows * boxHeight + headerHeight;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawHeader(ctx, zoom, days);

  if (zoom === 1) {
    days.map((day, index) => {
      for (let y = 0; y <= rows; y++) {
        drawRectangle(
          ctx,
          index * dayWidth,
          y * boxHeight + headerHeight,
          dayWidth,
          day.isBusinessDay,
          day.isCurrentDay
        );
      }
    });
  } else {
    let xPos = 0;
    let startPos = 0;
    const weekWidth = 84;
    const daysInMonths = getDaysInMonths(days);

    for (let i = 0; i < 52; i++) {
      const weeks = days.filter((week) => week.weekOfYear === i + 1);
      if (weeks[0].dayOfMonth !== 1 && i === 0) xPos += (weekWidth / 7) * (weeks[0].dayOfMonth - 1);

      const isCurrent = weeks.filter((week) =>
        week.isCurrentDay === true ? week.weekOfYear : undefined
      );

      for (let y = 0; y <= rows; y++) {
        drawRectangle(
          ctx,
          xPos,
          y * boxHeight + headerHeight,
          weekWidth,
          true,
          isCurrent.length > 0
        );
      }

      xPos += weekWidth;
    }
    for (let j = 0; j < 12; j++) {
      const width = daysInMonths[j] * 12;
      drawDashedLine(ctx, startPos, rows * boxHeight + headerHeight);

      startPos += width;
    }
  }
};

const drawHeader = (ctx: CanvasRenderingContext2D, zoom: number, days: Days) => {
  renderTopRow(ctx, days, zoom);

  renderMiddleRow(ctx, days, zoom);

  renderBottomRow(ctx, days, zoom);
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
  ctx.strokeRect(x, y, width, boxHeight);
};
