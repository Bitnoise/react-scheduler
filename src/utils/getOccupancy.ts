import dayjs from "dayjs";
import { maxHoursPerDay, maxHoursPerWeek } from "@/constants";
import { SchedulerProjectData, OccupancyData } from "@/types/global";
import { getWeeksHoursTaken } from "./getWeekHoursTaken";
import { getDayHoursTaken } from "./getDayHoursTaken";

export const getOccupancy = (
  resource: SchedulerProjectData[][],
  resourceIndex: number,
  focusedDate: dayjs.Dayjs,
  zoom: number
): OccupancyData => {
  const focusedWeek = focusedDate.isoWeek();
  const focusedDayNum = focusedDate.dayOfYear();
  if (resourceIndex >= 0) {
    const occupancy = resource.flat(2).filter((item) => {
      if (zoom === 0) {
        const startWeek = dayjs(item.startDate).isoWeek();
        const endWeek = dayjs(item.endDate).isoWeek();
        if (startWeek <= focusedWeek && endWeek >= focusedWeek) {
          return item;
        }
      } else {
        const startDay = dayjs(item.startDate).dayOfYear();
        const endWeek = dayjs(item.endDate).dayOfYear();
        if (startDay <= focusedDayNum && endWeek >= focusedDayNum) {
          return item;
        }
      }
    });

    let hours = 0;

    occupancy.forEach((item) => {
      const startDate = dayjs(item.startDate);
      const endDate = dayjs(item.endDate);
      const hoursAssigned = item.hoursTaken;
      zoom === 0
        ? (hours += getWeeksHoursTaken(startDate, endDate, hoursAssigned, focusedWeek))
        : (hours += getDayHoursTaken(startDate, endDate, hoursAssigned, focusedDate));
    });
    const maxHours = zoom === 0 ? maxHoursPerWeek : maxHoursPerDay;

    const overtime = hours - maxHours;
    const free = maxHours - hours;

    return {
      taken: hours < 0 ? 0 : hours,
      free: free < 0 ? 0 : free,
      overtime: overtime <= 0 ? 0 : overtime
    };
  }
  return { taken: 0, free: 0, overtime: 0 };
};
