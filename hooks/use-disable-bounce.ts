import { useEffect } from "react";

export default function useDisableScrollBounce() {
  useEffect(() => {
    // Disable scroll bounce on window to make the panning work properly
    document.body.classList.add("no_scroll");
    return () => {
      document.body.classList.remove("no_scroll");
    };
  }, []);
}
