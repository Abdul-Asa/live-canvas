"use client";
import useDisableScrollBounce from "@/hooks/use-disable-bounce";
import { canvasAtom } from "@/lib/jotai-state";
import { CanvasLayerType, CanvasLayer, Polaroid } from "@/lib/type";
import { useAtom } from "jotai";
import Script from "next/script";
import { useEffect } from "react";
import Canvas from "./canvas";
import Cursor from "./cursor";
import Toolbar from "./toolbar";
import { CANVAS_SIZE } from "@/lib/constants";
import CanvasItem from "./canvasItem";

function generateNotes(): CanvasLayer[] {
  return [...Array(2)].map(() => ({
    type: CanvasLayerType.POLAROID,
    id: crypto.randomUUID(),
    x: Math.random() * CANVAS_SIZE,
    y: Math.random() * CANVAS_SIZE,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  }));
}

function generateStickers(): CanvasLayer[] {
  return ["/flower.json", "/sunglasses.png", "/amogus.webp", "/run.gif"].map(
    (src) => ({
      type: CanvasLayerType.STICKER,
      id: crypto.randomUUID(),
      x: Math.random() * CANVAS_SIZE,
      y: Math.random() * CANVAS_SIZE,
      src,
      height: 100, // Define your height
      width: 100, // Define your width
    })
  );
}

const Whiteboard = () => {
  useDisableScrollBounce();
  const [canvas, setCanvas] = useAtom(canvasAtom);

  useEffect(() => {
    const stickers = generateStickers();
    const newCanvas = new Map([...stickers].map((item) => [item.id, item]));
    setCanvas(newCanvas);
  }, []);

  return (
    <div className="relative overflow-hidden h-screen flex items-center justify-center">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Canvas>
        {[...canvas.values()].map((canvasLayer) => (
          <CanvasItem key={canvasLayer.id} canvasLayer={canvasLayer} />
        ))}
        <Cursor />
      </Canvas>
      <Toolbar />
    </div>
  );
};

export default Whiteboard;
