import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../lib/utils';
import { useStore } from '../lib/store';
import { theme } from '../lib/theme';

export const BaseNode = memo(({
  id,
  data,
  type,
  handles = [],
  children,
  className,
  onDataChange,
}) => {
  const toggleNodeSelection = useStore((state) => state.toggleNodeSelection);
  const selectedNodes = useStore((state) => state.selectedNodes);
  const isSelected = selectedNodes.includes(id);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleNodeSelection(id);
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 min-w-[200px] transition-all duration-200",
        theme.shadows.node,
        isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "ring-1 ring-gray-200",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{type}</h3>
      </div>

      {children}

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className="w-3 h-3 rounded-full border-2 border-white bg-gray-600 transition-colors hover:bg-blue-500"
          style={handle.style}
        />
      ))}
    </div>
  );
});