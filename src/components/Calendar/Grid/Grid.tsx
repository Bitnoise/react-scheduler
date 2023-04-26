import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { dayWidth, headerHeight, headerMonthHeight, headerWeekHeight } from "@/constants";
import { getMonths } from "@/utils/dates";
import { renderMonthsRow, renderDaysRow, renderWeeksRow } from "@/utils/renderCalendatHeader";
import { GridProps } from "./types";

const rows = 10;
const boxHeight = 60;
const weekWidth = dayWidth * 7;

const Grid = ({ days }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const daysInYear = days.length;

  const drawHeader = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      let xPosMonth = 0;

      getMonths(days).map((month) => {
        const daysInMonth = days.filter((day) => day.monthName === month).length;
        const width = daysInMonth * dayWidth;
        renderMonthsRow(ctx, xPosMonth, 0, width, month.toUpperCase());
        xPosMonth += width;
      });

      renderWeeksRow(ctx, 0, headerMonthHeight, weekWidth, days);

      renderDaysRow(ctx, 0, headerMonthHeight + headerWeekHeight, days);
    },
    [days]
  );

  const drawRectange = useCallback(
    (
      x: number,
      y: number,
      ctx: CanvasRenderingContext2D,
      isBussinessDay: boolean,
      isCurrentDay: boolean
    ) => {
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
    },
    [theme.colors.grey, theme.colors.hover, theme.colors.superLightBlue, theme.colors.white]
  );

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.canvas.width = daysInYear * dayWidth;
      ctx.canvas.height = rows * boxHeight + headerHeight;
      drawHeader(ctx);
      days.map((day, index) => {
        for (let y = 0; y <= rows; y++) {
          drawRectange(
            index * dayWidth,
            y * boxHeight + headerHeight,
            ctx,
            day.isBussinessDay,
            day.isCurrentDay
          );
        }
      });
    },
    [days, daysInYear, drawHeader, drawRectange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid(ctx);
  }, [drawGrid]);

  return <canvas ref={canvasRef} />;
};

export default Grid;
