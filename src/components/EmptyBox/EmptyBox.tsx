import { useLanguage } from "@/context/LocaleProvider";
import { ReactComponent as EmptyBoxSvg } from "./empty-box.svg";
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
