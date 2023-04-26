import { Icon, IconButton } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { NavigationWrapper, Wrapper, NavBtn, Today, Zoom, Filters } from "./styles";

const Topbar = () => {
  const { handleGoNext, handleGoPrev, handleGoToday, zoomIn, zoomOut, zoom } = useCalendar();
  return (
    <Wrapper>
      <Filters>
        <IconButton iconName="filter" width="16" height="16">
          Filtry
        </IconButton>
      </Filters>
      <NavigationWrapper>
        <NavBtn onClick={handleGoPrev}>
          <Icon iconName="arrowLeft" height="15" fill="#3B3C5F" />
          poprzedni
        </NavBtn>
        <Today onClick={handleGoToday}>Dzis</Today>
        <NavBtn onClick={handleGoNext}>
          nastepny
          <Icon iconName="arrowRight" height="15" fill="#3B3C5F" />
        </NavBtn>
      </NavigationWrapper>
      <Zoom>
        Widok:
        <IconButton callback={zoomOut} isFullRounded iconName="substract" width="14" />
        <IconButton callback={zoomIn} isFullRounded iconName="add" width="14" />
      </Zoom>
    </Wrapper>
  );
};
export default Topbar;
