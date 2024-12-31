import { createWithEqualityFn } from 'zustand/traditional';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
  savedComponents: [],
  selectedNodes: []
};

export const useStore = createWithEqualityFn((set, get) => ({
  ...initialState,

  getNodeID: (type) => {
    if (!type) {
      console.error("Node type is required to generate an ID.");
      return null;
    }
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    if (!node.id || !node.type || !node.data) {
      console.error("Invalid node: Missing required properties (id, type, data).", node);
      return;
    }
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(
        {
          id: `edge-${state.edges.length + 1}`, // Ensure unique edge ID
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow },
        },
        state.edges
      ),
    }));
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    }));
  },

  saveComponent: (name, nodes) => {
    if (!name.trim()) {
      console.error("Component name is required.");
      return;
    }

    if (!nodes || nodes.length === 0) {
      console.error("No nodes selected to save.");
      return;
    }

    set((state) => ({
      savedComponents: [
        ...state.savedComponents,
        {
          name,
          nodes: nodes.map((node) => ({
            ...node,
            position: { x: 0, y: 0 }, // Reset position for reuse
            selected: false,          // Ensure no pre-selection
            data: { ...node.data },   // Clone node-specific data
          })),
        },
      ],
    }));
  },

  toggleNodeSelection: (nodeId) => {
    set((state) => {
      const selectedNodes = [...state.selectedNodes];
      const index = selectedNodes.indexOf(nodeId);

      if (index === -1) {
        selectedNodes.push(nodeId); // Add node to selectedNodes
      } else {
        selectedNodes.splice(index, 1); // Remove node from selectedNodes
      }

      return { selectedNodes };
    });
  },

  deleteNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNodes: state.selectedNodes.filter((id) => id !== nodeId),
    }));
  },

  

  deleteEdge: (edgeId) => {
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    }));
  },
}), Object.is);
