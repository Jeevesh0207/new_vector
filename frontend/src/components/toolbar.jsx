import React from "react";
import { DraggableNode } from "./draggable-node";
import { SaveButton } from "./save-button";
import { SavedComponents } from "./saved/SavedComponents";
import {
  Brain,
  Type,
  ArrowRightCircle,
  ArrowLeftCircle,
  Wand2,
  Calculator,
  GitBranch,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { useStore } from "../lib/store";

const tools = [
  {
    type: "customInput",
    label: "Input Node",
    description: "Starting point for data flow",
    icon: ArrowLeftCircle,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  { 
    type: "llm", 
    label: "AI Model",
    description: "Language model processing",
    icon: Brain, 
    color: "bg-gradient-to-r from-purple-500 to-purple-600" 
  },
  { 
    type: "text", 
    label: "Text Processing",
    description: "Text manipulation and formatting",
    icon: Type, 
    color: "bg-gradient-to-r from-green-500 to-green-600" 
  },
  {
    type: "customOutput",
    label: "Output Node",
    description: "End point for data flow",
    icon: ArrowRightCircle,
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
  { 
    type: "transform", 
    label: "Transform",
    description: "Data transformation operations",
    icon: Wand2, 
    color: "bg-gradient-to-r from-pink-500 to-pink-600" 
  },
  {
    type: "calculation",
    label: "Calculator",
    description: "Mathematical operations",
    icon: Calculator,
    color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
  },
  {
    type: "decision",
    label: "Decision",
    description: "Conditional branching",
    icon: GitBranch,
    color: "bg-gradient-to-r from-violet-500 to-violet-600",
  },
];

export const PipelineToolbar = () => {
  const deleteNode = useStore((state) => state.deleteNode);
  const selectedNodes = useStore((state) => state.selectedNodes);

  const handleDelete = () => {
    if (selectedNodes.length === 0) {
      alert("Please select a node to delete.");
      return;
    }
    selectedNodes.forEach((nodeId) => deleteNode(nodeId));
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">Pipeline Tools</h2>
            <HelpCircle className="w-5 h-5 text-gray-400 cursor-help" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete selected nodes"
            >
              <Trash2 size={18} />
              <span className="text-sm font-medium">Delete</span>
              {selectedNodes.length > 0 && (
                <span className="px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded-full">
                  {selectedNodes.length}
                </span>
              )}
            </button>
            <SaveButton />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {tools.map((tool) => (
            <div key={tool.type} className="group relative">
              <DraggableNode
                type={tool.type}
                label={tool.label}
                icon={tool.icon}
                color={tool.color}
              />
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                {tool.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <SavedComponents />
        </div>
      </div>
    </div>
  );
};