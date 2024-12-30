import React from 'react';
import { useStore } from '../lib/store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      alert(
        `Pipeline Analysis:\n\n` +
        `Number of Nodes: ${data.num_nodes}\n` +
        `Number of Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      alert('Error submitting pipeline: ' + error.message);
    }
  };

  return (
    <div className="fixed bottom-4 w-full  flex justify-center">
      <button
        onClick={handleSubmit}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Submit Pipeline
      </button>
    </div>
  );
};
