"use client";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";
import useIsMobile from "@/hooks/use-is-mobile";
import CanvasBoard from "./canvas";
import Toolbar from "./toolbar";
import Script from "next/script";
import Cursor from "./cursor";
import { useAtom } from "jotai";
import { cursorAtom, userAtom } from "@/lib/jotai-state";

const Whiteboard = () => {
  const isMobile = useIsMobile();
  const [{nickName,color}] = useAtom(userAtom);
  const [cursor] = useAtom(cursorAtom);
  useDisableScrollBounce();

  return (
    <div className="relative overflow-hidden h-[100svh] flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <CanvasBoard>
        <Cursor
          isClient
          isMobile={isMobile}
          nickName={nickName}
          color={color}
          cursor={cursor}
        />
      </CanvasBoard>
      <Toolbar />
    </div>
  );
};

export default Whiteboard;
