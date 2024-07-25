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
  const daysInRange = Math.floor(cols / 24);

  const width = 24 * zoom2ColumnWidth;
  const xPosOffset =
    (Math.ceil(cols / 2) - dayjs().hour()) * zoom2ColumnWidth - Math.ceil(daysInRange / 2) * width;

  let xPos = xPosOffset + 0.5 * zoom2ColumnWidth;

  for (let i = 0; i < daysInRange; i++) {
    const day = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth + i}`);
    drawRow({
      ctx,
      x: xPos,
      y: zoom2HeaderTopRowHeight,
      width,
      height: zoom2HeaderMiddleRowHeight,
      textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
      label: day.format("dddd DD.MM.YYYY").toUpperCase(),
      font: fonts.bottomRow.number
    });
    xPos += width;
  }
};
