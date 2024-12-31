import { createWithEqualityFn } from 'zustand/traditional';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';
import { produce } from 'immer';

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
  savedComponents: [],
  selectedNodes: [],
};

export const useStore = createWithEqualityFn((set, get) => ({
  ...initialState,

  getNodeID: (type) => {
    if (!type) {
      console.error("Node type is required to generate an ID.");
      return null;
    }

    set(produce((state) => {
      if (!state.nodeIDs[type]) {
        state.nodeIDs[type] = 0;
      }
      state.nodeIDs[type] += 1;
    }));

    return `${type}-${get().nodeIDs[type]}`;
  },

  addNode: (node) => {
    if (!node.id || !node.type || !node.data) {
      console.error("Invalid node: Missing required properties.", node);
      return;
    }
    set(produce((state) => {
      state.nodes.push(node);
    }));
  },

  onNodesChange: (changes) => {
    set(produce((state) => {
      state.nodes = applyNodeChanges(changes, state.nodes);
    }));
  },

  onEdgesChange: (changes) => {
    set(produce((state) => {
      state.edges = applyEdgeChanges(changes, state.edges);
    }));
  },

  onConnect: (connection) => {
    set(produce((state) => {
      const newEdge = {
        id: `edge-${state.edges.length + 1}`,
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.Arrow },
      };
      state.edges = addEdge(newEdge, state.edges);
    }));
  },

  toggleNodeSelection: (nodeId) => {
    set(produce((state) => {
      const index = state.selectedNodes.indexOf(nodeId);
      if (index === -1) {
        state.selectedNodes.push(nodeId);
        const node = state.nodes.find(n => n.id === nodeId);
        if (node) {
          node.selected = true;
        }
      } else {
        state.selectedNodes.splice(index, 1);
        const node = state.nodes.find(n => n.id === nodeId);
        if (node) {
          node.selected = false;
        }
      }
    }));
  },

  saveComponent: (name, nodes, description = '') => {
    if (!name.trim() || !nodes?.length) {
      console.error("Invalid save component parameters");
      return;
    }

    const hasInput = nodes.some(node => node.type === 'customInput');
    const hasOutput = nodes.some(node => node.type === 'customOutput');

    if (!hasInput || !hasOutput) {
      console.error("Component must have at least one input and one output node");
      return;
    }

    set(produce((state) => {
      state.savedComponents.push({
        name,
        description,
        nodes: nodes.map((node) => ({
          ...node,
          position: { x: 0, y: 0 },
          selected: false,
          data: { ...node.data },
        })),
      });
    }));
  },

  deleteSavedComponent: (name) => {
    set(produce((state) => {
      state.savedComponents = state.savedComponents.filter(
        (component) => component.name !== name
      );
    }));
  },

  deleteNode: (nodeId) => {
    set(produce((state) => {
      const node = state.nodes.find((n) => n.id === nodeId);
      
      state.nodes = state.nodes.filter((n) => n.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      state.selectedNodes = state.selectedNodes.filter((id) => id !== nodeId);

      if (node?.type === 'savedComponent') {
        console.log('Deleted saved component instance:', node.data.label);
      }
    }));
  },
}), Object.is);