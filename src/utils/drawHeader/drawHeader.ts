import { Day } from "@/types/global";
import { Theme } from "@/styles";
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
  dayOfYear: number,
  theme: Theme
) => {
  switch (zoom) {
    case 0:
      drawYearsOnTop(ctx, startDate, dayOfYear, theme);
      drawMonthsInMiddle(ctx, cols, startDate, theme);
      drawWeeksOnBottom(ctx, cols, startDate, weekLabel, theme);
      break;
    case 1:
      drawMonthsOnTop(ctx, startDate, theme);
      drawWeeksInMiddle(ctx, startDate, weekLabel, theme);
      drawDaysOnBottom(ctx, cols, startDate, theme);
      break;
    case 2:
      drawZoom2MonthsOnTop(ctx, cols, startDate, theme);
      drawZoom2DaysInMiddle(ctx, cols, startDate, theme);
      drawZoom2HoursOnBottom(ctx, cols, startDate, theme);
      break;
  }
};
