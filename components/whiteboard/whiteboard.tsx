"use client";
import Script from "next/script";
import Canvas from "./canvas";
import Toolbar from "./toolbar";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";

const Whiteboard = () => {
  useDisableScrollBounce();

  return (
    <div className="relative overflow-hidden ">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas />
      <Toolbar />
    </div>
  );
};

export default Whiteboard;
