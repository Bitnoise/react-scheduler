import dayjs from "dayjs";
import { businessDays } from "@/constants";

export const getWeeksHoursTaken = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  hoursAssigned: number,
  focusedWeek: number
) => {
  let hours = 0;

  const startWeekNum = startDate.isoWeek();
  const startDateDayNum = startDate.isoWeekday();
  const endWeekNum = endDate.isoWeek();
  const endDateDayNum = endDate.isoWeekday();

  if (focusedWeek > startWeekNum && focusedWeek < endWeekNum) {
    hours = businessDays * hoursAssigned;
  } else if (focusedWeek === startWeekNum) {
    hours = (businessDays + 1 - startDateDayNum) * hoursAssigned;
  } else if (focusedWeek === endWeekNum) {
    hours =
      endDateDayNum > businessDays ? businessDays * hoursAssigned : endDateDayNum * hoursAssigned;
  }
  return hours;
};
