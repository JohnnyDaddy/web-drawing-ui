import React, { useState, useCallback } from 'react';
import { fabric } from 'fabric';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';

const App: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [fillColor, setFillColor] = useState<string>('#ff0000');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [textContent, setTextContent] = useState<string>('텍스트');

  const handleCanvasReady = useCallback((fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);
  }, []);

  const handleToolChange = useCallback((tool: string) => {
    setActiveTool(tool);
  }, []);

  const addText = useCallback(() => {
    if (canvas && textContent) {
      const text = new fabric.Text(textContent, {
        left: 100,
        top: 100,
        fill: fillColor,
        fontSize: 20,
        fontFamily: 'Arial',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  }, [canvas, textContent, fillColor]);

  const clearCanvas = useCallback(() => {
    if (canvas) {
      canvas.clear();
      canvas.renderAll();
    }
  }, [canvas]);

  const deleteSelected = useCallback(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
      }
    }
  }, [canvas]);

  const saveCanvas = useCallback(() => {
    if (canvas) {
      const dataURL = canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = dataURL;
      link.click();
    }
  }, [canvas]);

  const loadCanvas = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        fabric.Image.fromURL(dataURL, (img) => {
          canvas.clear();
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  }, [canvas]);

  return (
    <div className="app">
      <div className="toolbar">
        <h2>🎨 드로잉 도구</h2>
        
        <div className="tool-section">
          <h3>도구</h3>
          <button 
            className={`tool-button ${activeTool === 'select' ? 'active' : ''}`}
            onClick={() => setActiveTool('select')}
          >
            🖱️ 선택
          </button>
          <button 
            className={`tool-button ${activeTool === 'drawing' ? 'active' : ''}`}
            onClick={() => setActiveTool('drawing')}
          >
            ✏️ 자유그리기
          </button>
          <button 
            className={`tool-button ${activeTool === 'rectangle' ? 'active' : ''}`}
            onClick={() => setActiveTool('rectangle')}
          >
            ⬜ 사각형
          </button>
          <button 
            className={`tool-button ${activeTool === 'circle' ? 'active' : ''}`}
            onClick={() => setActiveTool('circle')}
          >
            ⭕ 원
          </button>
          <button 
            className={`tool-button ${activeTool === 'triangle' ? 'active' : ''}`}
            onClick={() => setActiveTool('triangle')}
          >
            🔺 삼각형
          </button>
          <button 
            className={`tool-button ${activeTool === 'line' ? 'active' : ''}`}
            onClick={() => setActiveTool('line')}
          >
            📏 선
          </button>
          <button 
            className="tool-button"
            onClick={addText}
          >
            📝 텍스트 추가
          </button>
        </div>

        <div className="tool-section">
          <h3>스타일</h3>
          <div className="input-group">
            <label htmlFor="fill-color">채우기 색상</label>
            <input 
              id="fill-color"
              type="color" 
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="color-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="stroke-color">선 색상</label>
            <input 
              id="stroke-color"
              type="color" 
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="color-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="stroke-width">선 두께: {strokeWidth}px</label>
            <input 
              id="stroke-width"
              type="range" 
              min="1" 
              max="20" 
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="range-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="text-content">텍스트 내용</label>
            <input 
              id="text-content"
              type="text" 
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="입력할 텍스트"
              className="text-input"
            />
          </div>
        </div>

        <div className="tool-section">
          <h3>편집</h3>
          <button 
            className="tool-button"
            onClick={clearCanvas}
          >
            🗑️ 전체 지우기
          </button>
          <button 
            className="tool-button"
            onClick={deleteSelected}
          >
            ❌ 선택 삭제
          </button>
        </div>

        <div className="tool-section">
          <h3>파일</h3>
          <button 
            className="tool-button"
            onClick={saveCanvas}
          >
            💾 저장
          </button>
          <div className="input-group">
            <label htmlFor="file-input">이미지 불러오기</label>
            <input 
              id="file-input"
              type="file" 
              accept="image/*"
              onChange={loadCanvas}
              className="file-input"
            />
          </div>
        </div>
      </div>

      <div className="canvas-section">
        <DrawingCanvas 
          activeTool={activeTool}
          fillColor={fillColor}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          textContent={textContent}
          onCanvasReady={handleCanvasReady}
          onToolChange={handleToolChange}
        />
      </div>
    </div>
  );
};

export default App;
