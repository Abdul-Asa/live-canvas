"use client";
import { useViewportSize } from "@/hooks/use-viewport-size";
import { CANVAS_SIZE } from "@/lib/constants";
import { cameraAtom, isDraggingAtom } from "@/lib/jotai-state";
import { animate, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useAtom(isDraggingAtom);
  const [pos, setPos] = useAtom(cameraAtom);
  const { height, width } = useViewportSize();

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    setPos((prev) => {
      let newX = prev.x - event.deltaX;
      let newY = prev.y - event.deltaY;

      // Apply constraints
      newX = Math.min(newX, 0);
      newY = Math.min(newY, 0);
      newX = Math.max(newX, -(CANVAS_SIZE - width));
      newY = Math.max(newY, -(CANVAS_SIZE - height));

      return { x: newX, y: newY };
    });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      // Single finger touch does the panning
      const touch = event.touches[0];
      setDragging(true);
      setPos((prev) => {
        // Calculate the distance moved since the last touch event
        if (!prev.lastX || !prev.lastY) return prev;
        const deltaX = touch.clientX - prev.lastX;
        const deltaY = touch.clientY - prev.lastY;

        let newX = prev.x + deltaX;
        let newY = prev.y + deltaY;

        // Apply constraints
        newX = Math.min(newX, 0);
        newY = Math.min(newY, 0);
        newX = Math.max(newX, -(CANVAS_SIZE - width));
        newY = Math.max(newY, -(CANVAS_SIZE - height));

        return {
          ...prev,
          x: newX,
          y: newY,
          lastX: touch.clientX,
          lastY: touch.clientY,
        };
      });
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      setPos((prev) => ({
        ...prev,
        lastX: touch.clientX,
        lastY: touch.clientY,
      }));
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    setPos({
      x: -(CANVAS_SIZE / 2 - width / 2),
      y: -(CANVAS_SIZE / 2 - height / 2),
    });
    if (canvasRef.current) {
      animate(
        canvasRef.current,
        { x: pos.x, y: pos.y },
        { duration: 0.5, ease: "linear" }
      );
    }
  }, []);

  return (
    <motion.div
      ref={canvasRef}
      className="border-8 relative border-red-500 "
      style={{
        height: CANVAS_SIZE,
        width: CANVAS_SIZE,
        translateX: pos.x,
        translateY: pos.y,
        backgroundImage:
          "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll}
    ></motion.div>
  );
};

export default Canvas;
