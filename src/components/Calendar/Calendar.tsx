import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useCalendar } from "@/context/CalendarProvider";
import { TooltipData } from "@/types/global";
import { getTooltipData } from "@/utils/getTooltipData";
import { getDatesRange } from "@/utils/getDatesRange";
import { usePagination } from "@/hooks/usePagination";
import EmptyBox from "../EmptyBox";
import { Grid, Header, LeftColumn, Tooltip } from "..";
import { CalendarProps } from "./types";
import { StyledOuterWrapper, StyledInnerWrapper } from "./styles";

const initialTooltipData: TooltipData = {
  coords: { x: 0, y: 0 },
  resourceIndex: 0,
  disposition: {
    taken: { hours: 0, minutes: 0 },
    free: { hours: 0, minutes: 0 },
    overtime: { hours: 0, minutes: 0 }
  }
};

export const Calendar: FC<CalendarProps> = ({ data, onItemClick, topBarWidth }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData>(initialTooltipData);
  const [isVisible, setIsVisible] = useState(false);
  const { zoom, startDate, date } = useCalendar();
  const gridRef = useRef<HTMLDivElement>(null);
  const datesRange = useMemo(() => getDatesRange(date, zoom), [date, zoom]);

  const {
    page,
    projectsPerPerson,
    totalRowsPerPage,
    rowsPerItem,
    currentPageNum,
    pagesAmount,
    next,
    previous
  } = usePagination(data, datesRange);

  const debouncedHandleMouseOver = useCallback(
    () =>
      debounce((e: MouseEvent) => {
        if (!gridRef.current) return;

        const { left, top } = gridRef.current.getBoundingClientRect();
        const tooltipCoords = { x: e.clientX - left, y: e.clientY - top };
        const {
          coords: { x, y },
          resourceIndex,
          disposition
        } = getTooltipData(startDate, tooltipCoords, rowsPerItem, projectsPerPerson, zoom);
        setTooltipData({ coords: { x, y }, resourceIndex, disposition });
        setIsVisible(true);
      }, 600),
    [projectsPerPerson, rowsPerItem, startDate, zoom]
  );

  const handleMouseLeave = useCallback(() => {
    debouncedHandleMouseOver().cancel();
    setIsVisible(false);
    setTooltipData(initialTooltipData);
  }, [debouncedHandleMouseOver]);

  useEffect(() => {
    const handleMouseOver = debouncedHandleMouseOver();
    const gridArea = gridRef.current;

    if (!gridArea) return;

    gridArea.addEventListener("mousemove", handleMouseOver);
    gridArea.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      gridArea.removeEventListener("mousemove", handleMouseOver);
      gridArea.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [debouncedHandleMouseOver, handleMouseLeave]);

  return (
    <StyledOuterWrapper>
      <LeftColumn
        data={page}
        pageNum={currentPageNum}
        pagesAmount={pagesAmount}
        rows={rowsPerItem}
        onLoadNext={next}
        onLoadPrevious={previous}
      />
      <StyledInnerWrapper>
        <Header zoom={zoom} topBarWidth={topBarWidth} />
        {data.length ? (
          <Grid
            data={page}
            zoom={zoom}
            rows={totalRowsPerPage}
            ref={gridRef}
            onItemClick={onItemClick}
          />
        ) : (
          <EmptyBox />
        )}
        {isVisible && tooltipData?.resourceIndex > -1 && (
          <Tooltip tooltipData={tooltipData} zoom={zoom} />
        )}
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default Calendar;
