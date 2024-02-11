"use client";
import { useAtom, useAtomValue } from "jotai";
import {
  canvasAtom,
  cursorAtom,
  editorAtom,
  panModeAtom,
  userAtom,
} from "@/lib/jotai-state";
import {
  Hand,
  Mic,
  MousePointer2,
  Sticker,
  StickyNote,
  User,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CanvasLayerType } from "@/lib/type";
import { STICKER_LINKS, LOTTIE_LINKS } from "@/lib/constants";
import { Separator } from "../ui/separator";
import { useMyPresence, useOthersMapped } from "@/liveblocks.config";
import { useState, useRef } from "react";
import { TwitterPicker } from "react-color";

const Toolbar = () => {
  const [panMode, setpanMode] = useAtom(panModeAtom);
  const [canvas, setCanvas] = useAtom(canvasAtom);
  const editor = useAtomValue(editorAtom);
  const [cursor, setCursor] = useAtom(cursorAtom);
  //online user stuff
  const [{ nickName, color }, updateMyPresence] = useMyPresence();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const otherUsers = useOthersMapped((other) => other.presence);
  const [user, setUser] = useAtom(userAtom);

  const togglePanMode = () => {
    setpanMode((prev) => !prev);
  };
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

      return new Map(prev);
    });

    console.log([...editor.canvas.values()]);
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
      <Button variant={"icon"} tooltip={"Notes"} onClick={addNote}>
        <StickyNote size={20} />
      </Button>{" "}
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
      <div className="bg-black h-10 w-[1px] rounded-2xl " />
      <Button variant={"icon"} tooltip="Toggle Video">
        <VideoIcon size={20} />
      </Button>
      <Button variant={"icon"} tooltip="Toggle Audio">
        <Mic size={20} />
      </Button>
      <div className="bg-black h-10 w-[1px] rounded-2xl lg:hidden " />
      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button variant="icon">
            <User size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Online Users</SheetTitle>
          </SheetHeader>
          <div className="flex items-center h-10 w-full gap-10 justify-between">
            {editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nickName.length > 0 && setEditing(false);
                }}
              >
                <Input
                  ref={inputRef}
                  autoFocus
                  className="w-36 p-1"
                  value={nickName}
                  onChange={(e) => {
                    updateMyPresence({ nickName: e.target.value });
                    setUser((prev) => ({
                      ...prev,
                      nickName: e.target.value,
                    }));
                  }}
                  onBlur={() => {
                    nickName.length > 0 && setEditing(false);
                    nickName.length === 0 && inputRef.current?.focus();
                  }}
                />
              </form>
            ) : (
              <p className="w-36 truncate" onClick={() => setEditing(true)}>
                {nickName}
              </p>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  className="h-5 w-5 rounded border-copy border"
                  style={{ backgroundColor: color }}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-black p-0 border-2 rounded">
                <TwitterPicker
                  width="140px"
                  styles={{}}
                  color={color}
                  triangle="hide"
                  onChange={(color) => {
                    updateMyPresence({ color: color.hex });
                    setUser((prev) => ({ ...prev, color: color.hex }));
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 mt-4">
            {otherUsers.map(([id, user]) => (
              <>
                <Separator className="bg-primary-dark" />
                <div
                  key={id}
                  className="flex items-center justify-between w-full"
                  style={{ color: user.color }}
                >
                  <p>{user.nickName}</p>
                  <div
                    className="h-5 w-5 rounded border-copy border"
                    style={{ backgroundColor: user.color }}
                  />
                </div>
              </>
            ))}

            {!otherUsers.length && (
              <>
                <Separator className="bg-primary-dark" />
                <p className="text-center text-primary-dark">No users online</p>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Toolbar;
