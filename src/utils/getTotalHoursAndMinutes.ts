import { minutesInHour } from "@/constants";
import { TimeUnits } from "@/types/global";

export const getTotalHoursAndMinutes = (item: TimeUnits[]) => {
  let minutesSum = 0;
  let totalHours = 0;
  let totalMinutes = 0;

  item.forEach((item) => {
    minutesSum += item.minutes;
    const additionalHours = Math.floor(minutesSum / minutesInHour);
    totalHours += item.hours + additionalHours;

    totalMinutes += minutesSum % minutesInHour;
    if (totalMinutes >= minutesInHour) {
      totalHours++;
      totalMinutes -= minutesInHour;
    }
  });

  return { hours: totalHours, minutes: totalMinutes };
};
