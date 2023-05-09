import { Icon, IconButton } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { NavigationWrapper, Wrapper, NavBtn, Today, Zoom, Filters } from "./styles";

const Topbar = () => {
  const { handleGoNext, handleGoPrev, handleGoToday, zoomIn, zoomOut } = useCalendar();
  const { topbar } = useLanguage();
  return (
    <Wrapper>
      <Filters>
        <IconButton iconName="filter" width="16" height="16">
          {topbar.filters}
        </IconButton>
      </Filters>
      <NavigationWrapper>
        <NavBtn onClick={handleGoPrev}>
          <Icon iconName="arrowLeft" height="15" fill="#3B3C5F" />
          {topbar.prev}
        </NavBtn>
        <Today onClick={handleGoToday}>{topbar.today}</Today>
        <NavBtn onClick={handleGoNext}>
          {topbar.next}
          <Icon iconName="arrowRight" height="15" fill="#3B3C5F" />
        </NavBtn>
      </NavigationWrapper>
      <Zoom>
        {topbar.view}:
        <IconButton onClick={zoomOut} isFullRounded iconName="subtract" width="14" />
        <IconButton onClick={zoomIn} isFullRounded iconName="add" width="14" />
      </Zoom>
    </Wrapper>
  );
};
export default Topbar;
