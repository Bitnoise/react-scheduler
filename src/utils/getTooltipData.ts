import dayjs from "dayjs";
import { weekWidth, boxHeight, dayWidth, zoom2ColumnWidth } from "@/constants";
import { Day, Coords, SchedulerProjectData, TooltipData, ZoomLevel } from "@/types/global";
import { getOccupancy } from "./getOccupancy";

export const getTooltipData = (
  startDate: Day,
  cursorPosition: Coords,
  rowsPerPerson: number[],
  resourcesData: SchedulerProjectData[][][],
  zoom: ZoomLevel,
  includeTakenHoursOnWeekendsInDayView = false
): TooltipData => {
  let timeUnit: dayjs.ManipulateType = "weeks";
  let currBoxWidth;
  switch (zoom) {
    case 0:
      timeUnit = "weeks";
      currBoxWidth = weekWidth;
      break;
    case 1:
      timeUnit = "days";
      currBoxWidth = dayWidth;
      break;
    case 2:
      timeUnit = "hours";
      currBoxWidth = zoom2ColumnWidth;
      break;
  }
  const column =
    zoom === 2
      ? Math.ceil((cursorPosition.x - 0.5 * currBoxWidth) / currBoxWidth)
      : Math.ceil(cursorPosition.x / currBoxWidth);
  const focusedDate = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  ).add(column - 1, timeUnit);

  const rowPosition = Math.ceil(cursorPosition.y / boxHeight);
  const resourceIndex = rowsPerPerson.findIndex((_, index, array) => {
    const sumOfRows = array.slice(0, index + 1).reduce((acc, cur) => acc + cur, 0);
    return sumOfRows >= rowPosition;
  });
  const xPos = zoom === 2 ? (column + 1) * currBoxWidth : column * currBoxWidth;
  const yPos = (rowPosition - 1) * boxHeight + boxHeight;

  const disposition = getOccupancy(
    resourcesData[resourceIndex],
    resourceIndex,
    focusedDate,
    zoom,
    includeTakenHoursOnWeekendsInDayView
  );
  return { coords: { x: xPos, y: yPos }, resourceIndex, disposition };
};
