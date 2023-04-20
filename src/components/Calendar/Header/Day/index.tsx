import { StyledDay, StyledDayName, StyledDayNumber } from "./styles";
import { DayProps } from "./types";

const Day = ({ name, dayOfYear, isCurrentDay = false, isBussinessDay = false }: DayProps) => {
  return (
    <StyledDay isCurrentDay={isCurrentDay} isBussinessDay={isBussinessDay} dayOfYear={dayOfYear}>
      <StyledDayName isCurrentDay={isCurrentDay} isBussinessDay={isBussinessDay}>
        {name}
      </StyledDayName>
      <StyledDayNumber isBussinessDay={isBussinessDay} isCurrentDay={isCurrentDay}>
        {dayOfYear}
      </StyledDayNumber>
    </StyledDay>
  );
};

export default Day;
