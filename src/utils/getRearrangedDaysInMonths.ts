import { months } from "@/constants";
import { Day } from "@/types/global";
import { Days, getDaysInMonths } from "./dates";

export const getRearrangedDaysInMonths = (days: Days, startDate: Day) => {
  const monthIndex = months.findIndex((month) => month === startDate.monthName);
  const daysInMonths = [
    ...getDaysInMonths(days).slice(monthIndex),
    ...getDaysInMonths(days).slice(0, monthIndex)
  ];

  return daysInMonths;
};
