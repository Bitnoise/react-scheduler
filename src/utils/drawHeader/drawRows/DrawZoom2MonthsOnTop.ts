import dayjs from "dayjs";
import { fonts, topRowTextYPos, zoom2ColumnWidth, zoom2HeaderTopRowHeight } from "@/constants";
import { Day } from "@/types/global";
import { drawRow } from "../../drawRow";

export const drawZoom2MonthsOnTop = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  const daysInRange = Math.ceil(cols / 24);
  const startDay = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`);
  const endDate = startDay.add(daysInRange - 1, "days");
  const startMonth = startDay.month();
  const endMonth = endDate.add(1, "day").month();
  const monthsInRange = startMonth === endMonth ? 1 : 2;

  const endOfMonthPosition =
    (startMonth !== startDay.add(2, "day").month() ? 1 : 0) +
    (startMonth !== startDay.add(1, "day").month() ? 1 : 0);

  let shift = 24;
  switch (endOfMonthPosition) {
    case 0:
      shift = 24;
      break;
    case 1:
      shift = 0;
      break;
    case 2:
      shift = -24;
  }

  const firstWidth =
    monthsInRange === 1
      ? cols * zoom2ColumnWidth
      : (Math.floor(cols / 2) + -dayjs().hour() + shift) * zoom2ColumnWidth +
        0.5 * zoom2ColumnWidth;

  for (let i = 0; i < monthsInRange; i++) {
    const monthLabel = dayjs(`${startDate.year}-${startDate.month + i + 1}-01`)
      .format("MMMM")
      .toUpperCase();
    const xPos = monthsInRange === 1 ? 0 : i * firstWidth;
    const width = i === 0 ? firstWidth : zoom2ColumnWidth * cols * 1.5;

    drawRow({
      ctx,
      x: xPos,
      y: 0,
      width,
      height: zoom2HeaderTopRowHeight,
      textYPos: topRowTextYPos,
      label: monthLabel,
      font: fonts.topRow
    });
  }
};
