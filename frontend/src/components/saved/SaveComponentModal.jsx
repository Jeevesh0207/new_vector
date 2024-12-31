import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { shallow } from 'zustand/shallow';
import { AlertCircle } from 'lucide-react';

export const SaveComponentModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const selectedNodes = useStore(
    (state) => state.nodes.filter(node => node.selected),
    shallow
  );
  const saveComponent = useStore((state) => state.saveComponent);

  const validateComponent = () => {
    const hasInput = selectedNodes.some(node => node.type === 'customInput');
    const hasOutput = selectedNodes.some(node => node.type === 'customOutput');
    const errors = [];

    if (!name.trim()) {
      errors.push('Please enter a name for the component');
    }

    if (!hasInput) {
      errors.push('Component must have at least one input node');
    }

    if (!hasOutput) {
      errors.push('Component must have at least one output node');
    }

    return errors;
  };

  const handleSave = () => {
    const errors = validateComponent();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    saveComponent(name, selectedNodes, description);
    setName('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  const inputCount = selectedNodes.filter(node => node.type === 'customInput').length;
  const outputCount = selectedNodes.filter(node => node.type === 'customOutput').length;

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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter component description"
            rows={3}
          />
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Component Summary</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Total Nodes: {selectedNodes.length}
            </p>
            <p className="text-sm text-gray-600">
              Input Nodes: {inputCount}
            </p>
            <p className="text-sm text-gray-600">
              Output Nodes: {outputCount}
            </p>
          </div>
        </div>

        {(!inputCount || !outputCount) && (
          <div className="mb-4 p-3 bg-red-50 rounded-md flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              Component must have at least one input and one output node.
            </div>
          </div>
        )}

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