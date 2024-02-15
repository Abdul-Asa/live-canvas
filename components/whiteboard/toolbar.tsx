<<<<<<< HEAD
import { STICKER_LINKS, LOTTIE_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
=======
"use client";
import { useAtom, useAtomValue } from "jotai";
import {
  canvasAtom,
  cursorAtom,
  editorAtom,
  panModeAtom,
} from "@/lib/jotai-state";
import { useViewportSize } from "@/hooks/use-viewport-size";
>>>>>>> main
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Hand,
  Mic,
  MousePointer2,
<<<<<<< HEAD
  Settings,
=======
  NotebookIcon,
>>>>>>> main
  Sticker,
  StickyNote,
  VideoIcon,
} from "lucide-react";
import { Button } from "../ui/button";
<<<<<<< HEAD
import { panModeAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { Separator } from "../ui/separator";
import React, { useState } from "react";
import { DeviceType, useAVToggle, useDevices } from "@100mslive/react-sdk";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const [trigger, setTrigger] = useState(false);
  const { allDevices, selectedDeviceIDs, updateDevice } = useDevices();
  const { videoInput, audioInput, audioOutput } = allDevices;
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
=======
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
>>>>>>> main

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
        trigger ? "translate-x-0" : "translate-x-full",
        "absolute right-0 top-10 z-1 p-4 transition-transform duration-300 items-center z-1",
        "lg:-translate-x-1/2 lg:right-auto flex lg:left-1/2 lg:flex-row",
        "text-black bg-secondary-light flex-col border-2 rounded border-gray-700  gap-4"
      )}
    >
      <Button
        className="lg:hidden w-12 h-12 absolute top-4 border border-black left-0 -translate-x-full"
        tooltip={"Toggle Toolbar"}
        onClick={() => setTrigger(!trigger)}
      >
        {trigger ? <ArrowBigRight /> : <ArrowBigLeft />}
      </Button>
      <Button
        className="w-12 h-12"
        variant={panMode ? "icon" : "selected"}
        onClick={() => setpanMode(false)}
        tooltip="Cursor"
      >
        <MousePointer2 />
      </Button>
      <Button
        className="w-12 h-12"
        variant={panMode ? "selected" : "icon"}
        tooltip={"Pan Mode"}
        onClick={() => setpanMode(true)}
      >
        <Hand />
      </Button>
<<<<<<< HEAD
      <Button className="w-12 h-12" variant={"icon"} tooltip={"Notes"}>
        <StickyNote />
=======
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
>>>>>>> main
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-12 h-12" variant={"icon"} tooltip="Stickers">
            <Sticker />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-black p-0 border-2 rounded  h-60 overflow-y-scroll">
          <div className="grid grid-cols-3 gap-4 p-4">
            {STICKER_LINKS.map((link, index) => (
              <DropdownMenuItem
                key={index}
                className="border-2 border-gray-300 h-20 w-20 aspect-square"
                // onClick={() => addSticker(link)}
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
                // onClick={() => addSticker(link)}
              >
                <lottie-player
                  src={link}
                  background="transparent"
                  style={{ width: "100%", height: "100%" }}
                  loop
                  autoplay
                ></lottie-player>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator className="bg-black lg:hidden" />
      <div className="bg-black h-10 w-[1px] rounded-2xl hidden lg:block " />

      <Button
        className="w-12 h-12"
        variant={isLocalVideoEnabled ? "selected" : "icon"}
        tooltip="Toggle Video"
        onClick={toggleVideo}
      >
        <VideoIcon />
      </Button>
      <Button
<<<<<<< HEAD
        className="w-12 h-12"
        variant={isLocalAudioEnabled ? "selected" : "icon"}
        tooltip="Toggle Audio"
        onClick={toggleAudio}
      >
        <Mic />
=======
        variant={"icon"}
        tooltip="Toggle Audio"
        onClick={() => console.log(editor)}
      >
        <Mic size={20} />
>>>>>>> main
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-12 h-12" variant={"icon"} tooltip="Stickers">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-black p-4 border-2 rounded  overflow-y-scroll">
          <DropdownMenuLabel>Device Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Select
              title="Camera"
              value={selectedDeviceIDs.videoInput}
              list={videoInput}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.videoInput,
                })
              }
            />{" "}
            <Select
              title="Microphone"
              value={selectedDeviceIDs.audioInput}
              list={audioInput}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.audioInput,
                })
              }
            />
            <Select
              title="Speaker"
              value={selectedDeviceIDs.audioOutput}
              list={audioOutput}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateDevice({
                  deviceId: e.target.value,
                  deviceType: DeviceType.audioOutput,
                })
              }
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Select = ({ list, value, onChange, title }: any) => {
  return (
    <div className="">
      <span>{title}:</span>
      {list?.length ? (
        <select onChange={onChange} value={value}>
          {list.map((device: MediaDeviceInfo) => (
            <option value={device.deviceId} key={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};

export default Toolbar;
