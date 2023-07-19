import { SchedulerData, SchedulerProjectData } from "@/types/global";
import { setProjectsInRows } from "./setProjectsInRows";
import { DatesRange } from "./getDatesRange";

type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];

export const projectsOnGrid = (data: SchedulerData, datesRange: DatesRange) => {
  const initialProjectsData: ProjectsData = [[], []];
  const [projectsPerPerson, rowsPerPerson] = data.reduce((acc, curr) => {
    const projectsInRows = setProjectsInRows(curr.data, datesRange);
    acc[0].push(projectsInRows);
    acc[1].push(Math.max(projectsInRows.length, 1));
    return acc;
  }, initialProjectsData);
  return { projectsPerPerson, rowsPerPerson };
};
