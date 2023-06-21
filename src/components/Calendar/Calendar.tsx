import { FC } from "react";
import { getDaysInYear } from "@/utils/dates";
import { useCalendar } from "@/context/CalendarProvider";
import { Grid, LeftColumn } from "..";
import { CalendarProps } from "./types";
import { StyledWrapper } from "./styles";

export const Calendar: FC<CalendarProps> = ({ data }) => {
  const { zoom } = useCalendar();
  const days = getDaysInYear(new Date().getFullYear());
  const rows = data.map((item) => item.data.length).reduce((a, b) => a + b, 0);

  return (
    <StyledWrapper>
      <LeftColumn data={data} />
      <Grid days={days} zoom={zoom} rows={rows} />
    </StyledWrapper>
  );
};

export default Calendar;
