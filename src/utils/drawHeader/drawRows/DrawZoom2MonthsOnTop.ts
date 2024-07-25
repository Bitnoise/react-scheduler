import dayjs from "dayjs";
import {
  fonts,
  leftColumnWidth,
  outsideWrapperId,
  screenWidthMultiplier,
  topRowTextYPos,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { drawRow } from "../../drawRow";

export const drawZoom2MonthsOnTop = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day
) => {
  const month = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth + 1}`);

  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const componentWidth = wrapperWidth - leftColumnWidth;

  drawRow({
    ctx,
    x: 0,
    y: 0,
    width: componentWidth * screenWidthMultiplier,
    height: zoom2HeaderTopRowHeight,
    textYPos: topRowTextYPos,
    label: month.format("MMMM").toUpperCase(),
    font: fonts.topRow
  });
};
