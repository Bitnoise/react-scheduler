import dayjs from "dayjs";
import {
  fonts,
  hoursInDay,
  topRowTextYPos,
  zoom2ColumnWidth,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";

export const drawZoom2MonthsOnTop = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day,
  theme: Theme
) => {
  const daysInRange = Math.ceil(cols / hoursInDay);
  const startDay = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`);
  const endDate = startDay.add(daysInRange - 1, "days");
  const startMonth = startDay.month();
  const endMonth = endDate.add(1, "day").month();
  const monthsInRange = startMonth === endMonth ? 1 : 2;

  let xPos = 0.5 * zoom2ColumnWidth;

  for (let i = 0; i < monthsInRange; i++) {
    const startDateHour = dayjs(
      `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
    );
    const firstDayOfAMonth = dayjs(`${startDate.year}-${startDate.month + i + 1}-01T:23:59:59`);
    const lastDayOfAMonth = firstDayOfAMonth.endOf("month");
    const monthLabel = lastDayOfAMonth.format("MMMM").toUpperCase();

    const diff = lastDayOfAMonth.diff(startDateHour, "hour") + 1;

    const width = i === 0 ? diff * zoom2ColumnWidth : cols * zoom2ColumnWidth;

    drawRow(
      {
        ctx,
        x: xPos,
        y: 0,
        width,
        height: zoom2HeaderTopRowHeight,
        textYPos: topRowTextYPos,
        label: monthLabel,
        font: fonts.topRow
      },
      theme
    );
    xPos += width;
  }
};
