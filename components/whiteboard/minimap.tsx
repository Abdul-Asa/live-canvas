"use client";
import { useViewportSize } from "@/hooks/use-viewport-size";
import { CANVAS_SIZE } from "@/lib/constants";
import { cameraAtom, cursorAtom } from "@/lib/jotai-state";
import { cn } from "@/lib/utils";
import { PanInfo, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LockIcon } from "lucide-react";

const MiniMap = () => {
  const [trigger, setTrigger] = useState(true);
  const minimapRef = useRef<HTMLDivElement>(null);
  const [lockMinimap, setLockMinimap] = useState(false);
  const { width, height } = useViewportSize();
  const [camera, setCamera] = useAtom(cameraAtom);
  const [cursor, setCursor] = useAtom(cursorAtom);

  const divider = useMemo(() => {
    if (width > 1600) return 15;
    if (width > 600) return 18;
    return 20;
  }, [width]);

  //   const handleDrag = (
  //     e: PointerEvent | TouchEvent | MouseEvent,
  //     info: PanInfo
  //   ) => {
  //     const newCameraX = x - info.offset.x * divider;
  //     const newCameraY = y - info.offset.y * divider;

  //     // Calculate bounds
  //     const maxX = CANVAS_SIZE / 2 - width / 2;
  //     const maxY = CANVAS_SIZE / 2 - height / 2;
  //     const minX = -(CANVAS_SIZE / 2) + width / 2;
  //     const minY = -(CANVAS_SIZE / 2) + height / 2;

  //     // Apply constraints to the new camera position
  //     const constrainedX = Math.min(Math.max(newCameraX, minX), maxX);
  //     const constrainedY = Math.min(Math.max(newCameraY, minY), maxY);

  //     // Update the camera atom with the constrained position
  //     setCamera({ x: constrainedX, y: constrainedY });
  //   };

  return (
    <div
      className={cn(
        trigger ? "max-h-[300px] max-w-[300px]" : "max-h-14 max-w-52",
        "hidden md:block absolute bottom-6 items-center left-10 z-1 px-4 pb-4 overflow-hidden transition-all duration-1000",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4"
      )}
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => {
        if (!lockMinimap) setTrigger(false);
      }}
    >
      <div className="flex items-center min-w-[100px] justify-between gap-2 my-2">
        <p>
          {cursor.x.toFixed(0)}px:{cursor.y.toFixed(0)}px
        </p>
        <Button
          variant={lockMinimap ? "selected" : "outline"}
          size={"sm"}
          onClick={() => setLockMinimap((prev) => !prev)}
        >
          <LockIcon size={12} />
        </Button>
      </div>

      <div
        className="border-2 border-red-600 relative flex items-center justify-center"
        ref={minimapRef}
        style={{
          width: CANVAS_SIZE / divider,
          height: CANVAS_SIZE / divider,
        }}
      >
        <motion.div
          drag
          dragConstraints={minimapRef}
          dragMomentum={false}
          dragElastic={0}
          className="bg-white border-2 border-gray-700"
          style={{
            width: width / divider,
            height: height / divider,
          }}
          animate={{ x: -camera.x / divider, y: -camera.y / divider }}
          transition={{ duration: 0 }}
          //   onDrag={handleDrag}
        ></motion.div>
      </div>
    </div>
  );
};

export default MiniMap;
