import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import pl from "dayjs/locale/pl";
import { months } from "@/constants";

dayjs.locale({
  ...pl
});

dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 === 0 ? 366 : 365;

export const getIsBusinessDay = (date: dayjs.Dayjs) => {
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

export type Days = ReturnType<typeof getDaysInYear>;

export const getDaysInMonths = (days: Days) =>
  months.map((month) => days.filter((day) => day.monthName === month).length);

export const parseDay = (data: dayjs.Dayjs) => {
  return {
    dayName: data.format("ddd"),
    dayOfMonth: data.date(),
    weekOfYear: data.week(),
    month: data.month(),
    monthName: data.format("MMMM"),
    isBusinessDay: getIsBusinessDay(data),
    isCurrentDay: data.isSame(dayjs(), "day"),
    year: parseInt(data.format("YYYY"))
  };
};
