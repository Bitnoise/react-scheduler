import dayjs from "dayjs";
import {
  fonts,
  headerMonthHeight,
  headerWeekHeight,
  monthsInYear,
  singleDayWidth
} from "@/constants";
import { Day } from "@/types/global";
import { getDaysInMonths } from "@/utils/dates";
import { drawRow } from "../../drawRow";

export const drawMonthsInMiddle = (ctx: CanvasRenderingContext2D, cols: number, startDate: Day) => {
  let xPos = -(startDate.dayOfMonth - 1) * singleDayWidth;
  const yPos = headerMonthHeight;
  const textYPos = headerWeekHeight / 2 + headerMonthHeight;
  const monthIndex = startDate.month;
  let index = monthIndex;

  for (let i = 0; i < cols; i++) {
    if (index >= monthsInYear) index = 0;
    const width = getDaysInMonths(startDate, i) * singleDayWidth;

    drawRow({
      ctx,
      x: xPos,
      y: yPos,
      width,
      height: headerWeekHeight,
      textYPos,
      label: dayjs().month(index).format("MMMM").toUpperCase(),
      font: fonts.bottomRow.number
    });
    xPos += width;
    index++;
  }
};
