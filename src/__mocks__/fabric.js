// Fabric.js 모킹 - Jest용
const fabric = {
  Canvas: jest.fn().mockImplementation(() => ({
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
  })),
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
};

module.exports = { fabric };
