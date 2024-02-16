import { deviceInfoAtom } from "@/lib/jotai-state";
import { useAtom } from "jotai";
import { useEffect } from "react";

function useIsMobile(updateOnlineStatus?: (newStatus: boolean) => void) {
  const [{ isMobile }, setIsMobile] = useAtom(deviceInfoAtom);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );

      if (updateOnlineStatus) {
        updateOnlineStatus(mobile);
      }

      setIsMobile((prev) => ({
        ...prev,
        isMobile: mobile,
        deviceType: userAgent,
      }));
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
