import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "./mock/appMock";
import { ParsedDatesRange } from "./utils/getDatesRange";
import { ConfigFormValues, SchedulerProjectData } from "./types/global";
import ConfigPanel from "./components/ConfigPanel";
import { StyledSchedulerFrame } from "./styles";
import { Scheduler } from ".";

function App() {
  const [values, setValues] = useState<ConfigFormValues>({
    peopleCount: 5,
    projectsPerYear: 5,
    yearsCovered: 0,
    isFullscreen: true,
    startDate: undefined
  });

  const { peopleCount, projectsPerYear, yearsCovered, isFullscreen } = values;

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

  const filteredData = mocked.map((person) => {
    return {
      ...person,
      data: person.data.filter(
        (project) =>
          dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
          dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
          (dayjs(project.startDate).isBefore(range.startDate, "day") &&
            dayjs(project.endDate).isAfter(range.endDate, "day"))
      )
    };
  });

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const handleItemClick = (data: SchedulerProjectData) =>
    console.log(
      `Item ${data.title} - ${data.subtitle} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nHours per day: ${data.hoursTaken}`
    );

  return (
    <>
      <ConfigPanel values={values} onSubmit={setValues} />

      {isFullscreen ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={filteredData}
          onItemClick={handleItemClick}
          onFilterData={handleFilterData}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            data={filteredData}
            onItemClick={handleItemClick}
            onFilterData={handleFilterData}
          />
        </StyledSchedulerFrame>
      )}
    </>
  );
}

export default App;
