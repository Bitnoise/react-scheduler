import {
  SchedulerData,
  SchedulerItemClickData,
  SchedulerProjectData,
  From,
  To
} from "@/types/global";

export type CalendarProps = {
  data: SchedulerData;
  topBarWidth: number;
  onTileClick?: (data: SchedulerProjectData) => void;
  onItemClick?: (data: SchedulerItemClickData) => void;
  onItemDrop: (from: From, to: To) => void;
  toggleTheme?: () => void;
};

export type StyledSpanProps = {
  position: "left" | "right";
};

export type ProjectsData = [projectsPerPerson: SchedulerProjectData[][][], rowsPerPerson: number[]];
