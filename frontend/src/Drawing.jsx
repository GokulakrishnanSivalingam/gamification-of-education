import React, { useRef, useState, useEffect } from 'react';

const DrawingPad = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black'); // State for color
  const [lineWidth, setLineWidth] = useState(5); // State for pencil size
  const [isEraser, setIsEraser] = useState(false); // State for eraser mode

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    canvas.style.border = '1px solid black';

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(nativeEvent);
    contextRef.current.strokeStyle = isEraser ? 'white' : color; // Use white for eraser
    contextRef.current.lineWidth = lineWidth; // Set pencil or eraser size
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // Helper function to get coordinates for both mouse and touch events
  const getCoordinates = (nativeEvent) => {
    let offsetX, offsetY;
    if (nativeEvent.type.includes('touch')) {
      const touch = nativeEvent.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }
    return { offsetX, offsetY };
  };

  return (
    <div>
      <h2>Drawing Pad</h2>

      {/* Color options */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="color-picker">Select Color: </label>
        <input
          type="color"
          id="color-picker"
          value={color}
          onChange={(e) => {
            setIsEraser(false); // Disable eraser when selecting a new color
            setColor(e.target.value);
          }}
        />
      </div>

      {/* Pencil size options */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="pencil-size">Pencil Size: </label>
        <select
          id="pencil-size"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        >
          <option value={2}>Small</option>
          <option value={5}>Medium</option>
          <option value={10}>Large</option>
        </select>
      </div>

      {/* Eraser option */}
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => setIsEraser(!isEraser)}
          style={{ backgroundColor: isEraser ? 'lightgray' : '' }}
        >
          {isEraser ? 'Eraser Active' : 'Use Eraser'}
        </button>
      </div>

      {/* Canvas for drawing */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}  // Touch start event
        onTouchEnd={finishDrawing}   // Touch end event
        onTouchMove={draw}           // Touch move event
        style={{ touchAction: 'none',background:'white' }} // Prevent scrolling during drawing
      />
    </div>
  );
};

export default DrawingPad;
