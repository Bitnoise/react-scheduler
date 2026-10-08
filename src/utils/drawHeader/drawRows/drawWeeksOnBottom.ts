import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  dayNameYoffset,
  dayNumYOffset,
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
): void => {
  const dayNameYPos = headerHeight - headerDayHeight / dayNameYoffset;
  const dayNumYPos = headerHeight - headerDayHeight / dayNumYOffset;
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
          label: weekLabel.toUpperCase(),
          font: fonts.bottomRow.name,
          letterSpacing: "0.6px",
          color: getTextStyle(
            { isCurrent: isCurrWeek, isBusinessDay: true, variant: "bottomRow" },
            theme
          )
        },
        bottomText: {
          y: dayNumYPos,
          label: week.isoWeek().toString(),
          font: fonts.bottomRow.number,
          circleColor: isCurrWeek ? theme.colors.accent : undefined,
          color: getTextStyle({ isCurrent: isCurrWeek, isBusinessDay: true }, theme)
        }
      },
      theme
    );

    xPos += weekWidth;
  }
};
