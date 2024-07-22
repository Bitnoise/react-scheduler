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
  const yPos = zoom2HeaderTopRowHeight;

  const daysInRange = Math.floor(cols / 24) + 2; // +2 to make sure we have enough days to draw, one day before and one day after

  const middleDay = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    Math.ceil(cols / 2),
    "hours"
  );

  // const xPosOffset = -3 * zoom2ColumnWidth;
  const xPosOffset = (Math.ceil(cols / 2) - dayjs().hour()) * zoom2ColumnWidth;

  // console.log("middleDay", middleDay.format("DD.MM.YYYY HH:mm"));
  console.log("NOW", dayjs().hour());

  let index = startDate.dayOfMonth;
  let xPos = xPosOffset + 0.5 * zoom2ColumnWidth;
  const width = 24 * zoom2ColumnWidth;

  for (let i = 0; i < daysInRange; i++) {
    // console.log("MMEH", dayjs().day(index).format("dddd DD.MM.YYYY").toUpperCase());
    console.log("MMEH", dayjs().day(i).format("dddd DD.MM.YYYY").toUpperCase());
    drawRow({
      ctx,
      x: xPos,
      y: yPos,
      width,
      height: zoom2HeaderMiddleRowHeight,
      textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
      label: dayjs().day(i).format("dddd DD.MM.YYYY").toUpperCase(),
      font: fonts.bottomRow.number
    });
    xPos += width;
    index++;
  }
};
