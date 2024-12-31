import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { SaveComponentModal } from './saved/SaveComponentModal';
import { useStore } from '../lib/store';
import { shallow } from 'zustand/shallow';

export const SaveButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedNodes = useStore(
    (state) => state.nodes.filter(node => node.selected),
    shallow
  );

  const handleSaveClick = () => {
    if (selectedNodes.length > 0) {
      setIsModalOpen(true);
    } else {
      alert('Please select nodes to save as a component');
    }
  };

  return (
    <>
      <button
        onClick={handleSaveClick}
        className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 transition-colors"
        title="Save selected nodes as component"
      >
        <Save size={18} />
        <span className="text-sm font-medium">Save Component</span>
        {selectedNodes.length > 0 && (
          <span className="px-2 py-0.5 text-xs bg-white text-indigo-600 rounded-full">
            {selectedNodes.length}
          </span>
        )}
      </button>
      <SaveComponentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};