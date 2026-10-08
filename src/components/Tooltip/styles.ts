import styled, { IStyledComponent } from "styled-components";
import { marginPaddingReset } from "@/styles";

export const StyledTooltipWrapper: IStyledComponent<any, any> = styled.div`
  padding: 10px 12px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.tooltip};
  border-radius: 10px;
  box-shadow:
    0 10px 24px rgba(16, 24, 40, 0.22),
    0 2px 6px rgba(16, 24, 40, 0.12);
  z-index: 3;
  transition: all 0.25s;
  transition-timing-function: ease-out;
  pointer-events: none;
`;

export const StyledTooltipContent: IStyledComponent<any, any> = styled.div`
  width: 100%;
`;
export const StyledTooltipBeak: IStyledComponent<any, any> = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid ${({ theme }) => theme.colors.tooltip};
`;

export const StyledContentWrapper: IStyledComponent<any, any> = styled.div``;
export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-bottom: 6px;
  }
`;
export const StyledTextWrapper: IStyledComponent<any, any> = styled.div`
  ${marginPaddingReset}
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 16px;
`;

export const StyledText: IStyledComponent<any, any> = styled.p`
  ${marginPaddingReset}
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-variant-numeric: tabular-nums;
`;

export const StyledOvertimeWarning: IStyledComponent<any, any> = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warning};
`;
