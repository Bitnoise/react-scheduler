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
      isBussinessDay: getIsBusinessDay(date),
      isCurrentDay: date.isSame(dayjs(), "day")
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
