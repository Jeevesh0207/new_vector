import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../node-base';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType] = useState(data?.outputType || 'Text');

  const handles = [
    {
      id: 'value',
      type: 'target',
      position: Position.Left,
      label: 'Input',
    },
  ];

  return (
    <BaseNode
      id={id}
      type="Output"
      data={data}
      handles={handles}
      className="bg-orange-50"
    >
      <div className="space-y-3">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
