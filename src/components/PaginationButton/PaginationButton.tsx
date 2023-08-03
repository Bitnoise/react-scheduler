import { FC } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import { PaginationButtonProps } from "./types";
import { StyledButton, StyledIconWrapper, StyledText, StyledWrapper } from "./styles";

const PaginationButton: FC<PaginationButtonProps> = ({
  intent,
  onClick,
  icon,
  isVisible,
  pageNum,
  pagesAmount
}) => {
  const { loadNext, loadPrevious } = useLanguage();

  const renderText = () => {
    if (intent === "next") {
      return `${loadNext} ${pageNum + 2}/${pagesAmount}`;
    }
    return `${loadPrevious} ${pageNum}/${pagesAmount}`;
  };

  return (
    <StyledWrapper>
      <StyledButton onClick={onClick} isVisible={isVisible}>
        {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
        <StyledText>{renderText()}</StyledText>
      </StyledButton>
    </StyledWrapper>
  );
};

export default PaginationButton;
