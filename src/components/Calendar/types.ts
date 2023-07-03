import { SchedulerData, SchedulerProjectData } from "@/types/global";

export type CalendarProps = {
  data: SchedulerData;
};

export type StyledSpanProps = {
  position: "left" | "right";
};

export type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];
