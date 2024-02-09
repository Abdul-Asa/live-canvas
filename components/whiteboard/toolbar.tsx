import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "../ui/button";
import { editorAtom, isDraggingAtom } from "@/lib/jotai-state";

const Toolbar = () => {
  const [drag, setDrag] = useAtom(isDraggingAtom);
  const editor = useAtomValue(editorAtom);

  return (
    <div className="absolute top-10 left-1/2 z-1 p-4 border-2 rounded -translate-x-1/2 flex gap-4">
      <Button
        onClick={() => setDrag((prev) => !prev)}
        variant={drag ? "ghost" : "default"}
      >
        Drag
      </Button>
      <Button onClick={() => console.log(editor)}>Store</Button>
    </div>
  );
};
export default Toolbar;
