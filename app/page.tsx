"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userAtom } from "@/lib/jotai-state";
// import { useHMSActions } from "@100mslive/react-sdk";
import { useAtom } from "jotai";
import { InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { TwitterPicker } from "react-color";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const route = useRouter();
  // const hmsActions = useHMSActions();

  //Add chat
  //Make my own color picker component
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user.nickName || !user.color) return;
    // use room code to fetch auth token
    // const authToken = await hmsActions.getAuthTokenByRoomCode({
    //   roomCode: "hfq-hywl-tvu",
    // });

    try {
      // await hmsActions.join({ userName: user.nickName, authToken });
      route.push("/room");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-col h-screen overflow-scroll mx-auto items-center p-4 lg:py-16">
      <Alert className="lg:w-1/2 mb-10">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription className=" text-sm">
          While I&apos;ve put in a significant amount of effort to ensure
          security, keep in mind that this is a public canvas accessible to
          anyone. When testing the video/audio features, be mindful of other
          users online. <br /> I do not store/record any video,audio or data.
          This is strictly a demo project.
        </AlertDescription>
      </Alert>
      <h1 className="lg:text-5xl font-extrabold leading-tight text-3xl">
        Live Whiteboard
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col text-left  gap-6"
      >
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

        <Button disabled={!user.nickName} variant={"outline"} type="submit">
          Join Room
        </Button>
      </form>
    </main>
  );
}
