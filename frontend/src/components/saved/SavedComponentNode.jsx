import React from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../../lib/store";
import { cn } from '../../lib/utils';

const SavedComponentNode = ({ data, id, className }) => {
  const { component } = data;

  const toggleNodeSelection = useStore((state) => state.toggleNodeSelection);
  const selectedNodes = useStore((state) => state.selectedNodes);
  const isSelected = selectedNodes.includes(id);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleNodeSelection(id);
  };

  
  const hasInput = component.nodes.some((node) => node.type === "customInput");
  const hasOutput = component.nodes.some(
    (node) => node.type === "customOutput"
  );

  return (
    <div
      className={cn(
        "p-4 bg-teal-100 rounded-md shadow-md",
        isSelected
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "ring-1 ring-gray-200",
        className
      )}
      onClick={handleClick} 
    >
      <h3 className="font-semibold text-teal-800">{data.label}</h3>
      <p className="text-sm text-teal-700">{component.description}</p>

      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{ background: "#64748b", width: 12, height: 12 }}
        />
      )}

      {/* Output Handle */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: "#64748b", width: 12, height: 12 }}
        />
      )}
    </div>
  );
};

export default SavedComponentNode;
