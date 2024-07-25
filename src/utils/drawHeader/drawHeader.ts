import { Day } from "@/types/global";
import { drawDaysOnBottom } from "./drawRows/drawDaysOnBottom";
import { drawMonthsInMiddle } from "./drawRows/drawMonthsInMiddle";
import { drawMonthsOnTop } from "./drawRows/drawMonthsOnTop";
import { drawWeeksInMiddle } from "./drawRows/drawWeeksInMiddle";
import { drawWeeksOnBottom } from "./drawRows/drawWeeksOnBottom";
import { drawYearsOnTop } from "./drawRows/drawYearsOnTop";
import { drawZoom2DaysInMiddle } from "./drawRows/drawZoom2DaysInMiddle";
import { drawZoom2MonthsOnTop } from "./drawRows/DrawZoom2MonthsOnTop";
import { drawZoom2HoursOnBottom } from "./drawRows/drawZoom2HoursOnBottom";

export const drawHeader = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  cols: number,
  startDate: Day,
  weekLabel: string,
  dayOfYear: number
) => {
  if (zoom === 0) {
    drawYearsOnTop(ctx, startDate, dayOfYear);
    drawMonthsInMiddle(ctx, cols, startDate);
    drawWeeksOnBottom(ctx, cols, startDate, weekLabel);
  } else if (zoom === 1) {
    drawMonthsOnTop(ctx, startDate);
    drawWeeksInMiddle(ctx, startDate, weekLabel);
    drawDaysOnBottom(ctx, cols, startDate);
  } else if (zoom === 2) {
    drawZoom2MonthsOnTop(ctx, cols, startDate);
    drawZoom2DaysInMiddle(ctx, cols, startDate);
    drawZoom2HoursOnBottom(ctx, cols);
  }
};
