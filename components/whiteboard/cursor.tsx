import { cursorAtom } from "@/lib/jotai-state";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

const Cursor = () => {
  const [cursorPos, setCursorPos] = useAtom(cursorAtom);

  return (
    <motion.span
      className="absolute border p-1"
      style={{
        translateX: cursorPos.x,
        translateY: cursorPos.y,
        pointerEvents: "none", // Prevent span from interfering with mouse events
      }}
    >
      {`${cursorPos.x.toFixed(0)}px, ${cursorPos.y.toFixed(0)}px`}
    </motion.span>
  );
};

export default Cursor;
