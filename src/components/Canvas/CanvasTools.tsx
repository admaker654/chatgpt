import React from 'react';
import { Pencil, Eraser, Square, Circle, Undo, Trash2, Download } from 'lucide-react';

interface CanvasToolsProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  onClear: () => void;
  onUndo: () => void;
  onDownload: () => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
}

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

export function CanvasTools({
  activeTool,
  setActiveTool,
  onClear,
  onUndo,
  onDownload,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
}: CanvasToolsProps) {
  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-100 rounded-lg">
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTool('pencil')}
          className={`p-2 rounded ${activeTool === 'pencil' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => setActiveTool('eraser')}
          className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Eraser size={20} />
        </button>
        <button
          onClick={() => setActiveTool('rectangle')}
          className={`p-2 rounded ${activeTool === 'rectangle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Square size={20} />
        </button>
        <button
          onClick={() => setActiveTool('circle')}
          className={`p-2 rounded ${activeTool === 'circle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          <Circle size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-24"
        />
        <div className="flex space-x-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setStrokeColor(color)}
              className={`w-6 h-6 rounded-full ${
                strokeColor === color ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onUndo}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={onClear}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={onDownload}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}