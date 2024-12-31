import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { shallow } from 'zustand/shallow';

export const SaveComponentModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const selectedNodes = useStore(
    (state) => state.nodes.filter(node => node.selected),
    shallow
  );
  const saveComponent = useStore((state) => state.saveComponent);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a name for the component');
      return;
    }
    console.log(name,selectedNodes)
    saveComponent(name, selectedNodes);
    setName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Save Component</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Component Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter component name"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};