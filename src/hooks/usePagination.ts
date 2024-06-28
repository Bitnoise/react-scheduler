import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SchedulerData } from "@/types/global";
import { splitToPages } from "@/utils/splitToPages";
import { projectsOnGrid } from "@/utils/getProjectsOnGrid";
import { getTotalRowsPerPage } from "@/utils/getTotalRowsPerPage";
import { useCalendar } from "@/context/CalendarProvider";
import { outsideWrapperId } from "@/constants";
import { UsePaginationData } from "./types";

export const usePagination = (data: SchedulerData): UsePaginationData => {
  const { recordsThreshold } = useCalendar();
  const [startIndex, setStartIndex] = useState(0);
  const [pageNum, setPage] = useState(0);
  const outsideWrapper = useRef<HTMLElement | null>(null);

  useEffect(() => {
    outsideWrapper.current = document.getElementById(outsideWrapperId);
  }, []);

  const { projectsPerPerson, rowsPerPerson } = useMemo(() => projectsOnGrid(data), [data]);

  const pages = useMemo(
    () => splitToPages(data, projectsPerPerson, rowsPerPerson, recordsThreshold),
    [data, projectsPerPerson, recordsThreshold, rowsPerPerson]
  );

  const next = useCallback(() => {
    if (pages[pageNum].length && outsideWrapper.current) {
      outsideWrapper.current.scroll({ top: 0 });
      setStartIndex((prev) => prev + pages[Math.max(pageNum, 0)].length);
      setPage((prev) => Math.min(prev + 1, pages.length - 1));
      window.scroll({ top: 0 });
    }
  }, [pageNum, pages]);

  const previous = useCallback(() => {
    if (pages[pageNum].length) {
      setStartIndex((prev) => Math.max(prev - pages[pageNum - 1].length, 0));
      setPage((prev) => Math.max(prev - 1, 0));
    }
  }, [pageNum, pages]);

  const reset = useCallback(() => {
    setStartIndex(0);
    setPage(0);
  }, []);

  const end = startIndex + pages[pageNum].length;

  const rowsPerItem = useMemo(
    () => rowsPerPerson.slice(startIndex, end),
    [end, rowsPerPerson, startIndex]
  );

  const projectsPerPage = useMemo(
    () => projectsPerPerson.slice(startIndex, end),
    [end, projectsPerPerson, startIndex]
  );

  return {
    page: pages[pageNum],
    currentPageNum: pageNum,
    pagesAmount: pages.length,
    projectsPerPerson: projectsPerPage,
    rowsPerItem,
    totalRowsPerPage: getTotalRowsPerPage(pages[pageNum]),
    next,
    previous,
    reset
  };
};
