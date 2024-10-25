import {
  SchedulerItemClickData,
  SchedulerRowLabel,
  PaginatedSchedulerRowSeats
} from "@/types/global";

export type LeftColumnItemProps = {
  id: string;
  item: SchedulerRowLabel;
  rows: number;
  seats: PaginatedSchedulerRowSeats[];
  onItemClick?: (data: SchedulerItemClickData) => void;
};

export type StyledTextProps = {
  isMain?: boolean;
};

export type StyledLeftColumnItemWrapperProps = {
  rows: number;
  clickable: boolean;
};

export type StyledSeatWrapperProps = {
  rows: number;
};
