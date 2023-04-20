import styled from "styled-components";
import { dayWidth } from "@/constants";
import { WeekProps } from "./types";

export const StyledWeek = styled.div<Readonly<Pick<WeekProps, "numberOfDays" | "weekNumber">>>`
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  ${({ weekNumber, theme }) => weekNumber === 1 && `border-left: 1px solid ${theme.colors.grey}`};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: ${dayWidth * 7}px;
  width: ${({ numberOfDays }) => dayWidth * numberOfDays}px;
  height: 16px;
`;

export const StyledWeekName = styled.span`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: 400;
  font-size: 10px;
  line-height: 21px;
  text-transform: uppercase;
`;

export const StyledWeekNumber = styled.span`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: 600;
  font-size: 10px;
  line-height: 21px;
`;
