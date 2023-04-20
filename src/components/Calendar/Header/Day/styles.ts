import styled from "styled-components";
import { dayWidth } from "@/constants";
import { DayProps } from "./types";

export const StyledDay = styled.div<
  Readonly<Pick<DayProps, "isCurrentDay" | "isBussinessDay" | "dayOfYear">>
>`
  background-color: ${(props) => {
    if (props.isCurrentDay && !props.isBussinessDay) return props.theme.colors.accentLight;
    if (props.isCurrentDay) return props.theme.colors.accentLight;
    if (props.isBussinessDay) return props.theme.colors.superLightBlue;
    return props.theme.colors.hover;
  }};
  border-right: 1px solid ${(props) => props.theme.colors.grey};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  ${(props) => props.dayOfYear === 1 && `border-left: 1px solid ${props.theme.colors.grey}`};
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
  color: ${(props) => {
    if (props.isCurrentDay && !props.isBussinessDay) return props.theme.colors.accent;
    if (props.isCurrentDay) return props.theme.colors.accent;
    return props.theme.colors.black;
  }};
  opacity: ${(props) => (!props.isBussinessDay && !props.isCurrentDay ? 0.5 : 1)};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
`;

export const StyledDayNumber = styled.span<
  Readonly<Pick<DayProps, "isCurrentDay" | "isBussinessDay">>
>`
  color: ${(props) => props.theme.colors.darkGrey};
  opacity: ${(props) => (!props.isBussinessDay && !props.isCurrentDay ? 0.5 : 1)};
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
`;
