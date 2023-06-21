import { createMockData, mockedOnRangeChange } from "./mock/appMock";
import { Scheduler } from ".";

function App() {
  const mockedData = createMockData(30, new Date().getFullYear());
  return <Scheduler onRangeChange={mockedOnRangeChange} data={mockedData} />;
}

export default App;
