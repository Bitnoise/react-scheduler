import { prefixId } from "./styles";

export const dayWidth = 60;
export const mobileDayWidth = 100;
export const headerMonthHeight = 24;
export const headerWeekHeight = 16;
export const headerDayHeight = 40;
export const headerHeight: number = headerDayHeight + headerWeekHeight + headerMonthHeight;
export const weekWidth = 84;
export const boxHeight = 56;
export const leftColumnWidth = 196;
export const mobileLeftColumnWidth = 112;
export const mobileBreakpoint = 768;
export const mobileMediaQuery: string = `(max-width: ${mobileBreakpoint - 1}px)`;
export const leftColumnWidthCssVar = "--rs-left-column-width";
export const leftColumnWidthCss: string = `var(${leftColumnWidthCssVar}, ${leftColumnWidth}px)`;
export const singleDayWidth: number = weekWidth / 7;
export const zoom2ColumnWidth = 50;
export const zoom2HeaderTopRowHeight = 24;
export const zoom2HeaderMiddleRowHeight = 16;
export const zoom2HeaderBottomRowHeight = 40;
export const zoom2HeaderHeight: number =
  zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight + zoom2HeaderBottomRowHeight;
export const zoom2ButtonJump = 1;
export const weeksInYear = 52;
export const navHeight = 56;
export const fonts = {
  topRow: "600 13px Inter",
  middleRow: "500 10px Inter",
  bottomRow: {
    name: "500 10px Inter",
    number: "600 14px Inter"
  }
};
export const screenWidthMultiplier = 3;
export const dayNameYoffset: number = 40 / 33; // day name at y=47
export const dayNumYOffset: number = 40 / 13; // day number at y=67
export const monthsInYear = 12;
export const hoursInDay = 24;
export const canvasHeaderWrapperId = "reactSchedulerCanvasHeaderWrapper";
export const canvasWrapperId = "reactSchedulerCanvasWrapper";
export const outsideWrapperId: string = prefixId;
export const tileYOffset = 4;
export const tileHeight = 48;
export const formFieldsIds = {
  peopleCount: "peopleCount",
  projectsPerYear: "projectsPerYear",
  yearsCovered: "yearsCovered",
  startDate: "startDate",
  maxRecordsPerPage: "maxRecordsPerPage",
  isFullscreen: "isFullscreen"
};
export const businessDays = 5;
export const maxHoursPerWeek = 40;
export const maxHoursPerDay = 8;
export const topRowTextYPos: number = headerMonthHeight / 2 + 2;
export const middleRowTextYPos: number = headerWeekHeight / 2 + headerMonthHeight + 1;
export const buttonWeeksJump = 2;
export const minutesInHour = 60;
