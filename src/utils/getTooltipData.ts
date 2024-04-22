import dayjs from "dayjs";
import { weekWidth, boxHeight, dayWidth } from "@/constants";
import {
  Day,
  Coords,
  SchedulerProjectData,
  TooltipData,
  ZoomLevel,
  SchedulerData
} from "@/types/global";

export const getTooltipData = (
  startDate: Day,
  cursorPosition: Coords,
  rowsPerPerson: number[],
  resourcesData: SchedulerProjectData[][][],
  zoom: ZoomLevel,
  data: SchedulerData,
  includeTakenHoursOnWeekendsInDayView = false
): TooltipData => {
  const currBoxWidth = zoom === 0 ? weekWidth : dayWidth;
  const column = Math.ceil(cursorPosition.x / currBoxWidth);
  const focusedDate = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    column - 1,
    zoom === 0 ? "weeks" : "days"
  );

  const rowPosition = Math.ceil(cursorPosition.y / boxHeight);

  const resourceIndex = rowsPerPerson.findIndex((_, index, array) => {
    const sumOfRows = array.slice(0, index + 1).reduce((acc, cur) => acc + cur, 0);
    return sumOfRows >= rowPosition;
  });

  let sum = 0;
  let valueIndex = 0;

  for (let i = 0; i <= resourceIndex; i++) {
    sum += rowsPerPerson[i];
    if (sum > rowPosition - 1) {
      valueIndex = rowPosition - 1 - (sum - rowsPerPerson[i]);
      break;
    }
  }

  const xPos = column * currBoxWidth;
  const yPos = (rowPosition - 1) * boxHeight + boxHeight;

  const getProjectID = resourcesData[resourceIndex].flat(2).filter((item) => {
    if (zoom === 0) {
      return (
        dayjs(item.startDate).isBetween(
          dayjs(focusedDate),
          dayjs(focusedDate).add(6, "days"),
          "day",
          "[]"
        ) || dayjs(focusedDate).isBetween(dayjs(item.startDate), dayjs(item.endDate), "day", "[]")
      );
    } else {
      return dayjs(focusedDate).isBetween(item.startDate, item.endDate, "day", "[]");
    }
  });

  const title = getProjectID?.[valueIndex]?.title;
  const subtitle = getProjectID?.[valueIndex]?.subtitle;

  return {
    coords: { x: xPos, y: yPos },
    resourceIndex,
    rowIndex: valueIndex,
    title,
    subtitle
  };
};
