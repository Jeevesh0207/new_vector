import React from 'react';
import { BaseNode } from '../node-base';
import { Position } from 'reactflow';
import { Calculator } from 'lucide-react';

export const CalculationNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="Calculation"
      data={data}
      handles={[
        { id: 'input', type: 'target', position: Position.Left },
        { id: 'output', type: 'source', position: Position.Right },
      ]}
      className="bg-yellow-50 border-yellow-400"
    >
      <Calculator className="w-8 h-8 text-yellow-600" />
    </BaseNode>
  );
};
