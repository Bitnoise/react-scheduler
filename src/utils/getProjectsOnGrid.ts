import { SchedulerData, SchedulerProjectData } from "@/types/global";
import { setProjectsInRows } from "./setProjectsInRows";
type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][][], rowsPerPerson: number[]];

export const projectsOnGrid = (data: SchedulerData) => {
  const initialProjectsData: ProjectsData = [[], []];
  const [projectsPerPerson, rowsPerPerson] = data.reduce((acc, curr) => {
    const seats: SchedulerProjectData[][][] = [];
    let numberOfRows = 0;

    curr.seats.forEach((seat) => {
      if (!seat.data.length) {
        seats.push([[]]);
        numberOfRows += 1;
      } else {
        const projectsInRows = setProjectsInRows(seat.data);
        seats.push(projectsInRows);
        numberOfRows += projectsInRows.length;
      }
    });

    acc[0].push(seats);
    acc[1].push(Math.max(numberOfRows + 1));
    return acc;
  }, initialProjectsData);

  return { projectsPerPerson, rowsPerPerson };
};
