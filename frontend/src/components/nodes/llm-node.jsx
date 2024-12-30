import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../node-base';
import { Brain } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      id: 'system',
      type: 'target',
      position: Position.Left,
      label: 'System',
      style: { top: '33%' },
    },
    {
      id: 'prompt',
      type: 'target',
      position: Position.Left,
      label: 'Prompt',
      style: { top: '66%' },
    },
    {
      id: 'response',
      type: 'source',
      position: Position.Right,
      label: 'Response',
    },
  ];

  return (
    <BaseNode
      id={id}
      type="LLM"
      data={data}
      handles={handles}
      className="bg-purple-50"
    >
      <div className="flex flex-col items-center space-y-2">
        <Brain className="w-8 h-8 text-purple-600" />
        <p className="text-sm text-gray-600">Language Model</p>
      </div>
    </BaseNode>
  );
};
