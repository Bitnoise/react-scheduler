import dayjs from "dayjs";
import { fonts, headerMonthHeight, monthsInYear, topRowTextYPos } from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";
import { Day } from "@/types/global";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const drawMonthsOnTop = (
  ctx: CanvasRenderingContext2D,
  startDate: Day,
  theme: Theme
): void => {
  const yPos = 0;
  let xPos = 0;
  let width = 0;
  let yearIndex = 0;
  let startMonthIndex = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`
  ).month();
  xPos = -startDate.dayOfMonth * getDayWidth() + getDayWidth();

  for (let i = 0; i < monthsInYear; i++) {
    if (startMonthIndex > monthsInYear - 1) {
      startMonthIndex = 0;
      yearIndex++;
    }
    const dayInMonth = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
      .add(i, "months")
      .daysInMonth();

    width = dayInMonth * getDayWidth();

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: headerMonthHeight,
        textYPos: topRowTextYPos,
        label:
          capitalize(
            dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
              .month(startMonthIndex)
              .format("MMMM")
          ) +
          ` ${dayjs(`${startDate.year + yearIndex}-${startDate.month + 1}-${startDate.dayOfMonth}`)
            .month(startMonthIndex)
            .format("YYYY")}`,
        font: fonts.topRow,
        color: theme.colors.textPrimary,
        align: "left"
      },
      theme
    );

    xPos += width;
    startMonthIndex++;
  }
};
