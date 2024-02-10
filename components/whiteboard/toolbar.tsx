"use client";
import { useAtom, useAtomValue } from "jotai";
import {
  canvasAtom,
  cursorAtom,
  editorAtom,
  panModeAtom,
} from "@/lib/jotai-state";
import { useViewportSize } from "@/hooks/use-viewport-size";
import {
  GrabIcon,
  Hand,
  Mic,
  Mic2,
  MousePointer2,
  NotebookIcon,
  Sticker,
  StickyNote,
  VideoIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { LOTTIE_LINKS, STICKER_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { CanvasLayer, CanvasLayerType } from "@/lib/type";
import { useMutation } from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const [canvas, setCanvas] = useAtom(canvasAtom);
  const editor = useAtomValue(editorAtom);
  const [cursor, setCursor] = useAtom(cursorAtom);

  const togglePanMode = () => {
    setpanMode((prev) => !prev);
  };

  const updateOnlineCanvas = useMutation(
    ({ storage }, canvasLayer: CanvasLayer) => {
      if (canvasLayer.type === CanvasLayerType.POLAROID) {
        storage.get("canvas").set(
          canvasLayer.id,
          new LiveObject({
            id: canvasLayer.id,
            type: canvasLayer.type,
            x: canvasLayer.x,
            y: canvasLayer.y,
            color: canvasLayer.color,
            width: undefined,
            height: undefined,
            src: undefined,
          })
        );
      } else if (canvasLayer.type === CanvasLayerType.STICKER) {
        storage.get("canvas").set(
          canvasLayer.id,
          new LiveObject({
            id: canvasLayer.id,
            type: canvasLayer.type,
            x: canvasLayer.x,
            y: canvasLayer.y,
            width: canvasLayer.width,
            height: canvasLayer.height,
            src: canvasLayer.src,
            color: undefined,
          })
        );
      }
    },
    []
  );

  const addSticker = (link: string) => {
    setCanvas((prev) => {
      const id = crypto.randomUUID();
      prev.set(id, {
        type: CanvasLayerType.STICKER,
        src: link,
        x: cursor.x,
        y: cursor.y,
        width: 200,
        height: 200,
        id,
      });
      updateOnlineCanvas({
        type: CanvasLayerType.STICKER,
        src: link,
        x: cursor.x,
        y: cursor.y,
        width: 200,
        height: 200,
        id,
      });
      return new Map(prev);
    });
    console.log([...editor.canvas.values()]);
  };

  const addNote = () => {
    setCanvas((prev) => {
      const id = crypto.randomUUID();
      prev.set(id, {
        type: CanvasLayerType.POLAROID,
        x: cursor.x,
        y: cursor.y,
        color: "yellow",
        id,
      });
      updateOnlineCanvas({
        type: CanvasLayerType.POLAROID,
        x: cursor.x,
        y: cursor.y,
        color: "yellow",
        id,
      });
      return new Map(prev);
    });

    console.log([...editor.canvas.values()]);
  };

  return (
    <div
      className={cn(
        "absolute top-[4%] items-center -translate-x-1/2 flex left-1/2 z-1 p-4",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4",
        "scale-75 md:scale-100 2xl:scale-150"
      )}
    >
      <Button
        variant={!panMode ? "selected" : "icon"}
        onClick={() => setpanMode(false)}
        tooltip="Cursor"
      >
        <MousePointer2 size={20} />
      </Button>
      <Button
        variant={panMode ? "selected" : "icon"}
        tooltip={"Pan Mode"}
        onClick={togglePanMode}
      >
        <Hand size={20} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"icon"} tooltip="Stickers">
            <Sticker size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-black p-0 border-2 rounded h-60 overflow-y-scroll">
          <div className="grid grid-cols-3 gap-4 p-4">
            {STICKER_LINKS.map((link, index) => (
              <DropdownMenuItem
                key={index}
                className="border-2 border-gray-300 h-20 w-20 aspect-square"
                onClick={() => addSticker(link)}
              >
                <img
                  src={link}
                  alt="sticker"
                  className="w-full h-full object-contain cursor-pointer"
                />
              </DropdownMenuItem>
            ))}
            {LOTTIE_LINKS.map((link, index) => (
              <DropdownMenuItem
                key={index}
                className="border-2 border-gray-300 h-20 w-20 aspect-square"
                onClick={() => addSticker(link)}
              >
                <lottie-player
                  src={link}
                  background="transparent"
                  speed="1"
                  style={{ width: "100%", height: "100%" }}
                  loop
                  autoplay
                ></lottie-player>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant={"icon"} tooltip={"Notes"} onClick={addNote}>
        <StickyNote size={20} />
      </Button>
      <div className="bg-black h-10 w-[1px] rounded-2xl " />
      <Button variant={"icon"} tooltip="Toggle Video">
        <VideoIcon size={20} />
      </Button>
      <Button
        variant={"icon"}
        tooltip="Toggle Audio"
        onClick={() => console.log(editor)}
      >
        <Mic size={20} />
      </Button>
    </div>
  );
};
export default Toolbar;
