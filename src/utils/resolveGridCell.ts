import dayjs from "dayjs";
import { boxHeight } from "@/constants";
import { Coords, Day } from "@/types/global";
import { getCellTimeUnit, getCellWidth } from "./zoomUnits";

export type GridCell = {
  date: Date;
  resourceIndex: number;
};

/**
 * Resolves the date and resource row under a given point inside the grid canvas,
 * from the same column/row geometry the grid itself is drawn with.
 */
export const resolveGridCell = (
  startDate: Day,
  cursorPosition: Coords,
  rowsPerPerson: number[],
  zoom: number
): GridCell => {
  const cellWidth = getCellWidth(zoom);
  const column =
    zoom === 2
      ? Math.ceil((cursorPosition.x - 0.5 * cellWidth) / cellWidth)
      : Math.ceil(cursorPosition.x / cellWidth);
  const date = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  )
    .add(column - 1, getCellTimeUnit(zoom))
    .toDate();

  const rowPosition = Math.ceil(cursorPosition.y / boxHeight);
  const resourceIndex = rowsPerPerson.findIndex((_, index, array) => {
    const sumOfRows = array.slice(0, index + 1).reduce((acc, cur) => acc + cur, 0);
    return sumOfRows >= rowPosition;
  });

  return { date, resourceIndex };
};

export type CellRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * The inverse of resolveGridCell: the pixel rect of a given resource row's cell on a
 * given date, on the top (first) sub-row of that resource.
 */
export const getCellRect = (
  startDate: Day,
  rowsPerPerson: number[],
  resourceIndex: number,
  date: Date,
  zoom: number
): CellRect | null => {
  if (resourceIndex < 0 || resourceIndex >= rowsPerPerson.length) {
    return null;
  }

  const cellWidth = getCellWidth(zoom);
  const rangeStart = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T${startDate.hour}:00:00`
  );
  const unitsElapsed = dayjs(date).diff(rangeStart, getCellTimeUnit(zoom));
  const x = zoom === 2 ? (unitsElapsed + 0.5) * cellWidth : unitsElapsed * cellWidth;

  const rowsBefore = rowsPerPerson.slice(0, resourceIndex).reduce((acc, cur) => acc + cur, 0);

  return { x, y: rowsBefore * boxHeight, width: cellWidth, height: boxHeight };
};

/**
 * The pixel rect spanning every cell between rangeStart and rangeEnd (inclusive), on a
 * single resource row. The two dates may be given in either order (e.g. when a selection
 * is dragged leftwards from its anchor).
 */
export const getCellRangeRect = (
  startDate: Day,
  rowsPerPerson: number[],
  resourceIndex: number,
  rangeStart: Date,
  rangeEnd: Date,
  zoom: number
): CellRect | null => {
  const [from, to] =
    rangeStart.getTime() <= rangeEnd.getTime() ? [rangeStart, rangeEnd] : [rangeEnd, rangeStart];
  const firstCell = getCellRect(startDate, rowsPerPerson, resourceIndex, from, zoom);
  const lastCell = getCellRect(startDate, rowsPerPerson, resourceIndex, to, zoom);
  if (!firstCell || !lastCell) {
    return null;
  }

  return {
    x: firstCell.x,
    y: firstCell.y,
    width: lastCell.x + lastCell.width - firstCell.x,
    height: firstCell.height
  };
};
