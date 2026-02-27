"use client";

import { useEffect } from "react";

export function useScrollDepthEvent(eventName: string) {
  useEffect(() => {
    const onScroll = () => {
      const depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (depth > 0.6) {
        window.dispatchEvent(new CustomEvent(eventName));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [eventName]);
}

