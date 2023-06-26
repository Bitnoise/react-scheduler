import { FC } from "react";
import { useCalendar } from "@/context/CalendarProvider";
import { Grid, Header, LeftColumn } from "..";
import { CalendarProps } from "./types";
import { StyledOuterWrapper, StyledInnerWrapper } from "./styles";

export const Calendar: FC<CalendarProps> = ({ data }) => {
  const { zoom } = useCalendar();
  const rows = data.map((item) => item.data.length).reduce((a, b) => a + b, 0);
  return (
    <StyledOuterWrapper>
      <LeftColumn data={data} />
      <StyledInnerWrapper>
        <Header zoom={zoom} />
        <Grid zoom={zoom} rows={rows} />
      </StyledInnerWrapper>
    </StyledOuterWrapper>
  );
};

export default Calendar;
