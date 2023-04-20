import styled from "styled-components";
import { dayWidth } from "@/constants";
import { MonthProps } from "./types";

export const StyledMonth = styled.div<Readonly<Pick<MonthProps, "numberOfDays" | "monthNumber">>>`
  background-color: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.grey};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  border-top: 1px solid ${(props) => props.theme.colors.grey};
  ${(props) => props.monthNumber === 1 && `border-left: 1px solid ${props.theme.colors.grey}`};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: ${(props) => props.numberOfDays * dayWidth}px;
`;

export const StyledMonthName = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
`;
