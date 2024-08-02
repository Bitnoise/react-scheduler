import { Day } from "@/types/global";
import { canvasWrapperId } from "@/constants";
import { drawMonthlyView } from "./drawMonthlyView";
import { drawYearlyView } from "./drawYearlyView";
import { drawHourlyView } from "./drawHourlyView";

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  rows: number,
  cols: number,
  parsedStartDate: Day
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const canvasWrapper = document.getElementById(canvasWrapperId);
  if (!canvasWrapper) return;

  switch (zoom) {
    case 0:
      drawYearlyView(ctx, rows, cols, parsedStartDate);
      break;
    case 1:
      drawMonthlyView(ctx, rows, cols, parsedStartDate);
      break;
    case 2:
      drawHourlyView(ctx, rows, cols, parsedStartDate);
      break;
  }
};
