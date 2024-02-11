"use client";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";
import Script from "next/script";
import Canvas from "./canvas";
import Cursor from "./cursor";
import Toolbar from "./toolbar";
import MiniMap from "./minimap";
import UserList from "./online/online-users";
import OnlineChat from "./online/chat";
import OtherCursors from "./online/other-cursors";
import { canvasAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import CanvasItem from "./canvasItem";
import {
  useBroadcastEvent,
  useEventListener,
  useMutation,
  useStorage,
} from "@/liveblocks.config";
import { CanvasLayer } from "@/lib/type";
import { LiveMap, LiveObject } from "@liveblocks/client";
import { useEffect } from "react";

const Whiteboard = () => {
  useDisableScrollBounce();
  const [canvas, setCanvas] = useAtom(canvasAtom);
  const onlineCanvas = useStorage((room) => room.canvas);
  const broadcast = useBroadcastEvent();

  const updateOnlineCanvas = useMutation(
    ({ storage }, canvas: Map<string, CanvasLayer>) => {
      const newCanvas: any = new LiveMap();
      canvas.forEach((value, key) => {
        if (value.type === "sticker") {
          newCanvas.set(
            key,
            new LiveObject({
              id: key,
              type: "sticker",
              src: value.src,
              x: value.x,
              y: value.y,
              width: value.width,
              height: value.height,
            })
          );
        } else if (value.type === "polaroid") {
          newCanvas.set(
            key,
            new LiveObject({
              id: key,
              type: "polaroid",
              x: value.x,
              y: value.y,
              color: value.color,
            })
          );
        }
      });
      storage.set("canvas", newCanvas);
    },
    []
  );

  // useEventListener(({ connectionId, event, user }) => {
  //   if (event.type === "pull") {
  //     setCanvas(onlineCanvas as Map<string, CanvasLayer>);
  //   }
  // });

  useEffect(() => {
    updateOnlineCanvas(canvas);
  }, [broadcast, canvas]);

  //make it offline first in the future

  return (
    <div className="relative overflow-hidden h-[100dvh] flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        <Cursor isClient />
        {[...onlineCanvas.values()].map((item) => {
          return <CanvasItem key={item.id} canvasLayer={item as CanvasLayer} />;
        })}
        {/* Online cursors */}
        <OtherCursors />
      </Canvas>
      <Toolbar />
      <MiniMap />
      {/* Online features */}
      <UserList />
      <OnlineChat />
    </div>
  );
};

export default Whiteboard;
