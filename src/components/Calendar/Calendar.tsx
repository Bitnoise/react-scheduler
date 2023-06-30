import { FC } from "react";
import { useCalendar } from "@/context/CalendarProvider";
import { setProjectsInRows } from "@/utils/setProjectsInRows";
import { Grid, Header, LeftColumn, Tile } from "..";
import { CalendarProps, ProjectsData, Tiles } from "./types";
import { StyledOuterWrapper, StyledInnerWrapper } from "./styles";

export const Calendar: FC<CalendarProps> = ({ data }) => {
  const { zoom } = useCalendar();
  const initialProjectsData: ProjectsData = [[], []];

  const [projectsPerPerson, rowsPerPerson] = data.reduce((acc, curr) => {
    const projectsInRows = setProjectsInRows(curr.data);
    acc[0].push(projectsInRows);
    acc[1].push(projectsInRows.length);

    return acc;
  }, initialProjectsData);

  const rowsInTotal = rowsPerPerson.reduce((a, b) => a + Math.max(b, 1), 0);

  const placeTiles = (): Tiles => {
    let rows = 0;
    return projectsPerPerson.map((person, personIndex) => {
      if (personIndex > 0) {
        rows += Math.max(projectsPerPerson[personIndex - 1].length, 1);
      }
      return person.map((projectsPerRow, rowIndex) =>
        projectsPerRow.map((project) => (
          <Tile
            key={project.title + project.subtitle + project.description}
            row={rowIndex + rows}
            data={project}
            zoom={zoom}
          />
        ))
      );
    });
  };
  return (
    <StyledOuterWrapper>
      <LeftColumn data={data} rows={rowsPerPerson} />
      <StyledInnerWrapper>
        <Header zoom={zoom} />
        <Grid zoom={zoom} rows={rowsInTotal} />
        {placeTiles()}
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default Calendar;
