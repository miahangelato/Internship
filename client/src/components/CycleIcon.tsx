"use client";
import { useState } from "react";
import { CloudSun, Sun, Moon, type Icon as LucideIcon } from "lucide-react";

const ICONS = [CloudSun, Sun, Moon] as const;

export default function CycleIcon({
  size = 28,
  className = "",
  onChange,
}: {
  size?: number;
  className?: string;
  onChange?: (index: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const Icon: typeof LucideIcon = ICONS[idx];

  const handleClick = () => {
    const next = (idx + 1) % ICONS.length;
    setIdx(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`hover:opacity-90 transition-opacity ${className}`}
      aria-label={idx === 0 ? "Breakfast" : idx === 1 ? "Lunch" : "Dinner"}
      title={idx === 0 ? "Breakfast" : idx === 1 ? "Lunch" : "Dinner"}
    >
      <Icon className="hover:cursor-pointer" size={size} />
    </button>
  );
}
