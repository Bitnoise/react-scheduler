import dayjs from "dayjs";
import { dayWidth, fonts, headerMonthHeight, monthsInYear, topRowTextYPos } from "@/constants";
import { Day } from "@/types/global";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";

export const drawMonthsOnTop = (ctx: CanvasRenderingContext2D, startDate: Day, theme: Theme) => {
  const yPos = 0;
  let xPos = 0;
  let width = 0;
  let yearIndex = 0;
  let startMonthIndex = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`
  ).month();
  xPos = -startDate.dayOfMonth * dayWidth + dayWidth;

  for (let i = 0; i < monthsInYear; i++) {
    if (startMonthIndex > monthsInYear - 1) {
      startMonthIndex = 0;
      yearIndex++;
    }
    const dayInMonth = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
      .add(i, "months")
      .daysInMonth();

    width = dayInMonth * dayWidth;

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: headerMonthHeight,
        textYPos: topRowTextYPos,
        label:
          dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
            .month(startMonthIndex)
            .format("MMMM")
            .toUpperCase() +
          ` ${dayjs(`${startDate.year + yearIndex}-${startDate.month + 1}-${startDate.dayOfMonth}`)
            .month(startMonthIndex)
            .format("YYYY")}`,
        font: fonts.topRow
      },
      theme
    );

    xPos += width;
    startMonthIndex++;
  }
};
