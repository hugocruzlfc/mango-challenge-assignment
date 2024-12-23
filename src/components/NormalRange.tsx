"use client";

import { useCallback, useRef, useState } from "react";
import { Input } from "./ui/input";

interface NormalRangeProps {
  min: number;
  max: number;
}

export default function NormalRange({ min, max }: NormalRangeProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPosition = (value: number) => ((value - min) / (max - min)) * 100;

  const roundToTwoDecimalPlaces = (value: number) => {
    return Math.round(value * 100) / 100;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const newValue =
        ((e.clientX - rect.left) / rect.width) * (max - min) + min;

      if (dragging === "min") {
        setMinValue(
          roundToTwoDecimalPlaces(Math.min(Math.max(newValue, min), maxValue))
        );
      } else if (dragging === "max") {
        setMaxValue(
          roundToTwoDecimalPlaces(Math.max(Math.min(newValue, max), minValue))
        );
      }
    },
    [dragging, min, max, minValue, maxValue]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
    setDragging(type);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClickMin = (e: React.MouseEvent) => {
    const rect = rangeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newMin = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
    setMinValue(
      roundToTwoDecimalPlaces(Math.min(Math.max(newMin, min), maxValue))
    );
  };

  const handleClickMax = (e: React.MouseEvent) => {
    const rect = rangeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newMax = ((e.clientX - rect.left) / rect.width) * (max - min) + min;
    setMaxValue(
      roundToTwoDecimalPlaces(Math.max(Math.min(newMax, max), minValue))
    );
  };

  const handleClickLabel =
    (valueType: "min" | "max") => (e: React.MouseEvent) => {
      if (valueType === "min") {
        setEditingMin(true);
      } else {
        setEditingMax(true);
      }
    };

  const handleBlurMin = () => {
    setEditingMin(false);
    setMinValue(Math.min(Math.max(minValue, min), maxValue));
  };

  const handleBlurMax = () => {
    setEditingMax(false);
    setMaxValue(Math.max(Math.min(maxValue, max), minValue));
  };

  const handleKeyDownMin = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setEditingMin(false);
      setMinValue(Math.min(Math.max(minValue, min), maxValue));
    }
  };

  const handleKeyDownMax = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setEditingMax(false);
      setMaxValue(Math.max(Math.min(maxValue, max), minValue));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label
        className="text-sm cursor-pointer"
        onClick={handleClickLabel("min")}
      >
        {editingMin ? (
          <Input
            type="number"
            className="w-16"
            value={minValue}
            onBlur={handleBlurMin}
            onChange={(e) => setMinValue(Number(e.target.value))}
            onKeyDown={handleKeyDownMin}
            autoFocus
          />
        ) : (
          `${minValue}€`
        )}
      </label>
      <div
        ref={rangeRef}
        className="relative w-72 h-2 bg-gray-300 rounded"
        onClick={(e) => {
          if (
            e.clientX <
            rangeRef.current!.getBoundingClientRect().left +
              rangeRef.current!.getBoundingClientRect().width / 2
          ) {
            handleClickMin(e);
          } else {
            handleClickMax(e);
          }
        }}
      >
        <div
          className="absolute top-0 left-0 w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 hover:scale-110"
          style={{
            left: `${getPosition(minValue)}%`,
          }}
          onMouseDown={handleMouseDown("min")}
        ></div>
        <div
          className="absolute top-0 left-0 w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 hover:scale-110"
          style={{
            left: `${getPosition(maxValue)}%`,
          }}
          onMouseDown={handleMouseDown("max")}
        ></div>
      </div>
      <label
        className="text-sm cursor-pointer"
        onClick={handleClickLabel("max")}
      >
        {editingMax ? (
          <Input
            type="number"
            className="w-16"
            value={maxValue}
            onBlur={handleBlurMax}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            onKeyDown={handleKeyDownMax}
            autoFocus
          />
        ) : (
          `${maxValue}€`
        )}
      </label>
    </div>
  );
}
