import dayjs from "dayjs";
import {
  fonts,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight,
  monthsInYear,
  topRowTextYPos,
  zoom2ColumnWidth,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { drawRow } from "../../drawRow";

export const drawZoom2MonthsOnTop = (ctx: CanvasRenderingContext2D, cols, startDate: Day) => {
  const yPos = 50;
  let xPos = 0;
  let width = 0;
  let yearIndex = 0;
  let startMonthIndex = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`
  ).month();
  xPos = -startDate.dayOfMonth * zoom2ColumnWidth + zoom2ColumnWidth;

  for (let i = 0; i < monthsInYear; i++) {
    if (startMonthIndex > monthsInYear - 1) {
      startMonthIndex = 0;
      yearIndex++;
    }
    const dayInMonth = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
      .add(i, "months")
      .daysInMonth();

    const month = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
      i,
      "months"
    );

    width = cols * zoom2ColumnWidth;
    // width = 500;

    console.log("WWW", width);

    drawRow({
      ctx,
      x: xPos,
      y: 0,
      width,
      height: zoom2HeaderTopRowHeight,
      textYPos: topRowTextYPos,
      label: month.format("MMMM").toUpperCase(),
      font: fonts.topRow
    });

    xPos += width;
    startMonthIndex++;
  }
};
