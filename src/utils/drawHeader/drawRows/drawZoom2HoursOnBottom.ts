import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  dayNameYoffset,
  dayNumYOffset,
  dayWidth,
  fonts,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight,
  zoom2ColumnWidth,
  hoursInDay,
  middleRowTextYPos,
  zoom2HeaderBottomRowHeight,
  zoom2HeaderTopRowHeight,
  zoom2HeaderMiddleRowHeight
} from "@/constants";
import { parseDay } from "@/utils/dates";
import { drawRow } from "../../drawRow";
import { getBoxFillStyle } from "../../getBoxFillStyle";
import { getTextStyle } from "../../getTextStyle";

export const drawZoom2HoursOnBottom = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  let xPos = 0;
  const yPos = zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight;

  for (let i = 0; i < cols; i++) {
    // const hour = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    //   i,
    //   "hours"
    // );
    // const hour = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    //   i,
    //   "hours"
    // );
    let hour;

    // I want the middle cell to be the current hour and other cells to be the previous and next hours
    if (i === Math.floor(cols / 2)) {
      hour = dayjs();
    } else if (i > Math.floor(cols / 2)) {
      // next hours
      hour = dayjs().add(i - Math.floor(cols / 2), "hours");
    } else {
      // previous hours
      hour = dayjs().subtract(Math.floor(cols / 2) - i, "hours");
    }

    // const width = cols * zoom2ColumnWidth;
    const width = zoom2ColumnWidth;
    // console.log("DAU", i, hour.format("HH:mm"));

    drawRow({
      ctx,
      x: xPos,
      y: yPos,
      width,
      height: zoom2HeaderBottomRowHeight,
      label: hour.format("HH:00").toUpperCase(),
      font: fonts.bottomRow.number,
      textYPos:
        zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight + zoom2HeaderBottomRowHeight / 2 + 2,
      labelBetweenCells: true
    });

    xPos += zoom2ColumnWidth;
  }
};
