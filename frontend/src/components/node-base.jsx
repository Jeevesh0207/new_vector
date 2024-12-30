import React from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../lib/utils';

export const BaseNode = ({
  id,
  data,
  type,
  handles = [],
  children,
  className,
  onDataChange,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg p-4 min-w-[200px]",
        "border border-gray-200 hover:border-blue-400 transition-colors",
        className
      )}
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
          style={{
            background: '#64748b',
            width: 12,
            height: 12,
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};
