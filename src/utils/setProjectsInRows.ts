import dayjs, { OpUnitType } from "dayjs";
import { SchedulerProjectData, ZoomLevel } from "@/types/global";

const ZOOM_LEVEL_TO_COMPARISON_UNIT: Partial<Record<ZoomLevel, OpUnitType>> = {
  0: "day",
  1: "day",
  2: undefined
};

export const setProjectsInRows = (
  projects: SchedulerProjectData[],
  zoomLevel?: ZoomLevel
): SchedulerProjectData[][] => {
  const rows: SchedulerProjectData[][] = [];
  for (const project of projects) {
    let isAdded = false;
    if (rows.length) {
      for (const row of rows) {
        let isColliding = false;
        for (let i = 0; i < row.length; i++) {
          if (
            dayjs(project.startDate).isSameOrBefore(
              dayjs(row[i].endDate),
              ZOOM_LEVEL_TO_COMPARISON_UNIT[zoomLevel || 0]
            ) &&
            dayjs(project.endDate).isSameOrAfter(
              dayjs(row[i].startDate),
              ZOOM_LEVEL_TO_COMPARISON_UNIT[zoomLevel || 0]
            )
          ) {
            isColliding = true;
            break;
          }
        }
        if (!isColliding) {
          row.push(project);
          isAdded = true;
          break;
        }
      }
    }
    if (!isAdded) {
      rows.push([project]);
    }
  }
  return rows;
};
