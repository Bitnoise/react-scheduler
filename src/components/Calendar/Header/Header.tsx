import { FC, useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { headerHeight, canvasHeaderWrapperId, zoom2HeaderHeight } from "@/constants";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { drawHeader } from "@/utils/drawHeader/drawHeader";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { HeaderProps } from "./types";
import { StyledCanvas, StyledOuterWrapper, StyledWrapper } from "./styles";
import Topbar from "./Topbar";

const Header: FC<HeaderProps> = ({ zoom, topBarWidth, showThemeToggle, toggleTheme }) => {
  const { week } = useLanguage();
  const { date, cols, dayOfYear, startDate } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const theme = useTheme();

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = getCanvasWidth();
      const currentHeaderHeight = zoom === 2 ? zoom2HeaderHeight : headerHeight;
      const height = currentHeaderHeight + 1;
      resizeCanvas(ctx, width, height);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    handleResize(ctx);
  }, [date, zoom, handleResize]);

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
