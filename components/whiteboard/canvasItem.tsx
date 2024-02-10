"use client";
import {
  canvasAtom,
  canvasRefAtom,
  cursorAtom,
  selectedLayerAtom,
} from "@/lib/jotai-state";
import { CanvasLayer, CanvasLayerType, Polaroid, Sticker } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useMutation, useMyPresence } from "@/liveblocks.config";
import { PanInfo, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useRef } from "react";

const CanvasItem: React.FC<{ canvasLayer: CanvasLayer }> = ({
  canvasLayer,
}) => {
  if (canvasLayer.type === CanvasLayerType.STICKER) {
    return <StickerComponent sticker={canvasLayer} />;
  } else if (canvasLayer.type === CanvasLayerType.POLAROID) {
    return <PolaroidComponent polaroid={canvasLayer} />;
  } else {
    return null; // or a default component
  }
};

const StickerComponent: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
  const { src, width, height, x, y, id } = sticker;
  const [canvasList, updateCanvasList] = useAtom(canvasAtom);
  const cursor = useAtomValue(cursorAtom);
  const canvasRef = useAtomValue(canvasRefAtom);
  const [selected, setSelected] = useAtom(selectedLayerAtom);
  const stickerRef = useRef<HTMLDivElement>(null);
  const [{ selectedLayer }, updateMyPresence] = useMyPresence();

  const updateLayers1 = useMutation(
    ({ storage }, { id, newHeight, newWidth }) => {
      storage.get("canvas").get(id)?.update({
        width: newWidth,
        height: newHeight,
      });
    },
    []
  );
  const updateLayers2 = useMutation(({ storage }, { id, newX, newY }) => {
    storage.get("canvas").get(id)?.update({
      x: newX,
      y: newY,
    });
  }, []);

  const handleDoubleClick = () => {
    if (!canvasList.get(id)) return;
    updateCanvasList((prev) => {
      updateLayers1({ id, newHeight: height + 50, newWidth: width + 50 });
      prev.set(id, { ...sticker, width: width + 50, height: height + 50 });
      return new Map(prev);
    });
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasList.get(id)) return;
    updateCanvasList((prev) => {
      if (width <= 50 || height <= 50) {
        return prev;
      }
      updateLayers1({ id, newHeight: height - 50, newWidth: width - 50 });
      prev.set(id, { ...sticker, width: width - 50, height: height - 50 });
      return new Map(prev);
    });
  };

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    event.stopPropagation();
    if (!canvasList.get(id)) return;
    const stickerRect = stickerRef.current?.getBoundingClientRect();
    if (!stickerRect) return;

    if (event instanceof MouseEvent || event instanceof PointerEvent) {
      const offsetX = event.clientX - stickerRect.left;
      const offsetY = event.clientY - stickerRect.top;

      updateCanvasList((prev) => {
        updateLayers2({
          id,
          newX: cursor.x - offsetX,
          newY: cursor.y - offsetY,
        });
        prev.set(id, {
          ...sticker,
          x: cursor.x - offsetX,
          y: cursor.y - offsetY,
        });
        return new Map(prev);
      });
    }
  };

  return (
    <motion.div
      ref={stickerRef}
      className={cn(selected === id && "border border-blue-500")}
      drag
      dragConstraints={canvasRef !== null ? canvasRef : false}
      dragMomentum={false}
      onDrag={handleDrag}
      style={{
        x,
        y,
        position: "absolute",
        cursor: "grab",
        zIndex: selected === id ? 5 : 4,
      }}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      onPointerDown={(e) => {
        e.stopPropagation();
        setSelected(id);
        updateMyPresence({ selectedLayer: id });
      }}
    >
      {src.endsWith(".json") ? (
        <lottie-player
          autoplay
          loop
          mode="normal"
          src={src}
          style={{ width, height }}
        ></lottie-player>
      ) : (
        <Image
          src={src}
          width={width}
          height={height}
          alt="sticker"
          className=" select-none pointer-events-none h-auto w-auto"
        />
      )}
    </motion.div>
  );
};

const PolaroidComponent: React.FC<{ polaroid: Polaroid }> = ({ polaroid }) => {
  const canvasRef = useAtomValue(canvasRefAtom);
  const { x, y, id } = polaroid;
  const [canvasList, updateCanvasList] = useAtom(canvasAtom);
  const cursor = useAtomValue(cursorAtom);
  const [selected, setSelected] = useAtom(selectedLayerAtom);
  const polRef = useRef<HTMLDivElement>(null);
  const [{ selectedLayer }, updateMyPresence] = useMyPresence();
  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    event.stopPropagation();
    if (!canvasList.get(id)) return;
    const polaroidRef = polRef.current?.getBoundingClientRect();
    if (!polaroidRef) return;
    if (event instanceof MouseEvent || event instanceof PointerEvent) {
      const offsetX = event.clientX - polaroidRef.left;
      const offsetY = event.clientY - polaroidRef.top;

      updateCanvasList((prev) => {
        prev.set(id, {
          ...polaroid,
          x: cursor.x - offsetX,
          y: cursor.y - offsetY,
        });
        return new Map(prev);
      });
    }
  };
  return (
    <motion.div
      ref={polRef}
      className={cn(" ", selected === id && "border border-blue-500")}
      drag
      dragConstraints={canvasRef !== null ? canvasRef : false}
      dragMomentum={false}
      onDrag={handleDrag}
      onPointerDown={(e) => {
        e.stopPropagation();
        setSelected(id);
        updateMyPresence({ selectedLayer: id });
      }}
      style={{
        x,
        y,
        position: "absolute",
        width: "200px", // Set a fixed size or make it resizable
        height: "250px",
        backgroundColor: "white",
        boxShadow: "-0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26)",
        zIndex: selected === id ? 5 : 4,
      }}
    >
      {x.toFixed(0)}: {y.toFixed(0)}
    </motion.div>
  );
};

export default CanvasItem;
