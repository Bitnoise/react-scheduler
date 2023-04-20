import { StyledMonth, StyledMonthName } from "./styles";
import { MonthProps } from "./types";

const Month = ({ monthName, numberOfDays, monthNumber }: MonthProps) => {
  return (
    <StyledMonth numberOfDays={numberOfDays} monthNumber={monthNumber}>
      <StyledMonthName>{monthName}</StyledMonthName>
    </StyledMonth>
  );
};

export default Month;
