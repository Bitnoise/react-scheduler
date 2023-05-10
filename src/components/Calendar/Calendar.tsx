import { FC } from "react";
import { getDaysInYear } from "@/utils/dates";
import { useCalendar } from "@/context/CalendarProvider";
import { Grid } from "..";
import { CalendarProps } from "./types";

export const Calendar: FC<CalendarProps> = ({ data }) => {
  const { zoom } = useCalendar();
  const days = getDaysInYear(new Date().getFullYear());

  return <Grid days={days} zoom={zoom} rows={data.length} />;
};

export default Calendar;
