import React from 'react';
import { BaseNode } from '../node-base';
import { Position } from 'reactflow';
import { GitBranch } from 'lucide-react';

export const DecisionNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Decision"
      data={data}
      handles={[
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'yesOutput', type: 'source', position: Position.Right },
        { id: 'noOutput', type: 'source', position: Position.Bottom },
      ]}
      className="bg-purple-50 border-purple-400"
    >
      <GitBranch className="w-8 h-8 text-purple-600" />
    </BaseNode>
  );
};
