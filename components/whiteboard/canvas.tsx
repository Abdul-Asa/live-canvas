import { useViewportSize } from "@/hooks/use-viewport-size";
import { CANVAS_SIZE } from "@/lib/constants";
import { cameraAtom, panModeAtom } from "@/lib/jotai-state";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

const CanvasBoard = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { height, width } = useViewportSize();
  const [panMode] = useAtom(panModeAtom);
  const [pos, setCamera] = useAtom(cameraAtom);
  const [isDragging, setIsDragging] = useState(false);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    setCamera((prev) => {
      let newX = prev.x - event.deltaX;
      let newY = prev.y - event.deltaY;

      const maxX = CANVAS_SIZE / 2 - width / 2;
      const maxY = CANVAS_SIZE / 2 - height / 2;
      const minX = -(CANVAS_SIZE / 2) + width / 2;
      const minY = -(CANVAS_SIZE / 2) + height / 2;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);

      return { x: newX, y: newY };
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // setSelectedLayer(null);
    if (!panMode) return;
    setIsDragging(true);
    setCamera((prev) => ({
      ...prev,
      lastX: event.clientX,
      lastY: event.clientY,
    }));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // updateCursorPos(event);
    if (!panMode) return;
    if (!isDragging) return;
    setCamera((prev) => {
      if (!prev.lastX || !prev.lastY) return prev;
      let newX = prev.x + event.clientX - prev.lastX;
      let newY = prev.y + event.clientY - prev.lastY;

      const maxX = CANVAS_SIZE / 2 - width / 2;
      const maxY = CANVAS_SIZE / 2 - height / 2;
      const minX = -(CANVAS_SIZE / 2) + width / 2;
      const minY = -(CANVAS_SIZE / 2) + height / 2;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);

      return { x: newX, y: newY, lastX: event.clientX, lastY: event.clientY };
    });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      className={`border-8 absolute border-yellow-500 ${
        panMode ? " cursor-move" : "cursor-auto"
      }`}
      ref={canvasRef}
      style={{
        x: pos.x,
        y: pos.y,
        height: CANVAS_SIZE,
        width: CANVAS_SIZE,

        backgroundImage:
          "linear-gradient(to right, black 2px, transparent 1px), linear-gradient(to bottom, black 2px, transparent 1px)",
        backgroundSize: "50px 50px",
        backgroundColor: "#dadad2",
      }}
      onWheel={handleScroll}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {children}
    </motion.div>
  );
};

export default CanvasBoard;
