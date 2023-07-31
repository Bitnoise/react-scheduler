import { FC, useState } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import Pagination from "../Pagination/Pagination";
import Icon from "../Icon";
import { StyledInput, StyledInputWrapper, StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({
  data,
  rows,
  onLoadNext,
  onLoadPrevious,
  pageNum,
  pagesAmount,
  searchInputValue,
  onSearchInputChange
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { search } = useLanguage();

  const toggleFocus = () => setIsInputFocused((prev) => !prev);

  return (
    <StyledWrapper>
      <StyledInputWrapper isFocused={isInputFocused}>
        <StyledInput
          placeholder={search}
          value={searchInputValue}
          onChange={onSearchInputChange}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
        />
        <Icon iconName="search" />
      </StyledInputWrapper>
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
