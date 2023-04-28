import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import pl from "dayjs/locale/pl";

dayjs.locale({
  ...pl
});

dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 === 0 ? 366 : 365;

const getIsBusinessDay = (date: dayjs.Dayjs) => {
  const day = date.day();
  return day !== 0 && day !== 6;
};

export const getDaysInYear = (year: number) => {
  const numberOfDaysInYear = daysInYear(year);

  return Array.from({ length: numberOfDaysInYear }, (_, i) => {
    const date = dayjs()
      .set("year", year)
      .dayOfYear(i + 1);

    return {
      dayName: date.format("ddd"),
      dayOfMonth: date.date(),
      weekOfYear: date.week(),
      month: date.month(),
      monthName: date.format("MMMM"),
      isBusinessDay: getIsBusinessDay(date),
      isCurrentDay: date.isSame(dayjs(), "day"),
      year
    };
  });
};

export const getMonths = (days: Days) => Array.from(new Set(days.map((day) => day.monthName)));

export const getNumberOfDaysPerWeekOfYear = (days: Days) => {
  const weeks = Array.from(new Set(days.map((day) => day.weekOfYear)));
  const numberOfDaysPerWeekOfYear = weeks.map((week) => {
    return days.filter((day) => day.weekOfYear === week).length;
  });
  return numberOfDaysPerWeekOfYear;
};

export type Days = ReturnType<typeof getDaysInYear>;

export const getCalendarData = (days: Days) =>
  days.map(({ dayName, dayOfMonth, isBusinessDay, isCurrentDay, weekOfYear }) => ({
    dayName,
    dayOfMonth,
    isBusinessDay,
    isCurrentDay,
    weekOfYear
  }));

export const getDaysInMonths = (days: Days) =>
  getMonths(days).map((month) => days.filter((day) => day.monthName === month).length);
