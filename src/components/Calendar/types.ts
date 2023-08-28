import { SchedulerData, SchedulerProjectData } from "@/types/global";

export type CalendarProps = {
  data: SchedulerData;
  onTileClick?: (data: SchedulerProjectData) => void;
  topBarWidth: number;
};

export type StyledSpanProps = {
  position: "left" | "right";
};

export type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];
