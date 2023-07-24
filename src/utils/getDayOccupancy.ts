import dayjs from "dayjs";
import { SchedulerProjectData, TimeUnits } from "@/types/global";
import { getDuration } from "./getDuration";
import { getTotalHoursAndMinutes } from "./getTotalHoursAndMinutes";
import { getTimeOccupancy } from "./getTimeOccupancy";

export const getDayOccupancy = (
  occupancy: SchedulerProjectData[],
  focusedDate: dayjs.Dayjs,
  zoom: number
) => {
  const focusedDayNum = focusedDate.isoWeekday();
  const getHoursAndMinutes: TimeUnits[] = occupancy.map((item) => {
    const { hours: itemHours, minutes: itemMinutes } = getDuration(item.occupancy);

    if (focusedDayNum < 6) {
      return { hours: itemHours, minutes: itemMinutes };
    }
    return { hours: 0, minutes: 0 };
  });

  const { hours: totalHours, minutes: totalMinutes } = getTotalHoursAndMinutes(getHoursAndMinutes);
  const { free, overtime } = getTimeOccupancy({ hours: totalHours, minutes: totalMinutes }, zoom);

  return {
    taken: { hours: totalHours < 0 ? 0 : totalHours, minutes: totalMinutes < 0 ? 0 : totalMinutes },
    free: { ...free },
    overtime: { ...overtime }
  };
};
