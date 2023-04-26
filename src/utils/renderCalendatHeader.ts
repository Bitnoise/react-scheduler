import {
  dayWidth,
  headerDayHeight,
  headerHeight,
  headerMonthHeight,
  headerWeekHeight
} from "@/constants";
import { theme } from "@/styles";
import { Days } from "./dates";

const defaultFillStyle = theme.colors.white;
const daysFillStyle = theme.colors.superLightBlue;
const fonts = {
  month: "600 14px Inter",
  week: "400 10px Inter",
  day: {
    name: "600 14px Inter",
    number: "600 10px Inter"
  }
};
const weekLabel = "TYDZIEŃ";

export const renderMonthsRow = (
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  width: number,
  label: string
) => {
  ctx.strokeStyle = theme.colors.grey;
  const textXPos = xPos + width / 2 - ctx.measureText(label).width / 2;
  const textYPos = headerMonthHeight / 2;

  ctx.beginPath();
  ctx.fillStyle = defaultFillStyle;

  ctx.fillRect(xPos, yPos, width, headerMonthHeight);
  ctx.strokeRect(xPos, yPos, width, headerMonthHeight);

  ctx.font = fonts.month;
  ctx.textBaseline = "middle";
  ctx.fillStyle = theme.colors.darkGrey;
  ctx.fillText(label, textXPos, textYPos);
};

export const renderWeeksRow = (
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  width: number,
  days: Days
) => {
  const textYPos = headerWeekHeight / 2 + headerMonthHeight;
  ctx.beginPath();
  ctx.strokeStyle = theme.colors.grey;

  for (let i = 0; i < 52; i++) {
    const week = days.filter((week) => week.weekOfYear === i + 1);

    if (week[0].dayOfMonth !== 1 && i === 0) xPos += dayWidth * (week[0].dayOfMonth - 1);

    const textXPos = xPos + width / 2 - ctx.measureText(`${weekLabel} ${i + 1}`).width / 2;

    ctx.fillStyle = defaultFillStyle;
    ctx.fillRect(xPos, yPos, width, headerWeekHeight);
    ctx.strokeRect(xPos, yPos, width, headerWeekHeight);

    ctx.font = fonts.week;
    ctx.textBaseline = "middle";
    ctx.fillStyle = theme.colors.darkGrey;
    ctx.fillText(`${weekLabel} ${i + 1}`, textXPos, textYPos);

    xPos += width;
  }
};

export const renderDaysRow = (
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  days: Days
) => {
  const dayNames = days.map((day) => day.dayName.toUpperCase());
  const dayNum = days.map((day) => day.dayOfMonth);
  const isBusinessDay = days.map((day) => day.isBussinessDay);
  const isCurrentDay = days.map((day) => day.isCurrentDay);
  const dayNameYPos = headerHeight - headerDayHeight / 1.6;
  const dayNumYPos = headerHeight - headerDayHeight / 4.5;

  for (let i = 0; i < days.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = isBusinessDay[i] ? daysFillStyle : theme.colors.hover;
    if (isCurrentDay[i]) ctx.fillStyle = theme.colors.accentLight;
    ctx.fillRect(xPos, yPos, dayWidth, headerDayHeight);
    ctx.strokeRect(xPos, yPos, dayWidth, headerDayHeight);

    // Day name
    ctx.font = fonts.day.name;

    const dayNameXPos = xPos + dayWidth / 2 - ctx.measureText(dayNames[i]).width / 2;

    ctx.fillStyle = isBusinessDay[i] ? theme.colors.black : theme.colors.darkGrey;
    if (isCurrentDay[i]) ctx.fillStyle = theme.colors.accent;
    ctx.fillText(`${dayNames[i]}`, dayNameXPos, dayNameYPos);

    // Day num
    ctx.font = fonts.day.number;

    const dayNumXPos = xPos + dayWidth / 2 - ctx.measureText(dayNum[i].toString()).width / 2;

    ctx.fillStyle = isBusinessDay[i] ? theme.colors.darkGrey : theme.colors.darkGrey;
    ctx.fillText(`${dayNum[i]}`, dayNumXPos, dayNumYPos);

    xPos += dayWidth;
  }
};
