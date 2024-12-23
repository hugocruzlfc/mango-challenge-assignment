"use client";

import { useCallback, useRef, useState } from "react";

interface FixedRangeProps {
  values: number[];
}

export default function FixedRange({ values }: FixedRangeProps) {
  const [minValue, setMinValue] = useState(values[0]);
  const [maxValue, setMaxValue] = useState(values[values.length - 1]);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPosition = (value: number) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return ((value - min) / (max - min)) * 100;
  };

  const roundToClosestValue = (position: number) => {
    return values.reduce((prev, curr) =>
      Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const newValue =
        ((e.clientX - rect.left) / rect.width) *
          (Math.max(...values) - Math.min(...values)) +
        Math.min(...values);
      const roundedValue = roundToClosestValue(newValue);

      if (dragging === "min") {
        setMinValue(Math.min(roundedValue, maxValue));
      } else if (dragging === "max") {
        setMaxValue(Math.max(roundedValue, minValue));
      }
    },
    [dragging, values, minValue, maxValue]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (type: "min" | "max") => () => {
    setDragging(type);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClickRange = (e: React.MouseEvent) => {
    const rect = rangeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newPosition =
      ((e.clientX - rect.left) / rect.width) *
        (Math.max(...values) - Math.min(...values)) +
      Math.min(...values);
    const closestValue = roundToClosestValue(newPosition);
    if (newPosition < (minValue + maxValue) / 2) {
      setMinValue(Math.min(closestValue, maxValue));
    } else {
      setMaxValue(Math.max(closestValue, minValue));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 items-center">
        <label className="text-sm">{minValue}€</label>
        <div
          ref={rangeRef}
          className="relative w-96 h-2 bg-gray-300 rounded"
          onClick={handleClickRange}
          data-testid="range-slider"
        >
          {values.map((value) =>
            value !== minValue && value !== maxValue ? (
              <div
                key={value}
                className="absolute top-0 w-1 h-4 bg-black"
                style={{
                  left: `${getPosition(value)}%`,
                }}
              >
                <div
                  className="absolute text-xs -bottom-6 text-center w-full"
                  style={{
                    left: "-50%",
                  }}
                >
                  {value}€
                </div>
              </div>
            ) : null
          )}

          <div
            className="absolute top-0 left-0 w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 hover:scale-110"
            style={{
              left: `${getPosition(minValue)}%`,
            }}
            onMouseDown={handleMouseDown("min")}
            data-testid="min-handle"
          ></div>

          <div
            className="absolute top-0 left-0 w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 hover:scale-110"
            style={{
              left: `${getPosition(maxValue)}%`,
            }}
            onMouseDown={handleMouseDown("max")}
            data-testid="max-handle"
          ></div>
        </div>

        <label className="text-sm">{maxValue}€</label>
      </div>
    </div>
  );
}
