import { mockedData, mockedOnRangeChange } from "./mock/appMock";
import { Scheduler } from ".";

function App() {
  return <Scheduler onRangeChange={mockedOnRangeChange} data={mockedData} />;
}

export default App;
