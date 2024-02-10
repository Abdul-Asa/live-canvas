"use client";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";
import Script from "next/script";
import Canvas from "./canvas";
import Cursor from "./cursor";
import Toolbar from "./toolbar";
import MiniMap from "./minimap";

const Whiteboard = () => {
  useDisableScrollBounce();

  return (
    <div className="relative overflow-hidden h-screen flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        <Cursor />
      </Canvas>
      <Toolbar />
      <MiniMap />
    </div>
  );
};

export default Whiteboard;
