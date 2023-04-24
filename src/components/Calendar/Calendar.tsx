import { getDaysInYear } from "@/utils/dates";
import { Grid, Header } from "@/components";

const Calendar = () => {
  const days = getDaysInYear(2023);

  return (
    <>
      <Header days={days} />
      <Grid days={days} />
    </>
  );
};
export default Calendar;
