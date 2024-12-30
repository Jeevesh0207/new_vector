import React from 'react';
import { BaseNode } from '../node-base';
import { Position } from 'reactflow';
import { Wand2 } from 'lucide-react';

export const TransformNode = ({ id, data }) => {
  const handles = [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
      label: 'Input',
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Output',
    },
  ];

  return (
    <BaseNode
      id={id}
      type="Transform"
      data={data}
      handles={handles}
      className="bg-pink-50"
    >
      <div className="flex flex-col items-center space-y-2">
        <Wand2 className="w-8 h-8 text-pink-600" />
        <p className="text-sm text-gray-600">Transform Node</p>
      </div>
    </BaseNode>
  );
};
