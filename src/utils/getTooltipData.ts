import dayjs from "dayjs";
import { weekWidth, boxHeight, dayWidth } from "@/constants";
import {
  Day,
  Coords,
  SchedulerProjectData,
  TooltipData,
  ZoomLevel,
  FocusedData
} from "@/types/global";
import { getOccupancy } from "./getOccupancy";

export const getTooltipData = (
  startDate: Day,
  cursorPosition: Coords,
  rowsPerPerson: number[],
  resourcesData: SchedulerProjectData[][][],
  zoom: ZoomLevel,
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
  const xPos = column * currBoxWidth;
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

export const focusedData = (
  startDate: Day,
  cursorPosition: Coords,
  zoom: ZoomLevel,
  rowsPerPerson: number[],
  includeTakenHoursOnWeekendsInDayView = false,
  resourcesData: SchedulerProjectData[][][]
): FocusedData => {
  const currBoxWidth = zoom === 0 ? weekWidth : dayWidth;
  const column = Math.ceil(cursorPosition.x / currBoxWidth);
  const data = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    column - 1,
    zoom === 0 ? "week" : "day"
  );
  const focusedDate = dayjs(`${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}`).add(
    column - 1,
    zoom === 0 ? "weeks" : "days"
  );

  const dateFormat = data.format("YYYY-MM-DD");

  const rowPosition = Math.ceil(cursorPosition.y / boxHeight);
  const resourceIndex = rowsPerPerson.findIndex((_, index, array) => {
    const sumOfRows = array.slice(0, index + 1).reduce((acc, cur) => acc + cur, 0);
    return sumOfRows >= rowPosition;
  });

  const disposition = getOccupancy(
    resourcesData[resourceIndex],
    resourceIndex,
    focusedDate,
    zoom,
    includeTakenHoursOnWeekendsInDayView
  );
  const isDayFree = disposition.taken.hours === 0 ? true : false;

  return { date: dateFormat, resourseIndex: resourceIndex, isDayFree: isDayFree };
};
