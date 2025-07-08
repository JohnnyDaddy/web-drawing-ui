import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

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

describe('App Component', () => {
  test('renders drawing app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/드로잉 도구/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all tool buttons', () => {
    render(<App />);
    
    expect(screen.getByText(/🖱️ 선택/i)).toBeInTheDocument();
    expect(screen.getByText(/✏️ 자유그리기/i)).toBeInTheDocument();
    expect(screen.getByText(/⬜ 사각형/i)).toBeInTheDocument();
    expect(screen.getByText(/⭕ 원/i)).toBeInTheDocument();
    expect(screen.getByText(/🔺 삼각형/i)).toBeInTheDocument();
    expect(screen.getByText(/📏 선/i)).toBeInTheDocument();
    expect(screen.getByText(/📝 텍스트 추가/i)).toBeInTheDocument();
  });

  test('tool selection works correctly', () => {
    render(<App />);
    
    // 사각형 도구 선택 테스트
    const rectangleButton = screen.getByText(/⬜ 사각형/i);
    fireEvent.click(rectangleButton);
    expect(rectangleButton.closest('button')).toHaveClass('active');
    
    // 원 도구 선택 테스트
    const circleButton = screen.getByText(/⭕ 원/i);
    fireEvent.click(circleButton);
    expect(circleButton.closest('button')).toHaveClass('active');
    expect(rectangleButton.closest('button')).not.toHaveClass('active');
    
    // 선 도구 선택 테스트 (이모지를 포함하여 고유하게 식별)
    const lineButton = screen.getByText(/📏 선/i);
    fireEvent.click(lineButton);
    expect(lineButton.closest('button')).toHaveClass('active');
    expect(circleButton.closest('button')).not.toHaveClass('active');
  });

  test('color inputs are present and functional', () => {
    render(<App />);
    
    const fillColorInput = screen.getByLabelText(/채우기 색상/i);
    const strokeColorInput = screen.getByLabelText(/선 색상/i);
    
    expect(fillColorInput).toBeInTheDocument();
    expect(strokeColorInput).toBeInTheDocument();
    
    fireEvent.change(fillColorInput, { target: { value: '#00ff00' } });
    expect(fillColorInput).toHaveValue('#00ff00');
  });

  test('stroke width slider works', () => {
    render(<App />);
    
    const strokeWidthSlider = screen.getByLabelText(/선 두께/i);
    expect(strokeWidthSlider).toBeInTheDocument();
    
    fireEvent.change(strokeWidthSlider, { target: { value: '10' } });
    expect(strokeWidthSlider).toHaveValue('10');
  });

  test('clear canvas button is present', () => {
    render(<App />);
    
    const clearButton = screen.getByText(/🗑️ 전체 지우기/i);
    expect(clearButton).toBeInTheDocument();
  });

  test('delete selected button is present', () => {
    render(<App />);
    
    const deleteButton = screen.getByText(/❌ 선택 삭제/i);
    expect(deleteButton).toBeInTheDocument();
  });

  test('save button is present', () => {
    render(<App />);
    
    const saveButton = screen.getByText(/저장/i);
    expect(saveButton).toBeInTheDocument();
  });
});
