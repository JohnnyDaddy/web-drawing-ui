import '@testing-library/jest-dom';

// 더 강력한 Fabric.js 모킹
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

// Fabric.js 전역 모킹
jest.mock('fabric', () => ({
  fabric: {
    Canvas: jest.fn().mockImplementation(() => mockCanvasInstance),
    Text: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 1,
      setCoords: jest.fn(),
      clone: jest.fn(),
    })),
    Rect: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 1,
      setCoords: jest.fn(),
      clone: jest.fn(),
    })),
    Circle: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      left: 0,
      top: 0,
      radius: 50,
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 1,
      setCoords: jest.fn(),
      clone: jest.fn(),
    })),
    Triangle: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 1,
      setCoords: jest.fn(),
      clone: jest.fn(),
    })),
    Line: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      left: 0,
      top: 0,
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      stroke: '#000000',
      strokeWidth: 1,
      setCoords: jest.fn(),
      clone: jest.fn(),
    })),
    Image: {
      fromURL: jest.fn((url, callback) => {
        const mockImg = {
          set: jest.fn(),
          left: 0,
          top: 0,
          width: 100,
          height: 100,
          setCoords: jest.fn(),
          clone: jest.fn(),
        };
        if (callback) callback(mockImg);
      }),
    },
  },
}));

// 전역 fabric 객체도 설정 (혹시 모를 경우를 대비)
(global as any).fabric = {
  Canvas: jest.fn().mockImplementation(() => mockCanvasInstance),
};

// 모든 테스트 후 DOM 정리
afterEach(() => {
  document.body.innerHTML = '';
});

// console.error를 억제 (테스트 중 불필요한 에러 로그 방지)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is deprecated') ||
       args[0].includes('fabricCanvas.dispose is not a function') ||
       args[0].includes('fabric'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// HTMLCanvasElement mock
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Array(4) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => ({ data: new Array(4) })),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  })),
});
