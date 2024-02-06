import { forwardRef, useCallback, useEffect, useRef } from "react";
import { drawGrid } from "@/utils/drawGrid/drawGrid";
import { boxHeight, canvasWrapperId, leftColumnWidth, screenWidthMultiplier } from "@/constants";
import { Loader, Tiles } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { GridProps } from "./types";
import { StyledCanvas, StyledInnerWrapper, StyledSpan, StyledWrapper } from "./styles";

const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { zoom, rows, data, onTileClick },
  ref
) {
  const { handleScrollNext, handleScrollPrev, date, isLoading, cols, startDate } = useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refRight = useRef<HTMLSpanElement>(null);
  const refLeft = useRef<HTMLSpanElement>(null);

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = window.innerWidth * screenWidthMultiplier;
      const height = rows * boxHeight + 1;
      resizeCanvas(ctx, width, height);
      drawGrid(ctx, zoom, rows, cols, startDate);
    },
    [cols, startDate, rows, zoom]
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
  }, [date, rows, zoom, handleResize]);

  useEffect(() => {
    if (!refRight.current) return;
    const observerRight = new IntersectionObserver((e) =>
      e[0].isIntersecting ? handleScrollNext() : null
    );
    observerRight.observe(refRight.current);

    return () => observerRight.disconnect();
  }, [handleScrollNext]);

  useEffect(() => {
    if (!refLeft.current) return;
    const observerLeft = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? handleScrollPrev() : null),
      { rootMargin: `0px 0px 0px -${leftColumnWidth}px` }
    );
    observerLeft.observe(refLeft.current);

    return () => observerLeft.disconnect();
  }, [handleScrollPrev]);

  return (
    <StyledWrapper id={canvasWrapperId}>
      <StyledInnerWrapper ref={ref}>
        <StyledSpan position="left" ref={refLeft} />
        <Loader isLoading={isLoading} position="left" />
        <StyledCanvas ref={canvasRef} />
        <Tiles data={data} zoom={zoom} onTileClick={onTileClick} />
        <StyledSpan ref={refRight} position="right" />
        <Loader isLoading={isLoading} position="right" />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
});

export default Grid;
