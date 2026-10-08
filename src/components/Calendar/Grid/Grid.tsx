import dayjs from "dayjs";
import {
  DragEvent,
  JSX,
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useTheme } from "styled-components";
import { drawGrid } from "@/utils/drawGrid/drawGrid";
import { boxHeight, canvasWrapperId, outsideWrapperId, screenWidthMultiplier } from "@/constants";
import { getLeftColumnWidth } from "@/utils/getLeftColumnWidth";
import { Loader, Tile, Tiles } from "@/components";
import { TileDragStart } from "@/components/Tiles/types";
import { SchedulerProjectData } from "@/types/global";
import { useCalendar } from "@/context/CalendarProvider";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { getCellRangeRect, resolveGridCell } from "@/utils/resolveGridCell";
import { getCellTimeUnit } from "@/utils/zoomUnits";
import { GridProps } from "./types";
import {
  StyledCanvas,
  StyledInnerWrapper,
  StyledSelectedCell,
  StyledSpan,
  StyledWrapper
} from "./styles";

type DropPreview = {
  project: SchedulerProjectData;
  resourceIndex: number;
  startDate: Date;
  endDate: Date;
};

type DragSelection = {
  resourceIndex: number;
  anchorDate: Date;
  currentDate: Date;
};

// load the next columns a bit before reaching the edge so a fling never hits the end of the grid;
// kept under half the visible width so the compensated position does not trigger the opposite edge
const getLoadAheadMargin = (): number => Math.round(getCanvasWidth() / screenWidthMultiplier / 4);

// time without scroll event after which a swipe, a fling or a wheel scroll is considered over
const scrollIdleDelay = 150;

export function Grid({
  zoom,
  rows,
  data,
  onTileClick,
  onCellClick,
  onCellRangeSelect,
  onTileMove,
  selectedCell,
  ref
}: GridProps & { ref?: React.Ref<HTMLDivElement> }): JSX.Element {
  const { handleScrollNext, handleScrollPrev, date, isLoading, cols, startDate, navigation } =
    useCalendar();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const refRight = useRef<HTMLSpanElement | null>(null);
  const refLeft = useRef<HTMLSpanElement | null>(null);
  const [dragSelection, setDragSelection] = useState<DragSelection | null>(null);
  const dragSelectionRef = useRef<DragSelection | null>(null);

  const updateDragSelection = useCallback((next: DragSelection | null) => {
    dragSelectionRef.current = next;
    setDragSelection(next);
  }, []);

  const setInnerRef = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.RefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );

  const theme = useTheme();

  const rowsPerPerson = data.map((person) => Math.max(person.data.length, 1));
  // redraw the grid only when the person boundaries actually change
  const rowsPerPersonKey = rowsPerPerson.join(",");
  const rowsPerPersonRef = useRef(rowsPerPerson);
  rowsPerPersonRef.current = rowsPerPerson;

  const highlightRect = dragSelection
    ? getCellRangeRect(
        startDate,
        rowsPerPerson,
        dragSelection.resourceIndex,
        dragSelection.anchorDate,
        dragSelection.currentDate,
        zoom
      )
    : selectedCell
      ? getCellRangeRect(
          startDate,
          rowsPerPerson,
          data.findIndex((person) => person.id === selectedCell.resourceId),
          selectedCell.startDate,
          selectedCell.endDate,
          zoom
        )
      : null;

  const resolveCell = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const { left, top } = canvas.getBoundingClientRect();
      return resolveGridCell(
        startDate,
        { x: clientX - left, y: clientY - top },
        rowsPerPerson,
        zoom
      );
    },
    [rowsPerPerson, startDate, zoom]
  );

  const handleCanvasMouseDown = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      if (!onCellClick && !onCellRangeSelect) return;
      const cell = resolveCell(e.clientX, e.clientY);
      if (!cell || !data[cell.resourceIndex]) return;
      updateDragSelection({
        resourceIndex: cell.resourceIndex,
        anchorDate: cell.date,
        currentDate: cell.date
      });
    },
    [data, onCellClick, onCellRangeSelect, resolveCell, updateDragSelection]
  );

  const isDragSelecting = dragSelection !== null;

  useEffect(() => {
    if (!isDragSelecting) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const current = dragSelectionRef.current;
      const cell = resolveCell(e.clientX, e.clientY);
      if (!cell || !current) return;
      updateDragSelection({ ...current, currentDate: cell.date });
    };

    const handleMouseUp = () => {
      const current = dragSelectionRef.current;
      updateDragSelection(null);
      if (!current) return;

      const resource = data[current.resourceIndex];
      if (!resource) return;

      const [start, end] =
        current.anchorDate.getTime() <= current.currentDate.getTime()
          ? [current.anchorDate, current.currentDate]
          : [current.currentDate, current.anchorDate];

      if (start.getTime() === end.getTime()) {
        onCellClick?.({ resourceId: resource.id, date: start });
      } else {
        onCellRangeSelect?.({ resourceId: resource.id, startDate: start, endDate: end });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragSelecting, data, onCellClick, onCellRangeSelect, resolveCell, updateDragSelection]);

  const draggedTileRef = useRef<TileDragStart | null>(null);
  const [dropPreview, setDropPreview] = useState<DropPreview | null>(null);

  const handleTileDragStart = useCallback((drag: TileDragStart) => {
    draggedTileRef.current = drag;
  }, []);

  const handleTileDragEnd = useCallback(() => {
    draggedTileRef.current = null;
    setDropPreview(null);
  }, []);

  const resolveDropTarget = useCallback(
    (clientX: number, clientY: number): DropPreview | null => {
      const dragged = draggedTileRef.current;
      if (!dragged) return null;
      const cell = resolveCell(clientX, clientY);
      if (!cell || !data[cell.resourceIndex]) return null;

      const { project, grabOffset } = dragged;
      const startDate = dayjs(cell.date).subtract(grabOffset, getCellTimeUnit(zoom)).toDate();
      const duration = project.endDate.getTime() - project.startDate.getTime();

      return {
        project,
        resourceIndex: cell.resourceIndex,
        startDate,
        endDate: new Date(startDate.getTime() + duration)
      };
    },
    [data, resolveCell, zoom]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!draggedTileRef.current) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      const target = resolveDropTarget(e.clientX, e.clientY);
      // dragover fires continuously: only re-render when the landing cell changes
      setDropPreview((prev) =>
        prev &&
        target &&
        prev.resourceIndex === target.resourceIndex &&
        prev.startDate.getTime() === target.startDate.getTime()
          ? prev
          : target
      );
    },
    [resolveDropTarget]
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setDropPreview(null);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const dragged = draggedTileRef.current;
      if (!onTileMove || !dragged) return;
      e.preventDefault();

      const target = resolveDropTarget(e.clientX, e.clientY);
      draggedTileRef.current = null;
      setDropPreview(null);
      if (!target) return;

      onTileMove({
        id: dragged.project.id,
        previousResourceId: dragged.resourceId,
        resourceId: data[target.resourceIndex].id,
        startDate: target.startDate,
        endDate: target.endDate
      });
    },
    [data, onTileMove, resolveDropTarget]
  );

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = getCanvasWidth();
      const height = rows * boxHeight + 1;
      resizeCanvas(ctx, width, height);
      drawGrid(ctx, zoom, rows, cols, startDate, theme, rowsPerPersonRef.current);
    },
    [cols, startDate, rows, zoom, theme, rowsPerPersonKey]
  );

  // layout effect: redraw before paint so the grid never shows the previous dates once scrolled
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new ResizeObserver(() => {
      handleResize(ctx);
    });

    observer.observe(wrapper);
    handleResize(ctx);

    return () => observer.disconnect();
  }, [handleResize, date, rows, zoom]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || !navigation) return;

    el.classList.remove("slide-next", "slide-prev");
    void el.offsetWidth;
    el.classList.add(navigation.direction === "next" ? "slide-next" : "slide-prev");
  }, [navigation]);

  // the adjacent period is only loaded once the scroll has settled: shifting the scroll position
  // during a fling is overridden by the momentum on some browsers (iOS Safari), the added columns
  // then make the visible dates jump by a whole period
  const edgeVisible = useRef({ next: false, prev: false });
  const isScrolling = useRef(false);
  const loadVisibleEdge = useRef(() => {});
  loadVisibleEdge.current = () => {
    if (isScrolling.current) return;
    if (edgeVisible.current.next) handleScrollNext();
    else if (edgeVisible.current.prev) handleScrollPrev();
  };

  useEffect(() => {
    const scroller = document.getElementById(outsideWrapperId);
    if (!scroller) return;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let isTouching = false;
    const waitForIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (isTouching) return;
        isScrolling.current = false;
        loadVisibleEdge.current();
      }, scrollIdleDelay);
    };
    const onScroll = () => {
      isScrolling.current = true;
      waitForIdle();
    };
    // a touch end is listened on the touched element: it always receives it, while it doesn't bubble to the
    // scroller when the element has been removed by a re-render during the touch
    const touchTargets = new Set<EventTarget>();
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length > 0) return;
      endTouch();
      waitForIdle();
    };
    const endTouch = () => {
      isTouching = false;
      touchTargets.forEach((target) => {
        target.removeEventListener("touchend", onTouchEnd as EventListener);
        target.removeEventListener("touchcancel", onTouchEnd as EventListener);
      });
      touchTargets.clear();
    };
    const onTouchStart = (e: TouchEvent) => {
      isTouching = true;
      isScrolling.current = true;
      clearTimeout(idleTimer);
      if (!e.target || touchTargets.has(e.target)) return;
      touchTargets.add(e.target);
      e.target.addEventListener("touchend", onTouchEnd as EventListener, { passive: true });
      e.target.addEventListener("touchcancel", onTouchEnd as EventListener, { passive: true });
    };
    // a wheel scroll means no finger is on the screen, in case a touch end was still missed
    const onWheel = () => {
      if (isTouching) endTouch();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      endTouch();
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  useEffect(() => {
    if (!refRight.current) return;
    const observerRight = new IntersectionObserver(
      (e) => {
        edgeVisible.current.next = e[e.length - 1].isIntersecting;
        loadVisibleEdge.current();
      },
      {
        root: document.getElementById(outsideWrapperId),
        rootMargin: `0px ${getLoadAheadMargin()}px 0px 0px`
      }
    );
    observerRight.observe(refRight.current);

    return () => observerRight.disconnect();
  }, [handleScrollNext]);

  useEffect(() => {
    if (!refLeft.current) return;
    const observerLeft = new IntersectionObserver(
      (e) => {
        edgeVisible.current.prev = e[e.length - 1].isIntersecting;
        loadVisibleEdge.current();
      },
      {
        root: document.getElementById(outsideWrapperId),
        rootMargin: `0px 0px 0px ${getLoadAheadMargin() - getLeftColumnWidth()}px`
      }
    );
    observerLeft.observe(refLeft.current);

    return () => observerLeft.disconnect();
  }, [handleScrollPrev]);

  return (
    <StyledWrapper id={canvasWrapperId} ref={wrapperRef}>
      <StyledInnerWrapper
        ref={setInnerRef}
        onDragOver={onTileMove ? handleDragOver : undefined}
        onDragLeave={onTileMove ? handleDragLeave : undefined}
        onDrop={onTileMove ? handleDrop : undefined}
      >
        <StyledSpan $position="left" ref={refLeft} />
        <Loader isLoading={isLoading} position="left" />
        <StyledCanvas ref={canvasRef} onMouseDown={handleCanvasMouseDown} />
        <Tiles
          data={data}
          zoom={zoom}
          onTileClick={onTileClick}
          onTileMove={onTileMove}
          onTileDragStart={handleTileDragStart}
          onTileDragEnd={handleTileDragEnd}
        />
        {dropPreview && (
          <Tile
            row={rowsPerPerson
              .slice(0, dropPreview.resourceIndex)
              .reduce((acc, cur) => acc + cur, 0)}
            data={{
              ...dropPreview.project,
              startDate: dropPreview.startDate,
              endDate: dropPreview.endDate
            }}
            zoom={zoom}
            preview
          />
        )}
        {highlightRect && (
          <StyledSelectedCell
            style={{
              left: `${highlightRect.x}px`,
              top: `${highlightRect.y}px`,
              width: `${highlightRect.width}px`,
              height: `${highlightRect.height}px`
            }}
          />
        )}
        <StyledSpan ref={refRight} $position="right" />
        <Loader isLoading={isLoading} position="right" />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}
