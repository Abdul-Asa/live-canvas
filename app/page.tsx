"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { TwitterPicker } from "react-color";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const route = useRouter();
  return (
    <main className="flex flex-col h-screen justify-center items-center py-24">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-extra">
        Live Whiteboard
      </h1>
      <div className="mt-6 flex flex-col text-left  gap-6">
        <div className="flex flex-col gap-2">
          <label className="self-start font-bold leading-tight">
            Enter your name
          </label>
          <Input
            className="input"
            id="room-id"
            placeholder="Username..."
            value={user.nickName}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                nickName: e.target.value.slice(0, 10),
              }))
            }
            required
            autoComplete="off"
          />
          <Separator className="bg-primary-dark" />
          <label className="self-start font-bold leading-tight">
            Pick a color
          </label>
          <div
            className="w-8 h-8 ml-1 mb-1 rounded border-2 border-gray-800"
            style={{ backgroundColor: user.color }}
          ></div>
          <TwitterPicker
            color={user.color}
            onChange={(color) =>
              setUser((prev) => ({ ...prev, color: color.hex }))
            }
          />
        </div>

        <Button
          disabled={!user.nickName}
          variant={"outline"}
          onClick={() => route.push("/room")}
        >
          Join Room
        </Button>
      </div>
    </main>
  );
}
