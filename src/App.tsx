import { JSX, useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "./mock/appMock";
import { ParsedDatesRange } from "./utils/getDatesRange";
import {
  CellClickData,
  CellRangeSelectData,
  ConfigFormValues,
  SchedulerProjectData,
  SelectedRange,
  TileMoveData
} from "./types/global";
import ConfigPanel from "./components/ConfigPanel";
import { StyledSchedulerFrame } from "./styles";
import { Scheduler } from ".";

function App(): JSX.Element {
  const [values, setValues] = useState<ConfigFormValues>({
    peopleCount: 15,
    projectsPerYear: 5,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true
  });

  const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;

  const mocked = useMemo(
    () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
    [peopleCount, projectsPerYear, yearsCovered]
  );

  const [range, setRange] = useState<ParsedDatesRange>({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const filteredData = useMemo(
    () =>
      mocked.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      })),
    [mocked, range.endDate, range.startDate]
  );

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const handleTileClick = (data: SchedulerProjectData) =>
    console.log(
      `Item ${data.title} - ${data.subtitle} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nOccupancy: ${data.occupancy}`
    );

  const [selectedCell, setSelectedCell] = useState<SelectedRange | null>(null);

  const handleCellClick = (data: CellClickData) => {
    console.log(`Empty cell clicked. Resource: ${data.resourceId}, date: ${data.date}`);
    setSelectedCell({ resourceId: data.resourceId, startDate: data.date, endDate: data.date });
  };

  const handleCellRangeSelect = (data: CellRangeSelectData) => {
    console.log(
      `Cell range selected. Resource: ${data.resourceId}, from ${data.startDate} to ${data.endDate}`
    );
    setSelectedCell(data);
  };

  const handleTileMove = (data: TileMoveData) =>
    console.log(
      `Tile ${data.id} moved from resource ${data.previousResourceId} to ${data.resourceId}. \n==============\nNew start date: ${data.startDate} \n==============\nNew end date: ${data.endDate}`
    );

  return (
    <>
      <ConfigPanel values={values} onSubmit={setValues} />
      {isFullscreen ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={filteredData}
          isLoading={false}
          onTileClick={handleTileClick}
          onCellClick={handleCellClick}
          onCellRangeSelect={handleCellRangeSelect}
          onTileMove={handleTileMove}
          selectedCell={selectedCell}
          onFilterData={handleFilterData}
          config={{ zoom: 1, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true }}
          onItemClick={(data) => console.log("clicked: ", data)}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            isLoading={false}
            data={filteredData}
            onTileClick={handleTileClick}
            onCellClick={handleCellClick}
            onCellRangeSelect={handleCellRangeSelect}
            onTileMove={handleTileMove}
            selectedCell={selectedCell}
            onFilterData={handleFilterData}
            onItemClick={(data) => console.log("clicked: ", data)}
          />
        </StyledSchedulerFrame>
      )}
    </>
  );
}

export default App;
