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

const Whiteboard = () => {
  useDisableScrollBounce();
  const [canvas, setCanvas] = useAtom(canvasAtom);
  //make it offline first in the future

  return (
    <div className="relative overflow-hidden h-[100dvh] flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        <Cursor isClient />
        {/* {[...canvas.values()].map((item) => {
          return <CanvasItem key={item.id} canvasLayer={item} />;
        })} */}
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
