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
  // let yearIndex = 0;
  let index = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).month();
  // xPos = -startDate.dayOfMonth * zoom2ColumnWidth + 0.5 * zoom2ColumnWidth;

  for (let i = 0; i < monthsInYear; i++) {
    if (index > monthsInYear - 1) {
      index = 0;
      // yearIndex++;
    }

    const middleDay = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
      Math.ceil(cols / 2),
      "hours"
    );

    const daysInMonth = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`)
      .add(i, "months")
      .daysInMonth();

    const month = dayjs(`${startDate.year}-${startDate.month}-${startDate.dayOfMonth}`).add(
      i,
      "months"
    );

    const width = 24 * daysInMonth * zoom2ColumnWidth;
    let xPos =
      -middleDay.hour() * zoom2ColumnWidth + i * 24 * zoom2ColumnWidth + 0.5 * zoom2ColumnWidth;
    // width = 500;

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
    index++;
  }
};
