import { FC, useRef } from "react";
import { dayWidth, weekWidth } from "@/constants";
import { useLanguage } from "@/context/LocaleProvider";
import Icon from "../Icon";
import {
  StyledContentWrapper,
  StyledInnerWrapper,
  StyledOvertimeWarning,
  StyledText,
  StyledTextWrapper,
  StyledTooltipBeak,
  StyledTooltipContent,
  StyledTooltipWrapper
} from "./styles";
import { TooltipProps } from "./types";

const Tooltip: FC<TooltipProps> = ({ tooltipData, zoom }) => {
  const { taken, free, over } = useLanguage();

  const { coords, disposition } = tooltipData;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const width = zoom === 0 ? weekWidth : dayWidth;
  const xOffset = width / 2 + (tooltipRef.current?.offsetWidth ?? 0) / 2;
  const xPos = coords.x - xOffset;
  return (
    <StyledTooltipWrapper ref={tooltipRef} x={xPos} y={coords.y}>
      <StyledTooltipContent>
        <StyledContentWrapper>
          <StyledInnerWrapper>
            <Icon iconName="calendarWarning" height="14" />
            <StyledTextWrapper>
              <StyledText>{`${taken}: ${disposition.taken}h`}</StyledText>
              {disposition.overtime > 0 && (
                <>
                  &nbsp;{"-"}&nbsp;
                  <StyledOvertimeWarning>{`${disposition.overtime} ${over}`}</StyledOvertimeWarning>
                </>
              )}
            </StyledTextWrapper>
          </StyledInnerWrapper>
          <StyledInnerWrapper>
            <Icon iconName="calendarFree" height="14" />
            <StyledTextWrapper>
              <StyledText>{`${free}: ${disposition.free}h`}</StyledText>
            </StyledTextWrapper>
          </StyledInnerWrapper>
        </StyledContentWrapper>
      </StyledTooltipContent>
      <StyledTooltipBeak />
    </StyledTooltipWrapper>
  );
};

export default Tooltip;
