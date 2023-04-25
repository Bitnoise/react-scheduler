import CalendarProvider from "./context/CalendarProvider";
import { Scheduler } from ".";

function App() {
  return (
    <CalendarProvider>
      <Scheduler />;
    </CalendarProvider>
  );
}

export default App;
