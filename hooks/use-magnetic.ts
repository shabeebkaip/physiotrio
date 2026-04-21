import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * A hook that adds a "magnetic" attraction effect to an element
 * when the mouse hovers near it.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // quickTo is highly optimized for frequent updates (mouse move)
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      // Calculate distance from center
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const x = clientX - centerX;
      const y = clientY - centerY;
      
      // Move 35% of the distance from center
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}
