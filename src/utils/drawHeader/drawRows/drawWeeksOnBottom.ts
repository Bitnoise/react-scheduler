import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  fonts,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight,
  weekWidth
} from "@/constants";
import { Theme } from "@/styles";
import { getBoxFillStyle } from "@/utils/getBoxFillStyle";
import { getTextStyle } from "@/utils/getTextStyle";
import { drawRow } from "../../drawRow";

export const drawWeeksOnBottom = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day,
  weekLabel: string,
  theme: Theme
) => {
  const dayNameYPos = headerHeight - headerDayHeight / 1.6;
  const dayNumYPos = headerHeight - headerDayHeight / 4.5;
  const yPos = headerMonthHeight + headerWeekHeight;
  let xPos = 0;

  for (let i = 0; i < cols; i++) {
    const week = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
      i,
      "weeks"
    );

    const isCurrWeek = week.isSame(dayjs(), "week");
    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width: weekWidth,
        height: headerDayHeight,
        isBottomRow: true,
        fillStyle: getBoxFillStyle({ isCurrent: isCurrWeek, variant: "yearView" }, theme),
        topText: {
          y: dayNameYPos,
          label: week.isoWeek().toString(),
          font: fonts.bottomRow.name,
          color: getTextStyle({ isCurrent: isCurrWeek }, theme)
        },
        bottomText: {
          y: dayNumYPos,
          label: weekLabel.toUpperCase(),
          font: fonts.middleRow,
          color: theme.colors.placeholder
        }
      },
      theme
    );

    xPos += weekWidth;
  }
};
