import React from 'react';
import { useStore } from '../../lib/store';
import { DraggableNode } from '../draggable-node';
import { Package } from 'lucide-react';

export const SavedComponents = () => {
  const savedComponents = useStore((state) => state.savedComponents);

  if (!savedComponents || savedComponents.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Saved Components</h2>
      <div className="flex flex-wrap gap-3">
        {savedComponents.map((component) => (
          <DraggableNode
            key={component.name}
            type="savedComponent"
            label={component.name}
            icon={Package}
            color="bg-teal-500"
            customData={{
                description: `Nodes: ${component.nodes.length}`,
                ...component,
            }}
          />
        ))}
      </div>
    </div>
  );
};