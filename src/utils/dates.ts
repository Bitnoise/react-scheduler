import dayjs from "dayjs";
import { Day } from "@/types/global";

export const daysInYear = (year: number) =>
  (year % 4 === 0 && year % 100 > 0) || year % 400 === 0 ? 366 : 365;

export const getIsBusinessDay = (date: dayjs.Dayjs) => {
  const day = date.day();
  return day !== 0 && day !== 6;
};

export const getDaysInMonths = (date: Day, iterator: number) =>
  dayjs(`${date.year}-${date.month + 1}-${date.dayOfMonth}`)
    .add(iterator, "months")
    .daysInMonth();

export const parseDay = (data: dayjs.Dayjs): Day => {
  return {
    hour: data.hour(),
    dayName: data.format("ddd"),
    dayOfMonth: data.date(),
    weekOfYear: data.isoWeek(),
    month: data.month(),
    monthName: data.format("MMMM"),
    isBusinessDay: getIsBusinessDay(data),
    isCurrentDay: data.isSame(dayjs(), "day"),
    year: parseInt(data.format("YYYY"))
  };
};
