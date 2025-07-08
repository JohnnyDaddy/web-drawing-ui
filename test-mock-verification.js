// 테스트 환경에서 Fabric.js 모킹 확인
const mockTest = () => {
  // setupTests.ts의 모킹을 시뮬레이션
  const mockCanvasInstance = {
    add: jest.fn(),
    clear: jest.fn(),
    renderAll: jest.fn(),
    setActiveObject: jest.fn(),
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,test'),
    dispose: jest.fn(), // 핵심적인 dispose 메서드
    on: jest.fn(),
    off: jest.fn(),
    isDrawingMode: false,
    selection: true,
    freeDrawingBrush: {
      color: '#000000',
      width: 2,
    },
    getPointer: jest.fn().mockReturnValue({ x: 100, y: 100 }),
    remove: jest.fn(),
    getObjects: jest.fn().mockReturnValue([]),
    discardActiveObject: jest.fn(),
    loadFromJSON: jest.fn((json, callback) => {
      if (callback) callback();
    }),
    toJSON: jest.fn().mockReturnValue({}),
  };

  console.log('✅ Mock Canvas Instance created');
  console.log('dispose method exists:', typeof mockCanvasInstance.dispose);
  console.log('dispose is function:', typeof mockCanvasInstance.dispose === 'function');
  
  // dispose 호출 테스트
  try {
    mockCanvasInstance.dispose();
    console.log('✅ dispose() called successfully');
  } catch (error) {
    console.log('❌ dispose() failed:', error.message);
  }
  
  // 안전 검사 시뮬레이션 (DrawingCanvas.tsx의 수정된 코드)
  if (mockCanvasInstance && typeof mockCanvasInstance.dispose === 'function') {
    console.log('✅ Safe dispose check passed');
    mockCanvasInstance.dispose();
    console.log('✅ Safe dispose executed');
  } else {
    console.log('❌ Safe dispose check failed');
  }
};

// Jest 환경 시뮬레이션
global.jest = {
  fn: () => {
    const mockFn = function(...args) {
      return mockFn._returnValue;
    };
    mockFn.mockReturnValue = (value) => {
      mockFn._returnValue = value;
      return mockFn;
    };
    return mockFn;
  }
};

mockTest();
