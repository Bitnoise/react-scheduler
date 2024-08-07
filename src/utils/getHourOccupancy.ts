import dayjs from "dayjs";
import { OccupancyData, SchedulerProjectData } from "@/types/global";
import { minutesInHour } from "@/constants";

export const getHourOccupancy = (
  occupancy: SchedulerProjectData[],
  focusedDate: dayjs.Dayjs
): OccupancyData => {
  let minutes = 0;
  occupancy.forEach((item) => {
    const startHour = dayjs(item.startDate).hour();
    const endHour = dayjs(item.endDate).hour();
    const tooltipHour = focusedDate.hour();
    const endMinutes = dayjs(item.endDate).minute();
    const startMinutes = dayjs(item.startDate).minute();
    if (startHour < tooltipHour && endHour > tooltipHour) {
      // Tooltip hour is contained in the event
      minutes += minutesInHour;
    } else if (startHour === tooltipHour && endHour === tooltipHour && startMinutes && endMinutes) {
      // Event is contained in the tooltip hour
      minutes += endMinutes ? endMinutes - startMinutes : minutesInHour - startMinutes;
    } else if (startHour === tooltipHour && endHour >= tooltipHour) {
      // Event start is contained in the tooltip hour
      minutes += startMinutes ? minutesInHour - startMinutes : minutesInHour;
    } else if (endHour === tooltipHour && endMinutes) {
      // Event end is contained in the tooltip hour
      minutes += endMinutes;
    }
  });

  const takenHours = Math.floor(minutes / minutesInHour);
  const takenMinutes = minutes % minutesInHour;
  const freeHours = takenHours || takenMinutes ? 0 : 1;
  const freeMinutes = takenHours ? 0 : takenMinutes ? minutesInHour - takenMinutes : 0;

  return {
    taken: { hours: takenHours, minutes: takenMinutes },
    free: { hours: freeHours, minutes: freeMinutes },
    overtime: { hours: 0, minutes: 0 }
  };
};
