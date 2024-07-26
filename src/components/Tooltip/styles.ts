import styled from "styled-components";
import { marginPaddingReset } from "@/styles";

export const StyledTooltipWrapper = styled.div`
  padding: 8px 16px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.tooltip};
  border-radius: 8px;
  z-index: 3;
  transition: all 0.25s;
  transition-timing-function: ease-out;
  pointer-events: none;
`;

export const StyledTooltipContent = styled.div`
  width: 100%;
`;
export const StyledTooltipBeak = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 14px solid ${({ theme }) => theme.colors.tooltip};
`;

export const StyledContentWrapper = styled.div``;
export const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-bottom: 8px;
  }
`;
export const StyledTextWrapper = styled.div`
  ${marginPaddingReset}
  display: flex;
  align-items: center;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 12px;
  letter-spacing: 0.5px;
`;

export const StyledText = styled.p`
  ${marginPaddingReset}
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StyledOvertimeWarning = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.warning};
`;
