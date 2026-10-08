import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  fonts,
  headerMonthHeight,
  headerWeekHeight,
  middleRowTextYPos
} from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";
import { drawRow } from "@/utils/drawRow";
import { Theme } from "@/styles";

export const drawWeeksInMiddle = (
  ctx: CanvasRenderingContext2D,
  startDate: Day,
  weekLabel: string,
  theme: Theme
): void => {
  const width = 7 * getDayWidth();
  const yPos = headerMonthHeight;

  const weeksThreshold = ctx.canvas.width / width + width;
  const startWeek = startDate.weekOfYear;
  let xPos = 0;

  for (let i = 0; i < weeksThreshold; i++) {
    const formattedDate = `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`;
    const day = dayjs(formattedDate).day();
    const weeksInYear = dayjs(formattedDate).isoWeeksInYear();
    let weekIndex = (startWeek + i) % weeksInYear;

    if (weekIndex <= 0) {
      weekIndex += weeksInYear;
    }

    if (day !== 1 && i === 0) xPos = -day * getDayWidth() + getDayWidth();

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: headerWeekHeight,
        textYPos: middleRowTextYPos,
        label: `${weekLabel.toUpperCase()} ${weekIndex}`,
        font: fonts.middleRow,
        letterSpacing: "0.6px",
        align: "left"
      },
      theme
    );

    xPos += width;
  }
};
