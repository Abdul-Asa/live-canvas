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

const Whiteboard = () => {
  useDisableScrollBounce();
  //make it offline first in the future

  return (
    <div className="relative overflow-hidden h-screen flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        <Cursor isClient />
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
