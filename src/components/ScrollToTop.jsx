import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that resets the window scroll position to (0, 0)
 * whenever the route path changes.
 */
export default function ScrollToTop() {
  const { pathname, state } = useLocation();
  // Switching language changes the path but it's the same page: keep the scroll position
  const keepScroll = state?.keepScroll;

  useEffect(() => {
    if (!keepScroll) window.scrollTo(0, 0);
  }, [pathname, keepScroll]);

  return null;
}
