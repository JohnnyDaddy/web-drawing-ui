import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface DrawingCanvasProps {
  activeTool: string;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  textContent: string;
  onCanvasReady: (canvas: fabric.Canvas) => void;
  onToolChange: (tool: string) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  activeTool,
  fillColor,
  strokeColor,
  strokeWidth,
  textContent,
  onCanvasReady,
  onToolChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const currentEventListeners = useRef<(() => void) | null>(null);

  // 캔버스 초기화
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: 'white',
      });

      setCanvas(fabricCanvas);
      onCanvasReady(fabricCanvas);

      return () => {
        if (fabricCanvas && typeof fabricCanvas.dispose === 'function') {
          fabricCanvas.dispose();
        }
      };
    }
  }, []);

  // 키보드 이벤트 핸들러 - Delete/Backspace로 선택된 요소 삭제
  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvas]);

  // 도구 변경 처리 - 디바운스 적용
  useEffect(() => {
    if (!canvas) return;

    // 디바운스를 위한 타이머
    const timer = setTimeout(() => {
      // 이전 이벤트 리스너 정리
      if (currentEventListeners.current) {
        currentEventListeners.current();
        currentEventListeners.current = null;
      }

      // 모든 이벤트 리스너 제거
      canvas.off();

      if (activeTool === 'rectangle') {
        currentEventListeners.current = setupRectangleTool(canvas);
      } else if (activeTool === 'circle') {
        currentEventListeners.current = setupCircleTool(canvas);
      } else if (activeTool === 'triangle') {
        currentEventListeners.current = setupTriangleTool(canvas);
      } else if (activeTool === 'line') {
        currentEventListeners.current = setupLineTool(canvas);
      } else if (activeTool === 'drawing') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = strokeWidth;
        canvas.freeDrawingBrush.color = strokeColor;
      } else {
        canvas.isDrawingMode = false;
      }
    }, 50); // 50ms 디바운스

    return () => {
      clearTimeout(timer);
      if (currentEventListeners.current) {
        currentEventListeners.current();
      }
    };
  }, [activeTool, canvas, fillColor, strokeColor, strokeWidth]);

  // 도구별 설정 함수들
  const setupRectangleTool = (canvas: fabric.Canvas) => {
    canvas.isDrawingMode = false;
    let isDown = false;
    let origX = 0;
    let origY = 0;
    let rect: fabric.Rect;

    const mouseDown = (o: fabric.IEvent) => {
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;

      rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: 0,
        height: 0,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      canvas.add(rect);
    };

    const mouseMove = (o: fabric.IEvent) => {
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);

      rect.set({
        width: Math.abs(origX - pointer.x),
        height: Math.abs(origY - pointer.y),
      });

      if (origX > pointer.x) {
        rect.set({ left: pointer.x });
      }
      if (origY > pointer.y) {
        rect.set({ top: pointer.y });
      }

      canvas.renderAll();
    };

    const mouseUp = () => {
      if (!isDown) return;
      isDown = false;
      canvas.setActiveObject(rect);
      
      // 도형 완성 후 선택 모드로 전환
      setTimeout(() => {
        onToolChange('select');
      }, 100);
    };

    canvas.on('mouse:down', mouseDown);
    canvas.on('mouse:move', mouseMove);
    canvas.on('mouse:up', mouseUp);

    // 정리 함수 반환
    return () => {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', mouseMove);
      canvas.off('mouse:up', mouseUp);
    };
  };

  const setupCircleTool = (canvas: fabric.Canvas) => {
    canvas.isDrawingMode = false;
    let isDown = false;
    let origX = 0;
    let origY = 0;
    let circle: fabric.Circle;

    const mouseDown = (o: fabric.IEvent) => {
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;

      circle = new fabric.Circle({
        left: origX,
        top: origY,
        originX: 'center',
        originY: 'center',
        radius: 0,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      canvas.add(circle);
    };

    const mouseMove = (o: fabric.IEvent) => {
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);

      const radius = Math.abs(origX - pointer.x) / 2;
      circle.set({ radius: radius });

      canvas.renderAll();
    };

    const mouseUp = () => {
      if (!isDown) return;
      isDown = false;
      canvas.setActiveObject(circle);
      
      setTimeout(() => {
        onToolChange('select');
      }, 100);
    };

    canvas.on('mouse:down', mouseDown);
    canvas.on('mouse:move', mouseMove);
    canvas.on('mouse:up', mouseUp);

    return () => {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', mouseMove);
      canvas.off('mouse:up', mouseUp);
    };
  };

  const setupTriangleTool = (canvas: fabric.Canvas) => {
    canvas.isDrawingMode = false;
    let isDown = false;
    let origX = 0;
    let origY = 0;
    let triangle: fabric.Triangle;

    const mouseDown = (o: fabric.IEvent) => {
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;

      triangle = new fabric.Triangle({
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      canvas.add(triangle);
    };

    const mouseMove = (o: fabric.IEvent) => {
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);

      triangle.set({
        width: Math.abs(origX - pointer.x),
        height: Math.abs(origY - pointer.y),
      });

      canvas.renderAll();
    };

    const mouseUp = () => {
      if (!isDown) return;
      isDown = false;
      canvas.setActiveObject(triangle);
      
      setTimeout(() => {
        onToolChange('select');
      }, 100);
    };

    canvas.on('mouse:down', mouseDown);
    canvas.on('mouse:move', mouseMove);
    canvas.on('mouse:up', mouseUp);

    return () => {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', mouseMove);
      canvas.off('mouse:up', mouseUp);
    };
  };

  const setupLineTool = (canvas: fabric.Canvas) => {
    canvas.isDrawingMode = false;
    let isDown = false;
    let line: fabric.Line;

    const mouseDown = (o: fabric.IEvent) => {
      isDown = true;
      const pointer = canvas.getPointer(o.e);

      const points = [pointer.x, pointer.y, pointer.x, pointer.y];
      line = new fabric.Line(points, {
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      canvas.add(line);
    };

    const mouseMove = (o: fabric.IEvent) => {
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);

      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    };

    const mouseUp = () => {
      if (!isDown) return;
      isDown = false;
      canvas.setActiveObject(line);
      
      setTimeout(() => {
        onToolChange('select');
      }, 100);
    };

    canvas.on('mouse:down', mouseDown);
    canvas.on('mouse:move', mouseMove);
    canvas.on('mouse:up', mouseUp);

    return () => {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', mouseMove);
      canvas.off('mouse:up', mouseUp);
    };
  };

  return (
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default DrawingCanvas;
