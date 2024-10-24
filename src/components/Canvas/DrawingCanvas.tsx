import React, { useRef, useEffect, useState } from 'react';
import { CanvasTools } from './CanvasTools';

interface DrawingCanvasProps {
  onClose: () => void;
  onSend: (imageUrl: string) => void;
}

export function DrawingCanvas({ onClose, onSend }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState('pencil');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    setHistory(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = activeTool === 'eraser' ? '#ffffff' : strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'pencil' || activeTool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      const lastState = history[history.length - 1];
      if (lastState) {
        ctx.putImageData(lastState, 0, 0);
      }

      if (activeTool === 'rectangle') {
        ctx.beginPath();
        ctx.rect(
          startPos.x,
          startPos.y,
          x - startPos.x,
          y - startPos.y
        );
        ctx.stroke();
      } else if (activeTool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
        );
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const newHistory = history.slice(0, -1);
    const lastState = newHistory[newHistory.length - 1];
    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
      setHistory(newHistory);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = dataUrl;
    link.click();
  };

  const handleSend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onSend(dataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full">
        <CanvasTools
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onClear={handleClear}
          onUndo={handleUndo}
          onDownload={handleDownload}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
        />
        
        <div className="mt-4 border rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="bg-white cursor-crosshair"
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}