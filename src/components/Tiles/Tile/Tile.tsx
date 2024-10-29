import { DragEvent, FC } from "react";
import { useTheme } from "styled-components";
import { useCalendar } from "@/context/CalendarProvider";
import { getDatesRange } from "@/utils/getDatesRange";
import { getTileProperties } from "@/utils/getTileProperties";
import { getTileTextColor } from "@/utils/getTileTextColor";
import { StyledStickyWrapper, StyledText, StyledTextWrapper, StyledTileWrapper } from "./styles";
import { TileProps } from "./types";

const Tile: FC<TileProps> = ({ row, data, zoom, room, seat, onTileClick }) => {
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

  const dragStart = (
    event: DragEvent<HTMLButtonElement>,
    meta: { fromRoom: string; fromSeat: string; id: string; width: number }
  ) => {
    event.dataTransfer.setData("application/json", JSON.stringify(meta));
  };

  return (
    <StyledTileWrapper
      draggable={true}
      className="draggable"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: `${data.bgColor ?? colors.defaultTile}`,
        width: `${width}px`,
        color: getTileTextColor(data.bgColor ?? "")
      }}
      onDragStart={(event) =>
        dragStart(event, {
          id: data.id,
          fromRoom: room,
          fromSeat: seat,
          fromStart: data.startDate,
          fromEnd: data.endDate
        })
      }
      onClick={() => onTileClick?.(data)}>
      <StyledTextWrapper>
        <StyledStickyWrapper>
          <StyledText bold>{data.title}</StyledText>
        </StyledStickyWrapper>
      </StyledTextWrapper>
    </StyledTileWrapper>
  );
};

export default Tile;
