import { useLanguage } from "@/context/LocaleProvider";
import EmptyBoxSvg from "./empty-box.svg?react";
import { StyledText, StyledWrapper } from "./styles";
const EmptyBox = () => {
  const { feelingEmpty } = useLanguage();
  return (
    <StyledWrapper>
      <EmptyBoxSvg />
      <StyledText>{feelingEmpty}</StyledText>
    </StyledWrapper>
  );
};

export default EmptyBox;
