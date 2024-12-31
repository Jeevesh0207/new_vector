import React from 'react';
import { Handle, Position } from 'reactflow';

const SavedComponentNode = ({ data }) => {
  const { component } = data;

  // Check if the component contains input and output nodes
  const hasInput = component.nodes.some(node => node.type === 'customInput');
  const hasOutput = component.nodes.some(node => node.type === 'customOutput');

  return (
    <div className="p-4 bg-teal-100 rounded-md shadow-md">
      <h3 className="font-semibold text-teal-800">{data.label}</h3>
      <p className="text-sm text-teal-700">{component.description}</p>

      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{ background: '#64748b', width: 12, height: 12 }}
        />
      )}

      {/* Output Handle */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: '#64748b', width: 12, height: 12 }}
        />
      )}
    </div>
  );
};

export default SavedComponentNode;