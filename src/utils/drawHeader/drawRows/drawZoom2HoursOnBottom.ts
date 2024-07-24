import dayjs from "dayjs";
import {
  fonts,
  zoom2ColumnWidth,
  zoom2HeaderBottomRowHeight,
  zoom2HeaderTopRowHeight,
  zoom2HeaderMiddleRowHeight
} from "@/constants";
import { drawRow } from "../../drawRow";

export const drawZoom2HoursOnBottom = (ctx: CanvasRenderingContext2D, cols: number) => {
  let xPos = 0;
  const yPos = zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight;
  const now = dayjs();

  for (let i = 0; i < cols; i++) {
    const width = zoom2ColumnWidth;

    let hour;
    if (i === Math.floor(cols / 2)) {
      hour = now;
    } else if (i > Math.floor(cols / 2)) {
      hour = now.add(i - Math.floor(cols / 2), "hours");
    } else {
      hour = now.subtract(Math.floor(cols / 2) - i, "hours");
    }

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
