import { deviceInfoAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useViewportSize = () => {
  const [{ width, height }, updateViewPortSize] = useAtom(deviceInfoAtom);

  useEffect(() => {
    const handleResize = () => {
      updateViewPortSize((prev) => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
};
