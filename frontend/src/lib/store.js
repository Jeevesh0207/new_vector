import { createWithEqualityFn } from 'zustand/traditional';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = createWithEqualityFn(
  (set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
      const newIDs = { ...get().nodeIDs };
      if (!newIDs[type]) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
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
  }),
  // Default shallow equality function for zustand's createWithEqualityFn
  Object.is
);
