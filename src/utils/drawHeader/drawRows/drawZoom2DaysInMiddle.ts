import dayjs from "dayjs";
import {
  fonts,
  headerMonthHeight,
  headerWeekHeight,
  hoursInDay,
  middleRowTextYPos,
  monthsInYear,
  zoom2ColumnWidth,
  zoom2HeaderMiddleRowHeight,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { getDaysInMonths } from "@/utils/dates";
import { drawRow } from "../../drawRow";

export const drawZoom2DaysInMiddle = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  // let xPos = -(startDate.dayOfMonth - 1) * zoom2ColumnWidth;
  let xPos = (cols / 2) * zoom2ColumnWidth - 4 * zoom2ColumnWidth;
  const yPos = zoom2HeaderTopRowHeight;
  const monthIndex = startDate.month;
  let index = monthIndex;

  const daysInMonth = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`
  ).daysInMonth();

  console.log("DAYS IN MONTH", `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`);
  for (let i = 0; i < daysInMonth; i++) {
    if (index >= daysInMonth) index = 0;

    // console.log("MUU", getDaysInMonths(startDate, i));
    const width = 24 * zoom2ColumnWidth;

    drawRow({
      ctx,
      x: xPos,
      y: yPos,
      width,
      height: zoom2HeaderMiddleRowHeight,
      textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
      label: dayjs().day(index).format("dddd DD.MM.YYYY").toUpperCase(),
      // label: "DAY",
      font: fonts.bottomRow.number
    });
    xPos += width;
    index++;
  }
};
