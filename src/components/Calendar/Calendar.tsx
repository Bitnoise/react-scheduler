import { FC, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useCalendar } from "@/context/CalendarProvider";
import { projectsOnGrid } from "@/utils/getProjectsOnGrid";
import { TooltipData } from "@/types/global";
import { getTooltipData } from "@/utils/getTooltipData";
import { Grid, Header, LeftColumn, Tooltip } from "..";
import { CalendarProps } from "./types";
import { StyledOuterWrapper, StyledInnerWrapper } from "./styles";

export const Calendar: FC<CalendarProps> = ({ data, onItemClick, topBarWidth }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { zoom, startDate } = useCalendar();
  const gridRef = useRef<HTMLDivElement>(null);
  const { projectsPerPerson, rowsPerPerson } = useMemo(() => projectsOnGrid(data), [data]);

  const [tooltipData, setTooltipData] = useState<TooltipData>({
    coords: { x: 0, y: 0 },
    resourceIndex: 0,
    disposition: { taken: 0, free: 0, overtime: 0 }
  });

  const rowsInTotal = rowsPerPerson.reduce((a, b) => a + Math.max(b, 1), 0);

  const handleMouseOver = debounce((e: MouseEvent) => {
    if (gridRef.current) {
      const { left, top } = gridRef.current.getBoundingClientRect();
      const tooltipCoords = { x: e.clientX - left, y: e.clientY - top };
      const {
        coords: { x, y },
        resourceIndex,
        disposition
      } = getTooltipData(startDate, tooltipCoords, rowsPerPerson, projectsPerPerson, zoom);
      setTooltipData({ coords: { x, y }, resourceIndex, disposition });
      setIsVisible(true);
    }
  }, 600);

  useEffect(() => {
    const gridArea = gridRef.current;
    gridArea?.addEventListener("mousemove", handleMouseOver);

    return () => gridArea?.removeEventListener("mousemove", handleMouseOver);
  }, [handleMouseOver, isHovering]);

  return (
    <StyledOuterWrapper>
      <LeftColumn data={data} rows={rowsPerPerson} />
      <StyledInnerWrapper
        onMouseLeave={() => {
          setIsVisible(false);
          setIsHovering(false);
        }}
        onMouseEnter={() => {
          setIsHovering(true);
        }}>
        <Header zoom={zoom} topBarWidth={topBarWidth} />
        <Grid
          data={projectsPerPerson}
          zoom={zoom}
          rows={rowsInTotal}
          ref={gridRef}
          onItemClick={onItemClick}
        />
        {isHovering && isVisible && tooltipData?.resourceIndex > -1 && (
          <Tooltip tooltipData={tooltipData} zoom={zoom} />
        )}
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default Calendar;
