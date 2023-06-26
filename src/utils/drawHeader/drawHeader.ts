import { Day } from "@/types/global";
import { drawDaysOnBottom } from "./drawRows/drawDaysOnBottom";
import { drawMonthsInMiddle } from "./drawRows/drawMonthsInMiddle";
import { drawMonthsOnTop } from "./drawRows/drawMonthsOnTop";
import { drawWeeksInMiddle } from "./drawRows/drawWeeksInMiddle";
import { drawWeeksOnBottom } from "./drawRows/drawWeeksOnBottom";
import { drawYearsOnTop } from "./drawRows/drawYearsOnTop";

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
  } else {
    drawMonthsOnTop(ctx, startDate);
    drawWeeksInMiddle(ctx, startDate, weekLabel);
    drawDaysOnBottom(ctx, cols, startDate);
  }
};
