// CanvasItem.tsx
import { canvasAtom, canvasRefAtom, cursorAtom } from "@/lib/jotai-state";
import { CanvasLayer, CanvasLayerType, Polaroid, Sticker } from "@/lib/type";
import { PanInfo, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useRef } from "react";

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
  const stickerRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    if (!canvasList.get(id)) return;
    updateCanvasList((prev) => {
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
      prev.set(id, { ...sticker, width: width - 50, height: height - 50 });
      return new Map(prev);
    });
  };

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!canvasList.get(id)) return;
    const stickerRect = stickerRef.current?.getBoundingClientRect();
    if (!stickerRect) return;
    if (event instanceof MouseEvent || event instanceof PointerEvent) {
      const offsetX = event.clientX - stickerRect.left;
      const offsetY = event.clientY - stickerRect.top;

      updateCanvasList((prev) => {
        prev.set(id, {
          ...sticker,
          x: cursor.x - offsetX,
          y: cursor.y - offsetY,
        });
        return new Map(prev);
      });
    } else if (event instanceof TouchEvent) {
      event.stopPropagation();
      const offsetX = event.touches[0].clientX - stickerRect.left;
      const offsetY = event.touches[0].clientY - stickerRect.top;

      updateCanvasList((prev) => {
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
      className="border border-blue-400 mix-blend-multiply filter"
      drag
      dragConstraints={canvasRef !== null ? canvasRef : false}
      dragMomentum={false}
      onDrag={handleDrag}
      style={{
        x,
        y,
        position: "absolute",
        cursor: "grab",
        zIndex: 10,
      }}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
    >
      {x.toFixed(0)}: {y.toFixed(0)}
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
  // Basic structure for a polaroid component
  // You would add more styling and potentially more structure to make it look
  // like the example image you provided
  return (
    <motion.div
      className="polaroid"
      drag // Make the polaroid draggable
      dragConstraints={canvasRef !== null ? canvasRef : false}
      style={{
        x: polaroid.x,
        y: polaroid.y,
        position: "absolute",
        width: "200px", // Set a fixed size or make it resizable
        height: "250px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 10,
      }}
      onDoubleClick={() => {
        // handle double click event if needed
      }}
    >
      <div
        className="title-bar"
        style={{ cursor: "grab", backgroundColor: polaroid.color }}
      >
        {/* Draggable title bar */}
      </div>
      <div className="content">
        {polaroid.x}: {polaroid.y}
      </div>
    </motion.div>
  );
};

export default CanvasItem;
