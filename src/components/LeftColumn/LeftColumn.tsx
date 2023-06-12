import { FC } from "react";
import { StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({ data }) => {
  return (
    <StyledWrapper>
      {data.map((item, index) => (
        <LeftColumnItem item={item.label} key={index} rows={item.data.length} />
      ))}
    </StyledWrapper>
  );
};

export default LeftColumn;
