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
} from "lucide-react";
import { useStore } from "../lib/store";

const tools = [
  {
    type: "customInput",
    label: "Input",
    icon: ArrowLeftCircle,
    color: "bg-blue-500",
  },
  { type: "llm", label: "LLM", icon: Brain, color: "bg-purple-500" },
  { type: "text", label: "Text", icon: Type, color: "bg-green-500" },
  {
    type: "customOutput",
    label: "Output",
    icon: ArrowRightCircle,
    color: "bg-orange-500",
  },
  { type: "transform", label: "Transform", icon: Wand2, color: "bg-pink-500" },
  {
    type: "calculation",
    label: "Calculation",
    icon: Calculator,
    color: "bg-yellow-500",
  },
  {
    type: "decision",
    label: "Decision",
    icon: GitBranch,
    color: "bg-purple-500",
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
    selectedNodes.forEach((nodeId) => deleteNode(nodeId)); // Delete all selected nodes
  };

  return (
    <div className="p-4 bg-white border-b">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Tools</h2>
        <div className="flex gap-5">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          title="Delete selected nodes"
        >
          <Trash2 size={18} />
          <span className="text-sm font-medium">Delete</span>
        </button>
        <SaveButton />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <DraggableNode
            key={tool.type}
            type={tool.type}
            label={tool.label}
            icon={tool.icon}
            color={tool.color}
          />
        ))}
      </div>
      <SavedComponents />
    </div>
  );
};
