import React from 'react';
import { DraggableNode } from './draggable-node';
import { Brain, Type, ArrowRightCircle, ArrowLeftCircle, Wand2,Calculator,GitBranch,Save } from 'lucide-react';
const tools = [
  { type: 'customInput', label: 'Input', icon: ArrowLeftCircle, color: 'bg-blue-500' },
  { type: 'llm', label: 'LLM', icon: Brain, color: 'bg-purple-500' },
  { type: 'text', label: 'Text', icon: Type, color: 'bg-green-500' },
  { type: 'customOutput', label: 'Output', icon: ArrowRightCircle, color: 'bg-orange-500' },
  { type: 'transform', label: 'Transform', icon: Wand2, color: 'bg-pink-500' },
  { type: 'calculation', label: 'Calculation', icon: Calculator, color: 'bg-yellow-500' },
  { type: 'decision', label: 'Decision', icon: GitBranch, color: 'bg-purple-500' },
];

export const PipelineToolbar = () => {
  return (
    <div className="p-4 bg-white border-b">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Tools</h2>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <DraggableNode
            key={tool.type}
            type={tool.type}
            label={tool.label}
            icon={tool.icon}
            color={tool.color}
          />
        ))}
      </div>
    </div>
  );
};
