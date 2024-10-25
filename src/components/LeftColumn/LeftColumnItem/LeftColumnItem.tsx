import { FC } from "react";
import {
  StyledText,
  StyledTextWrapper,
  StyledSeatWrapper,
  StyledRoomWrapper,
  StyledWrapper
} from "./styles";
import { LeftColumnItemProps } from "./types";

const LeftColumnItem: FC<LeftColumnItemProps> = ({ id, item, rows, seats, onItemClick }) => {
  return (
    <StyledWrapper rows={rows} clickable={typeof onItemClick === "function"}>
      <StyledRoomWrapper>
        <StyledTextWrapper>{item.title}</StyledTextWrapper>
      </StyledRoomWrapper>
      {seats.map((seat, i) => {
        return (
          <StyledSeatWrapper rows={seat.data.length} key={i}>
            <StyledText>{seat.label.title}</StyledText>
          </StyledSeatWrapper>
        );
      })}
    </StyledWrapper>
  );
};

export default LeftColumnItem;
