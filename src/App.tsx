import { createMockData, mockedOnRangeChange } from "./mock/appMock";
import { Scheduler } from ".";

function App() {
  const mockedData = createMockData(20, 2023);

  return <Scheduler onRangeChange={mockedOnRangeChange} data={mockedData} />;
}

export default App;
