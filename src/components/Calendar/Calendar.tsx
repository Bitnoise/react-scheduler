import { FC, useMemo } from "react";
import { useCalendar } from "@/context/CalendarProvider";
import { projectsOnGrid } from "@/utils/getProjectsOnGrid";
import { Grid, Header, LeftColumn, Tiles } from "..";
import { CalendarProps } from "./types";
import { StyledOuterWrapper, StyledInnerWrapper } from "./styles";

export const Calendar: FC<CalendarProps> = ({ data, onItemClick }) => {
  const { zoom } = useCalendar();

  const { projectsPerPerson, rowsPerPerson } = useMemo(() => {
    return projectsOnGrid(data);
  }, [data]);

  const rowsInTotal = rowsPerPerson.reduce((a, b) => a + Math.max(b, 1), 0);

  return (
    <StyledOuterWrapper>
      <LeftColumn data={data} rows={rowsPerPerson} />
      <StyledInnerWrapper>
        <Header zoom={zoom} />
        <Grid zoom={zoom} rows={rowsInTotal} />
        <Tiles data={projectsPerPerson} zoom={zoom} onItemClick={onItemClick} />
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default Calendar;
