import styled from "styled-components";
import { dayWidth } from "@/constants";
import { DayProps } from "./types";

export const StyledDay = styled.div<
  Readonly<Pick<DayProps, "isCurrentDay" | "isBussinessDay" | "dayOfYear">>
>`
  background-color: ${({ isCurrentDay, isBussinessDay, theme }) => {
    if (isCurrentDay && !isBussinessDay) return theme.colors.accentLight;
    if (isCurrentDay) return theme.colors.accentLight;
    if (isBussinessDay) return theme.colors.superLightBlue;
    return theme.colors.hover;
  }};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  ${({ dayOfYear, theme }) => dayOfYear === 1 && `border-left: 1px solid ${theme.colors.grey}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: ${dayWidth}px;
  height: 40px;
`;

export const StyledDayName = styled.span<
  Readonly<Pick<DayProps, "isCurrentDay" | "isBussinessDay">>
>`
  color: ${({ isBussinessDay, isCurrentDay, theme }) => {
    if (isCurrentDay && !isBussinessDay) return theme.colors.accent;
    if (isCurrentDay) return theme.colors.accent;
    return theme.colors.black;
  }};
  opacity: ${({ isBussinessDay, isCurrentDay }) => (!isBussinessDay && !isCurrentDay ? 0.5 : 1)};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
`;

export const StyledDayNumber = styled.span<
  Readonly<Pick<DayProps, "isCurrentDay" | "isBussinessDay">>
>`
  color: ${({ theme }) => theme.colors.darkGrey};
  opacity: ${({ isBussinessDay, isCurrentDay }) => (!isBussinessDay && !isCurrentDay ? 0.5 : 1)};
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
`;
