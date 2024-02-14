import { STICKER_LINKS, LOTTIE_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Hand,
  Mic,
  MousePointer2,
  MousePointerIcon,
  Sticker,
  StickyNote,
  VideoIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { panModeAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { Separator } from "../ui/separator";
import { useState } from "react";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const [trigger, setTrigger] = useState(false);

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
      <Button className="w-12 h-12" variant={"icon"} tooltip={"Notes"}>
        <StickyNote />
      </Button>{" "}
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
      <Button className="w-12 h-12" variant={"icon"} tooltip="Toggle Video">
        <VideoIcon />
      </Button>
      <Button className="w-12 h-12" variant={"icon"} tooltip="Toggle Audio">
        <Mic />
      </Button>
    </div>
  );
};

export default Toolbar;
