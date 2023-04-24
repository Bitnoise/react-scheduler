import { getMonths, getNumberOfDaysPerWeekOfYear } from "@/utils/dates";
import { Week, Month, Day } from "@/components";
import { StyledHeader, StyledHeaderRow } from "./styles";
import { HeaderProps } from "./types";

const Header = ({ days }: HeaderProps) => {
  return (
    <StyledHeader>
      <StyledHeaderRow>
        {getMonths(days).map((month, index) => {
          const numberOfDays = days.filter((day) => day.monthName === month).length;
          return (
            <Month
              key={month}
              monthName={month}
              numberOfDays={numberOfDays}
              monthNumber={index + 1}
            />
          );
        })}
      </StyledHeaderRow>
      <StyledHeaderRow>
        {getNumberOfDaysPerWeekOfYear(days).map((numberOfDays, index) => {
          return <Week key={index} weekNumber={index + 1} numberOfDays={numberOfDays} />;
        })}
      </StyledHeaderRow>
      <StyledHeaderRow>
        {days.map((day, index) => {
          return (
            <Day
              key={index}
              name={day.dayName}
              dayOfYear={day.dayOfMonth}
              isCurrentDay={day.isCurrentDay}
              isBussinessDay={day.isBussinessDay}
            />
          );
        })}
      </StyledHeaderRow>
    </StyledHeader>
  );
};

export default Header;
