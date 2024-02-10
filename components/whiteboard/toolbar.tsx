"use client";
import { useAtom, useAtomValue } from "jotai";
import { editorAtom, panModeAtom } from "@/lib/jotai-state";
import { Hand, Mic, MousePointer2, Sticker, VideoIcon } from "lucide-react";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const editor = useAtomValue(editorAtom);

  const togglePanMode = () => {
    setpanMode((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "absolute top-4 lg:top-[4%] items-center -translate-x-1/2 flex left-1/2 z-1 p-4",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4",
        "scale-50 lg:scale-100 2xl:scale-150"
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
      <Button variant={"icon"} tooltip={"Stickers"}>
        <Sticker size={20} />
      </Button>
      <div className="bg-black h-10 w-[1px] rounded-2xl " />
      <Button variant={"icon"} tooltip="Toggle Video">
        <VideoIcon size={20} />
      </Button>
      <Button variant={"icon"} tooltip="Toggle Audio">
        <Mic size={20} />
      </Button>
    </div>
  );
};
export default Toolbar;
