import { useTheme } from "styled-components";
import { FC } from "react";
import { Icon } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { allZoomLevel } from "@/types/global";
import {
  NavigationWrapper,
  Wrapper,
  Segmented,
  SegmentButton,
  NavIconButton,
  Filters,
  FilterButton,
  FilterLabel,
  OptionsContainer,
  HideOnMobile,
  ThemeButton
} from "./styles";
import { TopbarProps } from "./types";

const defaultZoomLevels = ["Weeks", "Days", "Hours"];

const Topbar: FC<TopbarProps> = ({ width, showThemeToggle, toggleTheme }) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    changeZoom,
    zoom,
    handleFilterData
  } = useCalendar();
  const { mode } = useTheme();
  const { filterButtonState = -1 } = config;
  const isFiltered = filterButtonState > 0;
  const zoomLabels = topbar.zoomLevels ?? defaultZoomLevels;
  const toggleThemeLabel = topbar.toggleTheme ?? "Toggle theme";

  return (
    <Wrapper width={width}>
      <Filters>
        {filterButtonState >= 0 && (
          <FilterButton
            type="button"
            $isActive={isFiltered}
            aria-label={topbar.filters}
            aria-pressed={isFiltered}
            onClick={handleFilterData}
          >
            <Icon iconName="filter" width="18" height="18" fill="currentColor" />
            <FilterLabel>{topbar.filters}</FilterLabel>
          </FilterButton>
        )}
      </Filters>
      <NavigationWrapper>
        <Segmented>
          <HideOnMobile>
            <NavIconButton
              type="button"
              disabled={!data?.length}
              aria-label={topbar.prev}
              title={topbar.prev}
              onClick={handleGoPrev}
            >
              <Icon iconName="chevronLeft" width="18" height="18" fill="currentColor" />
            </NavIconButton>
          </HideOnMobile>
          <SegmentButton type="button" onClick={handleGoToday}>
            {topbar.today}
          </SegmentButton>
          <HideOnMobile>
            <NavIconButton
              type="button"
              disabled={!data?.length}
              aria-label={topbar.next}
              title={topbar.next}
              onClick={handleGoNext}
            >
              <Icon iconName="chevronRight" width="18" height="18" fill="currentColor" />
            </NavIconButton>
          </HideOnMobile>
        </Segmented>
      </NavigationWrapper>
      <OptionsContainer>
        <HideOnMobile>
          <Segmented role="group" aria-label={topbar.view}>
            {allZoomLevel.map((level) => (
              <SegmentButton
                key={level}
                type="button"
                $isActive={zoom === level}
                aria-pressed={zoom === level}
                onClick={() => changeZoom(level)}
              >
                {zoomLabels[level] ?? defaultZoomLevels[level]}
              </SegmentButton>
            ))}
          </Segmented>
        </HideOnMobile>
        {showThemeToggle && (
          <HideOnMobile>
            <ThemeButton
              type="button"
              aria-label={toggleThemeLabel}
              title={toggleThemeLabel}
              onClick={toggleTheme}
            >
              <Icon iconName={mode === "light" ? "moon" : "sun"} width="18" height="18" />
            </ThemeButton>
          </HideOnMobile>
        )}
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
