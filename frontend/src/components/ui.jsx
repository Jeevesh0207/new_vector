import { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  Panel,
  useReactFlow,
} from 'reactflow';
import { useStore } from '../lib/store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/input-node';
import { LLMNode } from './nodes/llm-node';
import { OutputNode } from './nodes/output-node';
import { TextNode } from './nodes/text-node';
import { TransformNode } from './nodes/transform-node';
import { CalculationNode } from './nodes/calculation-node';
import { DecisionNode } from './nodes/decision-node';
import SavedComponentNode from './saved/SavedComponentNode';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  calculation: CalculationNode,
  decision: DecisionNode,
  savedComponent: SavedComponentNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const proOptions = { 
  hideAttribution: true,
  account: 'paid-pro',
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds || !reactFlowInstance) return;

      const appData = event.dataTransfer.getData('application/reactflow');
      if (!appData) return;

      const { nodeType, label, component } = JSON.parse(appData);
      if (!nodeType) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(nodeType);
      const newNode = {
        id: nodeID,
        type: nodeType,
        position,
        data: { id: nodeID, nodeType, label, component },
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-[calc(100vh-10rem)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={memoizedNodeTypes}
        proOptions={proOptions}
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#64748b', strokeWidth: 2 },
        }}
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200"
          position="bottom-right"
        />
        <MiniMap 
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200"
          nodeColor={(node) => {
            switch (node.type) {
              case 'customInput': return '#3b82f6';
              case 'llm': return '#8b5cf6';
              case 'text': return '#22c55e';
              case 'customOutput': return '#f97316';
              case 'transform': return '#ec4899';
              case 'calculation': return '#eab308';
              case 'decision': return '#8b5cf6';
              default: return '#64748b';
            }
          }}
        />
        <Panel position="top-right" className="flex gap-2">
          <button
            onClick={() => zoomIn()}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 border border-gray-200"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={() => zoomOut()}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 border border-gray-200"
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={() => fitView()}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm hover:bg-gray-50 border border-gray-200"
          >
            <Maximize size={20} />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};