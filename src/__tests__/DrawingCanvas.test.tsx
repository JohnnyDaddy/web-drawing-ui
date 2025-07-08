import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawingCanvas from '../components/DrawingCanvas';

// Fabric.js는 setupTests.ts에서 전역으로 모킹됩니다
// 추가적인 안전장치로 모킹 확인
beforeAll(() => {
  // fabric 모킹 확인
  const { fabric } = require('fabric');
  expect(fabric.Canvas).toBeDefined();
  
  // Canvas 인스턴스 생성 테스트
  const testCanvas = new fabric.Canvas();
  expect(testCanvas.dispose).toBeDefined();
  expect(typeof testCanvas.dispose).toBe('function');
});

const mockProps = {
  activeTool: 'select',
  fillColor: '#ff0000',
  strokeColor: '#000000',
  strokeWidth: 2,
  textContent: '테스트',
  onCanvasReady: jest.fn(),
  onToolChange: jest.fn(),
};

describe('DrawingCanvas Component', () => {
  test('renders canvas element', () => {
    const { container } = render(<DrawingCanvas {...mockProps} />);
    
    // canvas 요소를 직접 찾기 - canvas는 기본적으로 특별한 role이 없음
    const canvasElement = container.querySelector('canvas');
    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement?.tagName).toBe('CANVAS');
  });

  test('calls onCanvasReady when canvas is initialized', () => {
    const onCanvasReady = jest.fn();
    render(<DrawingCanvas {...mockProps} onCanvasReady={onCanvasReady} />);
    
    expect(onCanvasReady).toHaveBeenCalled();
  });

  test('renders canvas container with correct class', () => {
    const { container } = render(<DrawingCanvas {...mockProps} />);
    
    const canvasContainer = container.querySelector('.canvas-container');
    expect(canvasContainer).toBeInTheDocument();
  });

  test('renders canvas wrapper with correct class', () => {
    const { container } = render(<DrawingCanvas {...mockProps} />);
    
    const canvasWrapper = container.querySelector('.canvas-wrapper');
    expect(canvasWrapper).toBeInTheDocument();
  });
});
