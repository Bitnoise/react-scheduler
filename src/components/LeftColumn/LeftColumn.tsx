import { FC } from "react";
import { StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({ data, rows }) => {
  return (
    <StyledWrapper>
      {data.map((item, index) => (
        <LeftColumnItem item={item.label} key={item.id} rows={rows[index]} />
      ))}
    </StyledWrapper>
  );
};

export default LeftColumn;
