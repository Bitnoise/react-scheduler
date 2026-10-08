import { useLanguage } from "@/context/LocaleProvider";
import EmptyBoxSvg from "./empty-box.svg?react";
import { StyledText, StyledWrapper } from "./styles";
import { JSX } from "react";
const EmptyBox = (): JSX.Element => {
  const { feelingEmpty } = useLanguage();
  return (
    <StyledWrapper>
      <EmptyBoxSvg />
      <StyledText>{feelingEmpty}</StyledText>
    </StyledWrapper>
  );
};

export default EmptyBox;
