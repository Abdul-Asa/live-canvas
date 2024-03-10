"use client";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";
import useIsMobile from "@/hooks/use-is-mobile";
import CanvasBoard from "./canvas";
import Toolbar from "./toolbar";
import Script from "next/script";
import Cursor from "./cursor";
import { useAtom } from "jotai";
import { cursorAtom, userAtom } from "@/lib/jotai-state";
import OtherCursors from "./other-cursors";
import { useEffect } from "react";
import MiniMap from "./minimap";
import { useOthers } from "@/liveblocks.config";
import {
  useHMSStore,
  selectIsConnectedToRoom,
  useHMSActions,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import { Button } from "../ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const Whiteboard = () => {
  const isMobile = useIsMobile();
  const [{ nickName, color }] = useAtom(userAtom);
  const [cursor] = useAtom(cursorAtom);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const capacity = useOthers().length;

  useDisableScrollBounce();

  useEffect(() => {
    async function loginToVideoRoom() {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: process.env.NEXT_PUBLIC_HMS_ROOM_ID as string,
      });
      try {
        await hmsActions.join({
          userName: nickName,
          authToken,
          rememberDeviceSelection: true,
          settings: {
            isAudioMuted: true,
            isVideoMuted: true,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
    if (!isConnected) loginToVideoRoom();
  }, [hmsActions, isConnected]);

  return (
    <div className="relative overflow-hidden h-[100svh] flex items-center justify-center">
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="lazyOnload"
      />
      <p className=" absolute top-0 z-20">{isConnected}</p>
      <CanvasBoard>
        {localPeer && (
          <Cursor
            isClient
            isMobile={isMobile}
            nickName={nickName}
            color={color}
            cursor={cursor}
            peer={localPeer}
          />
        )}
        <OtherCursors />
      </CanvasBoard>
      <Toolbar />
      <MiniMap />
      <Link href={"/"}>
        <Button
          className="absolute bottom-4 right-4 border-2 border-black bg-primary-light"
          variant="icon"
          onClick={() => hmsActions.leave()}
        >
          <HomeIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Whiteboard;
