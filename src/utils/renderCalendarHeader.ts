import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {
  dayWidth,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight,
  months,
  singleDayWidth,
  weekWidth,
  weeksInYear
} from "@/constants";
import { theme } from "@/styles";
import { Day } from "@/types/global";
import { Days, daysInYear, parseDay } from "./dates";
import { drawRow } from "./drawRow";
import { getRearrangedDaysInMonths } from "./getRearrangedDaysInMonths";

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

export const renderTopRow = (
  ctx: CanvasRenderingContext2D,
  days: Days,
  zoom: number,
  startDate: Day,
  dayOfYear: number
) => {
  let xPos = 0;
  const yPos = 0;
  const textYPos = headerMonthHeight / 2;

  if (zoom === 1) {
    // DRAWS MONTHS ROW

    let width = 0;
    let startMonthIndex = dayjs(
      `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`
    ).month();
    xPos = -startDate.dayOfMonth * dayWidth + dayWidth;

    const daysInMonths = months.map(
      (month) => days.filter((day) => day.monthName === month).length
    );

    for (let i = 0; i <= months.length - 1; i++) {
      if (startMonthIndex > months.length - 1) startMonthIndex = 0;
      width = daysInMonths[startMonthIndex] * dayWidth;
      const monthName = months[startMonthIndex].toUpperCase();
      drawRow(ctx, xPos, yPos, width, headerMonthHeight, textYPos, monthName, fonts.topRow);

      xPos += width;
      startMonthIndex++;
    }
  } else {
    // DRAWS YEARS ROW

    let index = 0;
    const year = startDate.year;
    const canvasWidth = ctx.canvas.width * 2;
    let width = (daysInYear(year) - dayOfYear + 1) * singleDayWidth;
    let totalWidthOfElements = 0;

    while (xPos + totalWidthOfElements <= canvasWidth) {
      if (index > 0) {
        width = daysInYear(year + index) * singleDayWidth;
      }
      if (totalWidthOfElements + width > canvasWidth && index > 0) {
        width = Math.ceil((canvasWidth - totalWidthOfElements) / singleDayWidth) * singleDayWidth;
      }
      drawRow(
        ctx,
        xPos,
        yPos,
        width,
        headerMonthHeight,
        textYPos,
        (year + index).toString(),
        fonts.topRow
      );

      xPos += width;
      totalWidthOfElements += width;
      index++;
    }
  }
};

export const renderMiddleRow = (
  ctx: CanvasRenderingContext2D,
  days: Days,
  zoom: number,
  cols: number,
  startDate: Day
) => {
  let xPos = 0;

  if (zoom === 1) {
    // DRAWS WEEKS ROW

    const width = 7 * dayWidth;
    const yPos = headerMonthHeight;
    const textYPos = headerWeekHeight / 2 + headerMonthHeight;
    const weeksThreshold = ctx.canvas.width / width + width;
    const startWeek = startDate.weekOfYear;

    for (let i = 0; i < weeksThreshold; i++) {
      let weekIndex = (startWeek + i) % weeksInYear;
      const day = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).day();

      if (weekIndex <= 0) {
        weekIndex += weeksInYear;
      }

      if (day !== 1 && i === 0) xPos = -day * dayWidth + dayWidth;
      drawRow(
        ctx,
        xPos,
        yPos,
        width,
        headerWeekHeight,
        textYPos,
        `${weekLabel} ${weekIndex}`,
        fonts.middleRow
      );

      xPos += width;
    }
  } else {
    // DRAWS MONTHS ROW

    let xPos = -(startDate.dayOfMonth - 1) * singleDayWidth;
    const yPos = headerMonthHeight;
    const textYPos = headerWeekHeight / 2 + headerMonthHeight;
    const monthIndex = months.findIndex((month) => month === startDate.monthName);
    const rearrangedMonths = [...months.slice(monthIndex), ...months.slice(0, monthIndex)];
    const daysInMonths = getRearrangedDaysInMonths(days, startDate);

    let index = 0;

    for (let i = 0; i < cols; i++) {
      if (index > months.length - 1) index = 0;
      const width = daysInMonths[index] * singleDayWidth;
      drawRow(
        ctx,
        xPos,
        yPos,
        width,
        headerWeekHeight,
        textYPos,
        rearrangedMonths[index].toUpperCase(),
        fonts.bottomRow.number
      );
      xPos += width;
      index++;
    }
  }
};

export const renderBottomRow = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  cols: number,
  startDate: Day
) => {
  const dayNameYPos = headerHeight - headerDayHeight / 1.6;
  const dayNumYPos = headerHeight - headerDayHeight / 4.5;
  const yPos = headerMonthHeight + headerWeekHeight;
  let xPos = 0;

  if (zoom === 1) {
    // DRAWS WEEKS ROW

    for (let i = 0; i < cols; i++) {
      const day = parseDay(
        dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(i, "days")
      );
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
        getBoxFillStyle(day.isCurrentDay, day.isBusinessDay),
        {
          yPos: dayNameYPos,
          label: day.dayName.toUpperCase(),
          font: fonts.bottomRow.name,
          color: getTextFillStyle(day.isCurrentDay, day.isBusinessDay)
        },
        {
          yPos: dayNumYPos,
          label: `${day.dayOfMonth}`,
          font: fonts.bottomRow.number,
          color: getTextFillStyle(day.isCurrentDay, day.isBusinessDay, true)
        }
      );

      xPos += dayWidth;
    }
  } else {
    // DRAWS DAYS ROW

    dayjs.extend(weekOfYear);
    let xPos = 0;

    for (let i = 0; i <= cols; i++) {
      const week = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
        i,
        "weeks"
      );

      const isCurrWeek = week.isSame(dayjs(), "week");

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
        getBoxFillStyle(isCurrWeek, undefined, true),
        {
          yPos: dayNameYPos,
          label: week.week().toString(),
          font: fonts.bottomRow.name,
          color: getTextFillStyle(isCurrWeek, false)
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
