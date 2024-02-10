"use client";
import { useViewportSize } from "@/hooks/use-viewport-size";
import { CANVAS_SIZE } from "@/lib/constants";
import {
  cameraAtom,
  canvasRefAtom,
  cursorAtom,
  panModeAtom,
  selectedLayerAtom,
} from "@/lib/jotai-state";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

const Canvas = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useAtom(cameraAtom);
  const { height, width } = useViewportSize();
  const setCursorPos = useSetAtom(cursorAtom);
  const setRef = useSetAtom(canvasRefAtom);
  const setSelectedLayer = useSetAtom(selectedLayerAtom);

  const updateCursorPos = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursorPos({ x, y });
  };

  const updateMobileCursorPos = (event: React.TouchEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    setCursorPos({ x, y });
  };

  //Scroll Mode
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    console.log("scrolling");
    updateCursorPos(event);
    setPos((prev) => {
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

  //Drag Mode
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setSelectedLayer(null);
    if (!panMode) return;
    setIsDragging(true);
    setPos((prev) => ({
      ...prev,
      lastX: event.clientX,
      lastY: event.clientY,
    }));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    updateCursorPos(event);
    if (!panMode) return;
    if (!isDragging) return;
    setPos((prev) => {
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

  //Mobile touch events
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!panMode) return;
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      setPos((prev) => {
        if (!prev.lastX || !prev.lastY) return prev;
        let newX = prev.x + touch.clientX - prev.lastX;
        let newY = prev.y + touch.clientY - prev.lastY;

        const maxX = CANVAS_SIZE / 2 - width / 2;
        const maxY = CANVAS_SIZE / 2 - height / 2;
        const minX = -(CANVAS_SIZE / 2) + width / 2;
        const minY = -(CANVAS_SIZE / 2) + height / 2;

        newX = Math.min(Math.max(newX, minX), maxX);
        newY = Math.min(Math.max(newY, minY), maxY);

        return { x: newX, y: newY, lastX: touch.clientX, lastY: touch.clientY };
      });
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    updateMobileCursorPos(event);
    setpanMode(true);
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
    setpanMode(false);
  };

  useEffect(() => {
    if (canvasRef.current) setRef(canvasRef);
  }, [canvasRef, setRef]);

  return (
    <motion.div
      ref={canvasRef}
      className="border-8 fixed border-red-500 "
      style={{
        height: CANVAS_SIZE,
        width: CANVAS_SIZE,
        translateX: pos.x,
        translateY: pos.y,
        backgroundImage:
          "linear-gradient(to right, black 2px, transparent 1px), linear-gradient(to bottom, black 2px, transparent 1px)",
        backgroundSize: "50px 50px",
        backgroundColor: "#dadad2",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      {children}
    </motion.div>
  );
};

export default Canvas;
