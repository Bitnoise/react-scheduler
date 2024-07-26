import { Day } from "@/types/global";
import { Theme } from "@/styles";
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
  dayOfYear: number,
  theme: Theme
) => {
  if (zoom === 0) {
    drawYearsOnTop(ctx, startDate, dayOfYear, theme);
    drawMonthsInMiddle(ctx, cols, startDate, theme);
    drawWeeksOnBottom(ctx, cols, startDate, weekLabel, theme);
  } else {
    drawMonthsOnTop(ctx, startDate, theme);
    drawWeeksInMiddle(ctx, startDate, weekLabel, theme);
    drawDaysOnBottom(ctx, cols, startDate, theme);
  }
};
