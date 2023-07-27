import { FC } from "react";
import Icon from "../Icon";
import PaginationButton from "./PaginationButton/PaginationButton";
import { PaginationProps } from "./types";

const Pagination: FC<PaginationProps> = ({
  children,
  onLoadNext,
  onLoadPrevious,
  pageNum,
  pagesAmount
}) => {
  return (
    <>
      <PaginationButton
        intent={"previous"}
        icon={<Icon iconName={"arrowUp"} width="16" height="16" />}
        onLoadPrevious={onLoadPrevious}
        isVisible={pageNum !== 0}
      />
      {children && children}
      <PaginationButton
        icon={<Icon iconName="arrowDown" width="16" height="16" />}
        intent={"next"}
        onLoadNext={onLoadNext}
        isVisible={pageNum !== pagesAmount - 1}
      />
    </>
  );
};

export default Pagination;
