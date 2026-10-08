import { FC, useRef, useState } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import Icon from "../Icon";
import PaginationButton from "../PaginationButton/PaginationButton";
import { StyledInput, StyledInputWrapper, StyledLeftColumnHeader, StyledWrapper } from "./styles";
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
  onSearchInputChange,
  onItemClick
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { search } = useLanguage();

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);
  // on mobile the input is collapsed to a search icon: tapping it expands and focuses the input
  const openSearch = () => inputRef.current?.focus();

  return (
    <StyledWrapper>
      <StyledLeftColumnHeader>
        <StyledInputWrapper
          $isFocused={isInputFocused}
          $isOpen={isInputFocused}
          $hasValue={!!searchInputValue}
          onClick={openSearch}>
          <Icon iconName="search" />
          <StyledInput
            ref={inputRef}
            type="search"
            placeholder={search}
            aria-label={search}
            value={searchInputValue}
            onChange={onSearchInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </StyledInputWrapper>
        <PaginationButton
          intent="previous"
          isVisible={pageNum !== 0}
          onClick={onLoadPrevious}
          icon={<Icon iconName="arrowUp" width="16" height="16" />}
          pageNum={pageNum}
          pagesAmount={pagesAmount}
        />
      </StyledLeftColumnHeader>
      {data.map((item, index) => (
        <LeftColumnItem
          id={item.id}
          item={item.label}
          key={item.id}
          rows={rows[index]}
          onItemClick={onItemClick}
        />
      ))}
      <PaginationButton
        intent="next"
        isVisible={pageNum !== pagesAmount - 1}
        onClick={onLoadNext}
        icon={<Icon iconName="arrowDown" width="16" height="16" />}
        pageNum={pageNum}
        pagesAmount={pagesAmount}
      />
    </StyledWrapper>
  );
};

export default LeftColumn;
