import dayjs from "dayjs";
import {
  fonts,
  zoom2ColumnWidth,
  zoom2HeaderMiddleRowHeight,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { drawRow } from "../../drawRow";

export const drawZoom2DaysInMiddle = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  const yPos = zoom2HeaderTopRowHeight;

  const daysInRange = Math.floor(cols / 24) + 2; // +2 to make sure we have enough days to draw, one day before and one day after

  const width = 24 * zoom2ColumnWidth;
  const xPosOffset =
    (Math.floor(cols / 2) - dayjs().hour()) * zoom2ColumnWidth -
    Math.floor(daysInRange / 2) * width;

  let xPos = xPosOffset + 0.5 * zoom2ColumnWidth;

  for (let i = 0; i < daysInRange; i++) {
    let day = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth + 1}`);
    if (i < Math.floor(daysInRange / 2)) {
      day = day.subtract(Math.floor(daysInRange / 2) - i, "days");
    } else {
      day = day.add(i - Math.floor(daysInRange / 2), "days");
    }
    drawRow({
      ctx,
      x: xPos,
      y: yPos,
      width,
      height: zoom2HeaderMiddleRowHeight,
      textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
      label: day.format("dddd DD.MM.YYYY").toUpperCase(),
      font: fonts.bottomRow.number
    });
    xPos += width;
  }
};
