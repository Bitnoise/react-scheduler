export type ZoomLevel = 0 | 1;

export type Config = {
  zoom: ZoomLevel;
  isFiltersVisible?: boolean;
};

export type SchedulerData = SchedulerRow[];

export type SchedulerRow = {
  label: SchedulerRowLabel;
  data: SchedulerRowData[];
};
export type SchedulerRowLabel = {
  icon: string;
  title: string;
  subtitle: string;
};
export type SchedulerRowData = {
  startDate: Date;
  endDate: Date;
  title: string;
  subtitle?: string;
  description?: string;
};
