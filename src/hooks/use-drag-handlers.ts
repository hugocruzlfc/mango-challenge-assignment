import { useCallback } from "react";

export function useDragHandlers(
  setDragging: (value: "min" | "max" | null) => void,
  handleMouseMove: (e: MouseEvent) => void
) {
  const handleMouseUp = useCallback(() => {
    setDragging(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, setDragging]);

  const handleMouseDown = useCallback(
    (type: "min" | "max") => {
      setDragging(type);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
    },
    [handleMouseMove, handleMouseUp, setDragging]
  );

  return { handleMouseDown };
}
