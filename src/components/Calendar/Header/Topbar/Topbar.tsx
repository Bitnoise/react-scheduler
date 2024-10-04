import { useTheme } from "styled-components";
import { FC, MouseEventHandler } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Icon, IconButton, Toggle } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
  NavigationWrapper,
  Wrapper,
  NavBtn,
  Today,
  Zoom,
  Filters,
  OptionsContainer,
  TodayWrapper,
  NavCalendarButton
} from "./styles";
import { TopbarProps } from "./types";

const Topbar: FC<TopbarProps> = ({ width, showThemeToggle, toggleTheme }) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    handleGoDate,
    zoomIn,
    zoomOut,
    isNextZoom,
    isPrevZoom,
    handleFilterData,
    onClearFilterData
  } = useCalendar();
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;

  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClearFilterData?.();
  };

  return (
    <Wrapper width={width}>
      <Filters>
        {filterButtonState >= 0 && (
          <IconButton
            variant={filterButtonState ? "filled" : "outlined"}
            iconName="filter"
            width="16"
            height="16"
            onClick={handleFilterData}>
            {topbar.filters}
            {!!filterButtonState && (
              <span onClick={handleClearFilters}>
                <Icon iconName="close" height="16" width="16" fill={colors.textSecondary} />
              </span>
            )}
          </IconButton>
        )}
      </Filters>
      <NavigationWrapper>
        <NavBtn disabled={!data?.length} onClick={handleGoPrev}>
          <Icon iconName="arrowLeft" height="15" fill={colors.textPrimary} />
          {topbar.prev}
        </NavBtn>
        <TodayWrapper>
          <Today onClick={handleGoToday}>{topbar.today}</Today>
          <DatePicker
            selected={new Date()}
            onSelect={(date) => handleGoDate(dayjs(date))}
            customInput={
              <NavCalendarButton>
                <Icon iconName="calendar" height="15" fill={colors.textPrimary} />
              </NavCalendarButton>
            }
          />
        </TodayWrapper>
        <NavBtn disabled={!data?.length} onClick={handleGoNext}>
          {topbar.next}
          <Icon iconName="arrowRight" height="15" fill={colors.textPrimary} />
        </NavBtn>
      </NavigationWrapper>
      <OptionsContainer>
        {showThemeToggle && <Toggle toggleTheme={toggleTheme} />}
        <Zoom>
          {topbar.view}
          <IconButton
            isDisabled={!isPrevZoom}
            onClick={zoomOut}
            isFullRounded
            iconName="subtract"
            width="14"
          />
          <IconButton
            isDisabled={!isNextZoom}
            onClick={zoomIn}
            isFullRounded
            iconName="add"
            width="14"
          />
        </Zoom>
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
