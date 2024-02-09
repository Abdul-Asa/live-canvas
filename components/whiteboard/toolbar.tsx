"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "../ui/button";
import { editorAtom, dragModeAtom } from "@/lib/jotai-state";
import { useViewportSize } from "@/hooks/use-viewport-size";

const Toolbar = () => {
  const [dragMode, setDragMode] = useAtom(dragModeAtom);
  const editor = useAtomValue(editorAtom);
  const { width, height } = useViewportSize();

  return (
    <div className="absolute top-10 left-1/2 z-1 p-4 border-2 rounded -translate-x-1/2 flex gap-4">
      <Button
        onClick={() => setDragMode((prev) => !prev)}
        variant={dragMode ? "ghost" : "default"}
      >
        Drag
      </Button>
      <Button onClick={() => console.log(editor.canvas.values())}>Store</Button>
    </div>
  );
};
export default Toolbar;
