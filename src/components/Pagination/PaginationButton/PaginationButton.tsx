import { FC } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import { PaginationButtonProps } from "./types";
import { StyledButton, StyledIconWrapper, StyledText, StyledWrapper } from "./styles";

const PaginationButton: FC<PaginationButtonProps> = ({ intent, onClick, icon, isVisible }) => {
  const { loadNext, loadPrevious } = useLanguage();
  return (
    <StyledWrapper isVisible={isVisible}>
      <StyledButton onClick={onClick}>
        {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
        <StyledText>{intent === "next" ? loadNext : loadPrevious}</StyledText>
      </StyledButton>
    </StyledWrapper>
  );
};

export default PaginationButton;
