import {
  dayWidth,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight,
  weekWidth
} from "@/constants";
import { theme } from "@/styles";
import { Days, getCalendarData, getDaysInMonths, getMonths } from "./dates";
import { drawRow } from "./drawRow";

const daysFillStyle = theme.colors.superLightBlue;
const fonts = {
  topRow: "600 14px Inter",
  middleRow: "400 10px Inter",
  bottomRow: {
    name: "600 14px Inter",
    number: "600 10px Inter"
  }
};
const weekLabel = "TYDZIEŃ";

const getBoxFillStyle = (isCurrent: boolean, isBusinessDay?: boolean, isYearView?: boolean) => {
  if (isYearView) return isCurrent ? theme.colors.accentLight : daysFillStyle;
  if (isCurrent) return theme.colors.accentLight;
  if (!isBusinessDay) return theme.colors.hover;

  return daysFillStyle;
};

const getTextFillStyle = (isCurrent: boolean, isBusinessDay: boolean, isBottom?: boolean) => {
  if (isCurrent) return isBottom ? theme.colors.darkGrey : theme.colors.accent;
  if (isBusinessDay) return isBottom ? theme.colors.darkGrey : theme.colors.black;
  return theme.colors.darkGrey;
};

export const renderTopRow = (ctx: CanvasRenderingContext2D, days: Days, zoom: number) => {
  const yPos = 0;
  const textYPos = headerMonthHeight / 2;
  let xPos = 0;
  let width = 0;

  if (zoom === 1) {
    getMonths(days).map((month) => {
      const daysInMonth = days.filter((day) => day.monthName === month).length;
      width = daysInMonth * dayWidth;
      const monthName = month.toUpperCase();

      drawRow(ctx, xPos, yPos, width, headerMonthHeight, textYPos, monthName, fonts.topRow);

      xPos += width;
    });
  } else {
    const daysInMonths = getDaysInMonths(days);

    let width = 0;

    for (let i = 0; i < daysInMonths.length; i++) {
      width += daysInMonths[i] * 12;
    }

    const yearsArray = days.map((day) => day.year);
    const year = yearsArray[0].toString();

    drawRow(ctx, xPos, yPos, width, headerMonthHeight, textYPos, year, fonts.topRow);
  }
};

export const renderMiddleRow = (ctx: CanvasRenderingContext2D, days: Days, zoom: number) => {
  let xPos = 0;

  if (zoom === 1) {
    const yPos = headerMonthHeight;
    const width = 7 * dayWidth;

    const textYPos = headerWeekHeight / 2 + headerMonthHeight;

    for (let i = 0; i < 52; i++) {
      const week = days.filter((week) => week.weekOfYear === i + 1);

      if (week[0].dayOfMonth !== 1 && i === 0) xPos += dayWidth * (week[0].dayOfMonth - 1);

      drawRow(
        ctx,
        xPos,
        yPos,
        width,
        headerWeekHeight,
        textYPos,
        `${weekLabel} ${i + 1}`,
        fonts.middleRow
      );

      xPos += width;
    }
  } else {
    const yPos = headerMonthHeight;
    const textYPos = headerWeekHeight / 2 + headerMonthHeight;
    const months = getMonths(days);

    const daysInMonths = getDaysInMonths(days);

    for (let i = 0; i < months.length; i++) {
      const width = daysInMonths[i] * 12;

      drawRow(
        ctx,
        xPos,
        yPos,
        width,
        headerWeekHeight,
        textYPos,
        months[i].toUpperCase(),
        fonts.bottomRow.number
      );

      xPos += width;
    }
  }
};

export const renderBottomRow = (ctx: CanvasRenderingContext2D, days: Days, zoom: number) => {
  const dayNameYPos = headerHeight - headerDayHeight / 1.6;
  const dayNumYPos = headerHeight - headerDayHeight / 4.5;
  const yPos = headerMonthHeight + headerWeekHeight;
  let xPos = 0;

  const calendarData = getCalendarData(days);

  if (zoom === 1) {
    for (let i = 0; i < days.length; i++) {
      const { dayName, dayOfMonth, isBusinessDay, isCurrentDay } = calendarData[i];

      drawRow(
        ctx,
        xPos,
        yPos,
        dayWidth,
        headerDayHeight,
        undefined,
        undefined,
        undefined,
        true,
        getBoxFillStyle(isCurrentDay, isBusinessDay),
        {
          yPos: dayNameYPos,
          label: dayName.toUpperCase(),
          font: fonts.bottomRow.name,
          color: getTextFillStyle(isCurrentDay, isBusinessDay)
        },
        {
          yPos: dayNumYPos,
          label: `${dayOfMonth}`,
          font: fonts.bottomRow.number,
          color: getTextFillStyle(isCurrentDay, isBusinessDay, true)
        }
      );

      xPos += dayWidth;
    }
  } else {
    let xPos = 0;

    for (let i = 0; i < 52; i++) {
      const weeks = days.filter((week) => week.weekOfYear === i + 1);
      if (weeks[0].dayOfMonth !== 1 && i === 0) xPos += (weekWidth / 7) * (weeks[0].dayOfMonth - 1);

      const isCurrent = weeks.filter((week) => (week.isCurrentDay ? week.weekOfYear : undefined));

      drawRow(
        ctx,
        xPos,
        yPos,
        weekWidth,
        headerDayHeight,
        undefined,
        undefined,
        undefined,
        true,
        getBoxFillStyle(isCurrent.length > 0, undefined, true),
        {
          yPos: dayNameYPos,
          label: `${i + 1}`,
          font: fonts.bottomRow.name,
          color: getTextFillStyle(isCurrent.length > 0, false)
        },
        {
          yPos: dayNumYPos,
          label: weekLabel,
          font: fonts.middleRow,
          color: theme.colors.darkGrey
        }
      );

      xPos += weekWidth;
    }
  }
};
