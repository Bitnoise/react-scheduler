import { FC, useCallback, useEffect, useRef } from "react";
import { boxHeight, headerHeight, screenWidthMultiplier, canvasHeaderWrapperId } from "@/constants";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import { drawHeader } from "@/utils/drawHeader/drawHeader";
import { HeaderProps } from "./types";
import { StyledCanvas, StyledOuterWrapper, StyledWrapper } from "./styles";
import Topbar from "./Topbar";

const Header: FC<HeaderProps> = ({ zoom, topBarWidth }) => {
  const { week } = useLanguage();
  const { date, cols, dayOfYear, startDate } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvasWidth = window.innerWidth * screenWidthMultiplier;
      const canvasHeight = headerHeight + 1;

      ctx.canvas.width = canvasWidth * window.devicePixelRatio;
      ctx.canvas.height = canvasHeight * window.devicePixelRatio;
      ctx.canvas.style.width = canvasWidth + "px";
      ctx.canvas.style.height = canvasHeight + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      drawHeader(ctx, zoom, cols, startDate, week, dayOfYear);
    },
    [cols, dayOfYear, startDate, week, zoom]
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

    ctx.canvas.height = boxHeight + headerHeight;

    handleResize(ctx);
  }, [date, zoom, handleResize]);

  return (
    <StyledOuterWrapper>
      <Topbar width={topBarWidth} />
      <StyledWrapper id={canvasHeaderWrapperId}>
        <StyledCanvas ref={canvasRef} />
      </StyledWrapper>
    </StyledOuterWrapper>
  );
};

export default Header;
