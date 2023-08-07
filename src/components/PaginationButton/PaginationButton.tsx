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

  const buttonText =
    intent === "next"
      ? `${loadNext} ${pageNum + 2}/${pagesAmount}`
      : `${loadPrevious} ${pageNum}/${pagesAmount}`;

  return (
    <StyledWrapper intent={intent}>
      <StyledButton onClick={onClick} isVisible={isVisible}>
        {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
        <StyledText>{buttonText}</StyledText>
      </StyledButton>
    </StyledWrapper>
  );
};

export default PaginationButton;
