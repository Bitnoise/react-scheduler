import { getDaysInYear } from "@/utils/dates";
import { Grid } from "..";

export const Calendar = () => {
  const days = getDaysInYear(new Date().getFullYear());

  return <Grid days={days} />;
};
export default Calendar;
