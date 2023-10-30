export const resizeCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.canvas.width = width * window.devicePixelRatio;
  ctx.canvas.height = height * window.devicePixelRatio;
  ctx.canvas.style.width = width + "px";
  ctx.canvas.style.height = height + "px";
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
};
