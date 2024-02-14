import { deviceInfoAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { useEffect } from "react";

function useIsMobile() {
  const [{ isMobile }, setIsMobile] = useAtom(deviceInfoAtom);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      setIsMobile((prev) => ({ ...prev, isMobile: mobile }));
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
