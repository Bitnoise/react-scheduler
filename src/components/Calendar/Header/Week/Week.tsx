import { StyledWeek, StyledWeekName, StyledWeekNumber } from "./styles";
import { WeekProps } from "./types";

const Week = ({ weekNumber, numberOfDays }: WeekProps) => {
  return (
    <StyledWeek numberOfDays={numberOfDays} weekNumber={weekNumber}>
      <StyledWeekName>Tydzień</StyledWeekName>
      <StyledWeekNumber>{weekNumber}</StyledWeekNumber>
    </StyledWeek>
  );
};

export default Week;
