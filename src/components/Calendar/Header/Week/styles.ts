import styled from "styled-components";
import { dayWidth } from "@/constants";
import { WeekProps } from "./types";

export const StyledWeek = styled.div<Readonly<Pick<WeekProps, "numberOfDays" | "weekNumber">>>`
  background-color: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.grey};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  ${(props) => props.weekNumber === 1 && `border-left: 1px solid ${props.theme.colors.grey}`};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: ${dayWidth * 7}px;
  width: ${(props) => dayWidth * props.numberOfDays}px;
  height: 16px;
`;

export const StyledWeekName = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-weight: 400;
  font-size: 10px;
  line-height: 21px;
  text-transform: uppercase;
`;

export const StyledWeekNumber = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-weight: 600;
  font-size: 10px;
  line-height: 21px;
`;
