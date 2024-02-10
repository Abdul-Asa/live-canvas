import { cursorAtom } from "@/lib/jotai-state";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

const Cursor = () => {
  const [{ x, y }, setCursorPos] = useAtom(cursorAtom);

  return (
    <motion.span
      className="absolute border-2 p-1 border-white bg-red-500 text-white pointer-events-none"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
      }}
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <p className="w-40 truncate">Anonymous Anonymous</p>
    </motion.span>
  );
};

export default Cursor;
