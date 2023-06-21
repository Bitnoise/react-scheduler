import { useEffect, useRef } from "react";
import { drawGrid } from "@/utils/drawGrid";
import { boxHeight, headerHeight } from "@/constants";
import { Loader } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { GridProps } from "./types";
import { StyledCanvas, StyledInnerWrapper, StyledSpan, StyledWrapper } from "./styles";

const Grid = ({ days, zoom, rows }: GridProps) => {
  const { handleScrollNext, handleScrollPrev, date, isLoading } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refRight = useRef<HTMLSpanElement>(null);
  const refLeft = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.canvas.height = rows * boxHeight + headerHeight;

    const handleResize = () => {
      ctx.canvas.width = window.innerWidth * 3;

      drawGrid(ctx, zoom, days, rows, date);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    drawGrid(ctx, zoom, days, rows, date);

    return () => window.removeEventListener("resize", handleResize);
  }, [days, date, rows, zoom]);

  useEffect(() => {
    const observerRight = new IntersectionObserver((e) =>
      e[0].isIntersecting ? handleScrollNext() : null
    );
    const observerLeft = new IntersectionObserver((e) =>
      e[0].isIntersecting ? handleScrollPrev() : null
    );

    if (!refRight.current || !refLeft.current) return;
    observerRight.observe(refRight.current);
    observerLeft.observe(refLeft.current);

    return () => {
      observerLeft.disconnect();
      observerRight.disconnect();
    };
  }, [handleScrollNext, handleScrollPrev]);

  return (
    <StyledWrapper id="canvasWrapper">
      <StyledInnerWrapper>
        <StyledSpan position="left" ref={refLeft}></StyledSpan>
        <Loader isLoading={isLoading} position="left" />
        <StyledCanvas ref={canvasRef} />
        <StyledSpan position="right" ref={refRight}></StyledSpan>
        <Loader isLoading={isLoading} position="right" />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default Grid;
