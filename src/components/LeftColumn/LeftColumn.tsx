import { FC } from "react";
import Pagination from "../Pagination/Pagination";
import { StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({
  data,
  rows,
  onLoadNext,
  onLoadPrevious,
  pageNum,
  pagesAmount
}) => {
  return (
    <StyledWrapper>
      <Pagination
        pageNum={pageNum}
        pagesAmount={pagesAmount}
        onLoadNext={onLoadNext}
        onLoadPrevious={onLoadPrevious}>
        {data.map((item, index) => (
          <LeftColumnItem item={item.label} key={item.id} rows={rows[index]} />
        ))}
      </Pagination>
    </StyledWrapper>
  );
};

export default LeftColumn;
