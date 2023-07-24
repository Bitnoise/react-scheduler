import { maxHoursPerDay, maxHoursPerWeek, minutesInHour } from "@/constants";
import { OccupancyData, TimeUnits } from "@/types/global";

export const getTimeOccupancy = (
  timeUnits: TimeUnits,
  zoom: number
): Omit<OccupancyData, "taken"> => {
  const maxHours = zoom === 0 ? maxHoursPerWeek : maxHoursPerDay;

  const getFreeTime = () => {
    let hours = maxHours - timeUnits.hours - 1;
    let minutes = minutesInHour - timeUnits.minutes;

    if (minutes === minutesInHour) {
      hours++;
      minutes = 0;
    }
    return { hours: hours < 0 ? 0 : hours, minutes: hours < 0 ? 0 : minutes };
  };

  const getOvertime = () => {
    const overHours = timeUnits.hours - maxHours;
    const overMinutes = timeUnits.minutes;
    return { hours: overHours < 0 ? 0 : overHours, minutes: overHours < 0 ? 0 : overMinutes };
  };

  return {
    free: { ...getFreeTime() },
    overtime: { ...getOvertime() }
  };
};
