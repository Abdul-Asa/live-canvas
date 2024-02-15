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
<<<<<<< HEAD
import {
  useHMSStore,
  selectIsConnectedToRoom,
  useHMSActions,
  selectLocalPeer,
  selectRemotePeers,
} from "@100mslive/react-sdk";
=======
import UserList from "./online/online-users";
import OnlineChat from "./online/chat";
import OtherCursors from "./online/other-cursors";
import { canvasAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import CanvasItem from "./canvasItem";
import { useStorage } from "@/liveblocks.config";
import { use, useEffect } from "react";
import { CanvasLayer, CanvasLayerType } from "@/lib/type";
import { shallow } from "@liveblocks/client";
>>>>>>> main

const Whiteboard = () => {
  const isMobile = useIsMobile();
  const [{ nickName, color }] = useAtom(userAtom);
  const [cursor] = useAtom(cursorAtom);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);

  useDisableScrollBounce();
<<<<<<< HEAD

  useEffect(() => {
    async function loginToVideoRoom() {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: "hfq-hywl-tvu",
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
=======
  const [canvas, setCanvas] = useAtom(canvasAtom);
  //make it offline first in the future
  const onlineCanvas = useStorage((root) => root.canvas, shallow);

  useEffect(() => {
    if (onlineCanvas) {
      const newCanvas: Map<string, CanvasLayer> = new Map();
      onlineCanvas.forEach((value, key) => {
        if (value.type === "sticker") {
          newCanvas.set(key, {
            id: key,
            type: CanvasLayerType.STICKER,
            x: value.x,
            y: value.y,
            src: value.src!,
            width: value.width!,
            height: value.height!,
          });
        }
        if (value.type === "polaroid") {
          newCanvas.set(key, {
            id: key,
            type: CanvasLayerType.POLAROID,
            x: value.x,
            y: value.y,
            color: value.color!,
          });
        }
      });
      setCanvas(newCanvas);
    }
  }, [onlineCanvas, setCanvas]);

  return (
    <div className="relative overflow-hidden h-screen flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        <Cursor isClient />
        {[...canvas.values()].map((item) => {
          return <CanvasItem key={item.id} canvasLayer={item} />;
        })}
        {/* Online cursors */}
>>>>>>> main
        <OtherCursors />
      </CanvasBoard>
      <Toolbar />
      <MiniMap />
    </div>
  );
};

export default Whiteboard;
