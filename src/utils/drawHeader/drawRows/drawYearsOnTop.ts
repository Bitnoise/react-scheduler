import { fonts, headerMonthHeight, singleDayWidth, topRowTextYPos } from "@/constants";
import { Theme } from "@/styles";
import { Day } from "@/types/global";
import { daysInYear } from "@/utils/dates";
import { drawRow } from "@/utils/drawRow";
export const drawYearsOnTop = (
  ctx: CanvasRenderingContext2D,
  startDate: Day,
  dayOfYear: number,
  theme: Theme
) => {
  const yPos = 0;
  const year = startDate.year;
  const canvasWidth = ctx.canvas.width * 2;
  let xPos = 0;
  let index = 0;
  let width = (daysInYear(year) - dayOfYear + 1) * singleDayWidth;
  let totalWidthOfElements = 0;

  while (xPos + totalWidthOfElements <= canvasWidth) {
    if (index > 0) {
      width = daysInYear(year + index) * singleDayWidth;
    }

    if (totalWidthOfElements + width > canvasWidth && index > 0) {
      width = Math.ceil((canvasWidth - totalWidthOfElements) / singleDayWidth) * singleDayWidth;
    }

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: headerMonthHeight,
        textYPos: topRowTextYPos,
        label: (year + index).toString(),
        font: fonts.topRow
      },
      theme
    );

    xPos += width;
    totalWidthOfElements += width;
    index++;
  }
};
