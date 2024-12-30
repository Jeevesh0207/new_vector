import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../node-base';
import { extractVariables, isValidVariableName } from '../../lib/utils';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const vars = extractVariables(text)
      .filter(isValidVariableName)
      .filter((v, i, self) => self.indexOf(v) === i);
    setVariables(vars);
  }, [text]);

  const handles = [
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Output',
    },
    ...variables.map((variable) => ({
      id: variable,
      type: 'target',
      position: Position.Left,
      label: variable,
    })),
  ];

  return (
    <BaseNode
      id={id}
      type="Text"
      data={data}
      handles={handles}
      className="bg-green-50"
    >
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded resize-none focus:outline-none focus:ring-1 focus:ring-green-400"
          style={{ height }}
          onInput={(e) => {
            const target = e.target;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
            setHeight(`${target.scrollHeight}px`);
          }}
          rows={1}
        />
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {variables.map((variable) => (
              <span
                key={variable}
                className="px-2 py-1 text-xs bg-green-100 rounded-full text-green-700"
              >
                {variable}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
