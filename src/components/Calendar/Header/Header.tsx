import { FC, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useTheme } from "styled-components";
import {
  headerHeight,
  canvasHeaderWrapperId,
  outsideWrapperId,
  zoom2HeaderHeight
} from "@/constants";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { drawHeader } from "@/utils/drawHeader/drawHeader";
import { setStickyLabelStart } from "@/utils/drawRow";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { HeaderProps } from "./types";
import { StyledCanvas, StyledOuterWrapper, StyledWrapper } from "./styles";
import Topbar from "./Topbar";

const Header: FC<HeaderProps> = ({ zoom, topBarWidth, showThemeToggle, toggleTheme }) => {
  const { week } = useLanguage();
  const { date, cols, dayOfYear, startDate, applyScrollAnchor } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const theme = useTheme();

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = getCanvasWidth();
      const currentHeaderHeight = zoom === 2 ? zoom2HeaderHeight : headerHeight;
      const height = currentHeaderHeight + 1;
      resizeCanvas(ctx, width, height);

      setStickyLabelStart(document.getElementById(outsideWrapperId)?.scrollLeft ?? 0);
      drawHeader(ctx, zoom, cols, startDate, week, dayOfYear, theme);
    },
    [cols, dayOfYear, startDate, week, zoom, theme]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const onResize = () => handleResize(ctx);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [handleResize]);

  // redraw on horizontal scroll so month/day labels stay visible
  useEffect(() => {
    const scroller = document.getElementById(outsideWrapperId);
    const ctx = canvasRef.current?.getContext("2d");
    if (!scroller || !ctx) return;
    let frame = 0;
    let lastScrollLeft = scroller.scrollLeft;
    const onScroll = () => {
      if (scroller.scrollLeft === lastScrollLeft) return;
      lastScrollLeft = scroller.scrollLeft;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setStickyLabelStart(scroller.scrollLeft);
        drawHeader(ctx, zoom, cols, startDate, week, dayOfYear, theme);
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [cols, dayOfYear, startDate, week, zoom, theme]);

  // layout effect: the new dates must be drawn in the same frame as the scroll compensation
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    applyScrollAnchor();
    handleResize(ctx);
  }, [date, zoom, handleResize, applyScrollAnchor]);

  return (
    <StyledOuterWrapper>
      <Topbar width={topBarWidth} showThemeToggle={showThemeToggle} toggleTheme={toggleTheme} />
      <StyledWrapper id={canvasHeaderWrapperId}>
        <StyledCanvas ref={canvasRef} />
      </StyledWrapper>
    </StyledOuterWrapper>
  );
};

export default Header;
