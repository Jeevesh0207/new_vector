import React from "react";
import { cn } from "../lib/utils";

export const DraggableNode = ({
  type,
  label,
  icon: Icon,
  color,
  customData = {},
}) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type, label, component: customData };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-white rounded-lg cursor-grab transition-transform hover:scale-105",
        "shadow-sm hover:shadow-md",
        color
      )}
      onDragStart={onDragStart}
      draggable
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
