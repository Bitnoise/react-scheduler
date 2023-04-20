import styled from "styled-components";
import { dayWidth } from "@/constants";
import { MonthProps } from "./types";

export const StyledMonth = styled.div<Readonly<Pick<MonthProps, "numberOfDays" | "monthNumber">>>`
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  ${({ monthNumber, theme }) => monthNumber === 1 && `border-left: 1px solid ${theme.colors.grey}`};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: ${({ numberOfDays }) => numberOfDays * dayWidth}px;
`;

export const StyledMonthName = styled.span`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
`;
