import dayjs from "dayjs";

export const getDayHoursTaken = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  hoursAssigned: number,
  focusedDay: dayjs.Dayjs
) => {
  const focusedDayNum = focusedDay.isoWeekday();
  if (dayjs(focusedDay).isBetween(startDate, endDate, "day", "[]") && focusedDayNum < 6)
    return hoursAssigned;

  return 0;
};
