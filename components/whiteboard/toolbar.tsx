"use client";
import { useAtom, useAtomValue } from "jotai";
import { editorAtom, panModeAtom } from "@/lib/jotai-state";
import { useViewportSize } from "@/hooks/use-viewport-size";
import {
  GrabIcon,
  Hand,
  Mic,
  Mic2,
  MousePointer2,
  Sticker,
  VideoIcon,
} from "lucide-react";
import { Button } from "../ui/button";

import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const editor = useAtomValue(editorAtom);
  const { width, height } = useViewportSize();

  const togglePanMode = () => {
    setpanMode((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "absolute top-6 items-center -translate-x-1/2 flex left-1/2 z-1 p-4",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4",
        "scale-75 md:scale-100"
      )}
    >
      <Button
        variant={!panMode ? "selected" : "icon"}
        onClick={() => setpanMode(false)}
      >
        <MousePointer2 size={20} />
      </Button>
      <Button variant={panMode ? "selected" : "icon"} onClick={togglePanMode}>
        <Hand size={20} />
      </Button>
      <Button variant={"icon"}>
        <Sticker size={20} />
      </Button>
      <Separator orientation="vertical" />
      <Button variant={"icon"}>
        <VideoIcon size={20} />
      </Button>
      <Button variant={"icon"}>
        <Mic size={20} />
      </Button>
    </div>
  );
};
export default Toolbar;
