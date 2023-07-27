import { FC } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import { PaginationButtonProps } from "./types";
import { StyledButton, StyledIconWrapper, StyledText, StyledWrapper } from "./styles";

const PaginationButton: FC<PaginationButtonProps> = ({
  intent,
  onLoadNext,
  onLoadPrevious,
  icon,
  isVisible
}) => {
  const { loadNext, loadPrevious } = useLanguage();
  const renderButton = () => {
    switch (intent) {
      case "next":
        return (
          <StyledWrapper isVisible={isVisible}>
            <StyledButton onClick={onLoadNext}>
              {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
              <StyledText>{loadNext}</StyledText>
            </StyledButton>
          </StyledWrapper>
        );
      case "previous": {
        return (
          <StyledWrapper isVisible={isVisible}>
            <StyledButton onClick={onLoadPrevious}>
              {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}
              <StyledText>{loadPrevious}</StyledText>
            </StyledButton>
          </StyledWrapper>
        );
      }
      default:
        return null;
    }
  };
  return renderButton();
};

export default PaginationButton;
