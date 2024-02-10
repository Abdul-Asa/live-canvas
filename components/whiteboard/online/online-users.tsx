"use client";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Minimize2, SeparatorVertical } from "lucide-react";
import { TwitterPicker } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useMyPresence, useOthersMapped } from "@/liveblocks.config";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai-state";

const UserList = () => {
  const [trigger, setTrigger] = useState(false);
  const [{ nickName, color }, updateMyPresence] = useMyPresence();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const otherUsers = useOthersMapped((other) => other.presence);
  const [user, setUser] = useAtom(userAtom);

  return (
    <div
      className={cn(
        trigger ? "max-h-[300px]" : "max-h-[74px]",
        "hidden md:block absolute top-[4%] items-center right-10 z-1 w-[300px] p-4 overflow-hidden transition-all duration-1000",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4",
        "scale-75 md:scale-100 2xl:scale-150"
      )}
    >
      <div className="flex items-center h-10 w-full gap-10 justify-between">
        <div className=" flex items-center justify-between w-full">
          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nickName.length > 0 && setEditing(false);
              }}
            >
              <input
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

        <Minimize2
          className=" cursor-pointer "
          size={16}
          onClick={() => setTrigger((prev) => !prev)}
        />
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
    </div>
  );
};

export default UserList;
