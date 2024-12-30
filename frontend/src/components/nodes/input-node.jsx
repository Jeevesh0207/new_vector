import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../node-base';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType] = useState(data?.inputType || 'Text');

  const handles = [
    {
      id: 'value',
      type: 'source',
      position: Position.Right,
      label: 'Output',
    },
  ];

  return (
    <BaseNode
      id={id}
      type="Input"
      data={data}
      handles={handles}
      className="bg-blue-50"
    >
      <div className="space-y-3">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
