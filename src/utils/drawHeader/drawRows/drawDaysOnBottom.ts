import dayjs from "dayjs";
import { Day } from "@/types/global";
import {
  dayNameYoffset,
  dayNumYOffset,
  fonts,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight
} from "@/constants";
import { getDayWidth } from "@/utils/getDayWidth";
import { parseDay } from "@/utils/dates";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";
import { getBoxFillStyle } from "../../getBoxFillStyle";
import { getTextStyle } from "../../getTextStyle";

export const drawDaysOnBottom = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day,
  theme: Theme
): void => {
  const dayNameYPos = headerHeight - headerDayHeight / dayNameYoffset;
  const dayNumYPos = headerHeight - headerDayHeight / dayNumYOffset;
  const yPos = headerMonthHeight + headerWeekHeight;
  let xPos = 0;

  for (let i = 0; i < cols; i++) {
    const day = parseDay(
      dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(i, "days")
    );
    drawRow(
      {
        ctx,
        x: xPos,
        y: yPos,
        width: getDayWidth(),
        height: headerDayHeight,
        isBottomRow: true,
        fillStyle: getBoxFillStyle(
          {
            isCurrent: day.isCurrentDay,
            isBusinessDay: day.isBusinessDay
          },
          theme
        ),
        topText: {
          y: dayNameYPos,
          label: day.dayName.replace(".", "").toUpperCase(),
          font: fonts.bottomRow.name,
          letterSpacing: "0.6px",
          color: getTextStyle(
            {
              isCurrent: day.isCurrentDay,
              isBusinessDay: day.isBusinessDay,
              variant: "bottomRow"
            },
            theme
          )
        },
        bottomText: {
          y: dayNumYPos,
          label: `${day.dayOfMonth}`,
          font: fonts.bottomRow.number,
          circleColor: day.isCurrentDay ? theme.colors.accent : undefined,
          color: getTextStyle(
            { isCurrent: day.isCurrentDay, isBusinessDay: day.isBusinessDay },
            theme
          )
        }
      },
      theme
    );

    xPos += getDayWidth();
  }
};
