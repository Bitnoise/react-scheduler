import { useMemo, useState } from "react";
import { SchedulerData } from "@/types/global";
import { DatesRange } from "@/utils/getDatesRange";
import { splitToPages } from "@/utils/splitToPages";
import { projectsOnGrid } from "@/utils/getProjectsOnGrid";
import { getTotalRowsPerPage } from "@/utils/getTotalRowsPerPage";
import { useCalendar } from "@/context/CalendarProvider";
import { UsePaginationData } from "./types";

export const usePagination = (data: SchedulerData, datesRange: DatesRange): UsePaginationData => {
  const { recordsThreshold } = useCalendar();
  const [startIndex, setStartIndex] = useState(0);
  const [pageNum, setPage] = useState(0);

  const { projectsPerPerson, rowsPerPerson } = projectsOnGrid(data, datesRange);

  const pages = useMemo(
    () => splitToPages(data, projectsPerPerson, rowsPerPerson, recordsThreshold),
    [data, projectsPerPerson, recordsThreshold, rowsPerPerson]
  );

  const next = () => {
    if (pages[pageNum].length) {
      setStartIndex((prev) => prev + pages[Math.max(pageNum, 0)].length);
      setPage((prev) => Math.min(prev + 1, pages.length - 1));
      window.scroll({ top: 0 });
    }
  };

  const previous = () => {
    if (pages[pageNum].length) {
      setStartIndex((prev) => Math.max(prev - pages[pageNum - 1].length, 0));
      setPage((prev) => Math.max(prev - 1, 0));
    }
  };
  const end = startIndex + pages[pageNum].length;
  const rowsPerItem = rowsPerPerson.slice(startIndex, end);

  return {
    page: pages[pageNum],
    currentPageNum: pageNum,
    pagesAmount: pages.length,
    projectsPerPerson,
    rowsPerItem,
    totalRowsPerPage: getTotalRowsPerPage(pages[pageNum]),
    next,
    previous
  };
};
