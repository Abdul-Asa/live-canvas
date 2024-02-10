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
import { useStorage } from "@/liveblocks.config";
import { use, useEffect } from "react";
import { CanvasLayer, CanvasLayerType } from "@/lib/type";
import { shallow } from "@liveblocks/client";

const Whiteboard = () => {
  useDisableScrollBounce();
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
