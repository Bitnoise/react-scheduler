import { ThemeProvider } from "styled-components";
import { theme } from "@/styles";
import { Calendar } from "..";

const Scheduler = () => {
  return (
    <ThemeProvider theme={theme}>
      <Calendar />
    </ThemeProvider>
  );
};

export default Scheduler;
