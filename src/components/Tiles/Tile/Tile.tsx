import { DragEvent, FC } from "react";
import { useTheme } from "styled-components";
import { useCalendar } from "@/context/CalendarProvider";
import { getDatesRange } from "@/utils/getDatesRange";
import { getTileProperties } from "@/utils/getTileProperties";
import { getTileTextColor } from "@/utils/getTileTextColor";
import { getCellWidth } from "@/utils/zoomUnits";
import {
  StyledDescription,
  StyledStickyWrapper,
  StyledText,
  StyledTextWrapper,
  StyledTileWrapper
} from "./styles";
import { TileProps } from "./types";

const Tile: FC<TileProps> = ({
  row,
  data,
  zoom,
  onTileClick,
  draggable,
  onDragStart,
  onDragEnd,
  preview
}) => {
  const { date } = useCalendar();
  const datesRange = getDatesRange(date, zoom);
  const { y, x, width } = getTileProperties(
    row,
    datesRange.startDate,
    datesRange.endDate,
    data.startDate,
    data.endDate,
    zoom
  );

  const { colors } = useTheme();

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    const { left } = e.currentTarget.getBoundingClientRect();
    const grabOffset = Math.floor((e.clientX - left) / getCellWidth(zoom));
    e.dataTransfer.setData("application/json", JSON.stringify({ id: data.id, grabOffset }));
    e.dataTransfer.effectAllowed = "move";
    onDragStart?.(grabOffset);
  };

  return (
    <StyledTileWrapper
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: `${data.bgColor ?? colors.defaultTile}`,
        width: `${width}px`,
        color: getTileTextColor(data.bgColor ?? ""),
        ...data.style
      }}
      onClick={preview ? undefined : () => onTileClick?.(data)}
      draggable={draggable && !preview}
      onDragStart={draggable && !preview ? handleDragStart : undefined}
      onDragEnd={draggable && !preview ? onDragEnd : undefined}
      $preview={preview}
      aria-hidden={preview || undefined}
      tabIndex={preview ? -1 : undefined}
    >
      <StyledTextWrapper>
        <StyledStickyWrapper>
          <StyledText $bold>{data.title}</StyledText>
          <StyledText>{data.subtitle}</StyledText>
          <StyledDescription>{data.description}</StyledDescription>
        </StyledStickyWrapper>
      </StyledTextWrapper>
    </StyledTileWrapper>
  );
};

export default Tile;
