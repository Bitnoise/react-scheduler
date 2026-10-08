import { SchedulerData, SchedulerProjectData, ZoomLevel } from "@/types/global";
import { setProjectsInRows } from "./setProjectsInRows";

type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];

export const projectsOnGrid = (
  data: SchedulerData,
  zoomLevel?: ZoomLevel
): { projectsPerPerson: SchedulerProjectData[][][]; rowsPerPerson: number[] } => {
  const initialProjectsData: ProjectsData = [[], []];
  const [projectsPerPerson, rowsPerPerson] = data.reduce((acc, curr) => {
    const projectsInRows = setProjectsInRows(curr.data, zoomLevel);
    acc[0].push(projectsInRows);
    acc[1].push(Math.max(projectsInRows.length, 1));
    return acc;
  }, initialProjectsData);
  return { projectsPerPerson, rowsPerPerson };
};
