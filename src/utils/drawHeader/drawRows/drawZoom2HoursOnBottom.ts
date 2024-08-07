import dayjs from "dayjs";
import {
  fonts,
  zoom2ColumnWidth,
  zoom2HeaderBottomRowHeight,
  zoom2HeaderTopRowHeight,
  zoom2HeaderMiddleRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";

export const drawZoom2HoursOnBottom = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day,
  theme: Theme
) => {
  let xPos = 0;
  const yPos = zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight;

  const startDateHour = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  );
  const width = zoom2ColumnWidth;

  for (let i = 0; i < cols; i++) {
    const hourLabel = startDateHour.add(i, "hours").format("HH:00").toUpperCase();

    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width,
        height: zoom2HeaderBottomRowHeight,
        label: hourLabel,
        font: fonts.bottomRow.number,
        textYPos:
          zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight + zoom2HeaderBottomRowHeight / 2 + 2,
        labelBetweenCells: true
      },
      theme
    );

    xPos += zoom2ColumnWidth;
  }
};
