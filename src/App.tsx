import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "./mock/appMock";
import { ParsedDatesRange } from "./utils/getDatesRange";
import { SchedulerProjectData } from "./types/global";
import { Scheduler } from ".";

const mocked = createMockData(25, 5, 8);

function App() {
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
          dayjs(project.endDate).isBetween(range.startDate, range.endDate)
      )
    };
  });

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const handleItemClick = (data: SchedulerProjectData) =>
    console.log(`Item ${data.title} - ${data.subtitle} was clicked.`);

  return (
    <Scheduler
      onRangeChange={handleRangeChange}
      data={filteredData}
      onItemClick={handleItemClick}
      onFilterData={handleFilterData}
    />
  );
}

export default App;
