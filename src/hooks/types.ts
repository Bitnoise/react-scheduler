import { PaginatedSchedulerData, SchedulerProjectData } from "@/types/global";

export type UsePaginationData = {
  /**
   * Represents paginated data on current page
   */
  page: PaginatedSchedulerData;
  /**
   * Current page number
   */
  currentPageNum: number;
  /**
   * Total amount of pages
   */
  pagesAmount: number;
  /**
   * Sorted resources per item.
   */
  projectsPerPerson: SchedulerProjectData[][][];
  /**
   * Amount of rows per item
   */
  rowsPerItem: number[];
  /**
   * Total amount of rows displayed on current page
   */
  totalRowsPerPage: number;
  /**
   * Callback function to load next page
   */
  next: () => void;
  /**
   * Callback function to load previous page
   */
  previous: () => void;

  /**
   * Jumps to first page
   */
  reset: () => void;
};
